"""
成分解读服务

核心功能:
1. 解析配料表文本
2. 调用 AI 进行成分分析
3. 返回结构化的分析结果
"""
import json
from typing import List, Dict, Any, Optional
from dataclasses import dataclass, field, asdict
from app.services.ai_provider import AIProvider, MockAIProvider, create_ai_provider


@dataclass
class IngredientInfo:
    """成分信息"""
    name: str
    category: str = ""
    is_good: bool = True
    note: str = ""


@dataclass
class AnalysisResult:
    """分析结果"""
    ingredients: List[str]
    good_ingredients: List[IngredientInfo] = field(default_factory=list)
    concerning_ingredients: List[IngredientInfo] = field(default_factory=list)
    score: int = 0
    summary: str = ""
    details: Dict[str, Any] = field(default_factory=dict)
    
    def to_dict(self) -> Dict[str, Any]:
        """转换为字典"""
        return {
            "ingredients": self.ingredients,
            "good_ingredients": [asdict(ing) for ing in self.good_ingredients],
            "concerning_ingredients": [asdict(ing) for ing in self.concerning_ingredients],
            "score": self.score,
            "summary": self.summary,
            "details": self.details
        }


# 成分分析 Prompt 模板
ANALYSIS_PROMPT = """你是一位专业的宠物营养师，请分析以下宠物食品的配料表。

配料表内容:
{ingredients_text}

请以 JSON 格式返回分析结果，包含以下字段:
{{
    "ingredients": ["成分1", "成分2", ...],  // 识别出的所有成分列表
    "good_ingredients": [
        {{"name": "成分名", "category": "分类", "is_good": true, "note": "说明"}}
    ],  // 好的成分
    "concerning_ingredients": [
        {{"name": "成分名", "category": "分类", "is_good": false, "note": "说明"}}
    ],  // 需要注意的成分
    "score": 85,  // 0-100 的评分
    "summary": "整体评价..."  // 一句话总结
}}

评分标准:
- 90-100: 优秀，成分天然，营养均衡
- 70-89: 良好，成分可接受，有改进空间
- 50-69: 一般，有较多需要注意的成分
- 0-49: 较差，不推荐

请只返回 JSON，不要有其他内容。"""


VISION_PROMPT = """请识别这张宠物食品配料表图片中的文字，然后分析其成分。

请以 JSON 格式返回分析结果，包含以下字段:
{
    "ingredients": ["成分1", "成分2", ...],
    "good_ingredients": [...],
    "concerning_ingredients": [...],
    "score": 85,
    "summary": "整体评价..."
}

评分标准:
- 90-100: 优秀，成分天然，营养均衡
- 70-89: 良好，成分可接受
- 50-69: 一般，有较多需要注意的成分
- 0-49: 较差，不推荐

请只返回 JSON，不要有其他内容。"""


class IngredientAnalyzer:
    """成分解读器"""
    
    def __init__(self, ai_provider: Optional[AIProvider] = None):
        """
        初始化解读器
        
        Args:
            ai_provider: AI 提供商实例，如果为 None 则使用 Mock
        """
        self._provider = ai_provider or MockAIProvider()
    
    @classmethod
    def create(cls, provider_name: Optional[str] = None) -> "IngredientAnalyzer":
        """
        工厂方法：创建解读器
        
        Args:
            provider_name: AI 提供商名称
        """
        provider = create_ai_provider(provider_name)
        return cls(ai_provider=provider)
    
    def analyze(self, ingredients_text: str) -> AnalysisResult:
        """
        分析配料表文本
        
        Args:
            ingredients_text: 配料表文本
        
        Returns:
            AnalysisResult 分析结果
        
        Raises:
            ValueError: 输入为空时抛出
        """
        if not ingredients_text or not ingredients_text.strip():
            raise ValueError("配料表不能为空")
        
        # 构造 prompt
        prompt = ANALYSIS_PROMPT.format(ingredients_text=ingredients_text)
        
        # 调用 AI
        messages = [{"role": "user", "content": prompt}]
        response = self._provider.chat(messages)
        
        # 解析响应
        return self._parse_response(response)
    
    def analyze_image(self, image_base64: str) -> AnalysisResult:
        """
        分析配料表图片
        
        Args:
            image_base64: 图片 Base64 编码
        
        Returns:
            AnalysisResult 分析结果
        """
        if not image_base64:
            raise ValueError("图片不能为空")
        
        # 调用视觉 AI
        response = self._provider.vision(VISION_PROMPT, image_base64)
        
        # 解析响应
        return self._parse_response(response)
    
    def _parse_response(self, response: str) -> AnalysisResult:
        """解析 AI 响应"""
        try:
            # 尝试提取 JSON
            response = response.strip()
            if response.startswith("```"):
                # 去掉 markdown 代码块
                lines = response.split("\n")
                response = "\n".join(lines[1:-1])
            
            data = json.loads(response)
            
            # 构造结果
            good_ingredients = [
                IngredientInfo(**ing) for ing in data.get("good_ingredients", [])
            ]
            concerning_ingredients = [
                IngredientInfo(**ing) for ing in data.get("concerning_ingredients", [])
            ]
            
            return AnalysisResult(
                ingredients=data.get("ingredients", []),
                good_ingredients=good_ingredients,
                concerning_ingredients=concerning_ingredients,
                score=data.get("score", 50),
                summary=data.get("summary", ""),
                details=data.get("details", {})
            )
        except json.JSONDecodeError as e:
            # 如果解析失败，返回默认结果
            return AnalysisResult(
                ingredients=[],
                score=50,
                summary=f"解析失败: {str(e)}",
                details={"raw_response": response}
            )
