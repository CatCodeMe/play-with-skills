"""
AI 提供商抽象层

支持的提供商:
- OpenAI (GPT-4o)
- DeepSeek (DeepSeek-VL)
- Qwen (通义千问 VL)
- Zhipu (智谱 GLM-4V)

所有提供商都兼容 OpenAI API 格式
"""
from abc import ABC, abstractmethod
from typing import Optional, Dict, Any, List
from openai import OpenAI
from app.config import get_settings


class AIProvider(ABC):
    """AI 提供商抽象基类"""
    
    @abstractmethod
    def chat(self, messages: List[Dict[str, Any]], **kwargs) -> str:
        """发送聊天请求"""
        pass
    
    @abstractmethod
    def vision(self, prompt: str, image_base64: str, **kwargs) -> str:
        """发送视觉识别请求"""
        pass


class OpenAICompatibleProvider(AIProvider):
    """兼容 OpenAI API 格式的提供商"""
    
    def __init__(
        self,
        api_key: str,
        base_url: Optional[str] = None,
        model: str = "gpt-4o",
        vision_model: Optional[str] = None
    ):
        self.client = OpenAI(api_key=api_key, base_url=base_url)
        self.model = model
        self.vision_model = vision_model or model
    
    def chat(self, messages: List[Dict[str, Any]], **kwargs) -> str:
        """发送聊天请求"""
        response = self.client.chat.completions.create(
            model=kwargs.get("model", self.model),
            messages=messages,
            **{k: v for k, v in kwargs.items() if k != "model"}
        )
        return response.choices[0].message.content or ""
    
    def vision(self, prompt: str, image_base64: str, **kwargs) -> str:
        """发送视觉识别请求"""
        messages = [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{image_base64}"
                        }
                    }
                ]
            }
        ]
        
        response = self.client.chat.completions.create(
            model=kwargs.get("model", self.vision_model),
            messages=messages,
            max_tokens=kwargs.get("max_tokens", 2000)
        )
        return response.choices[0].message.content or ""


class MockAIProvider(AIProvider):
    """Mock AI 提供商，用于测试"""
    
    def chat(self, messages: List[Dict[str, Any]], **kwargs) -> str:
        """返回模拟响应，根据输入内容返回不同结果"""
        # 获取用户输入的内容
        user_content = ""
        for msg in messages:
            if msg.get("role") == "user":
                user_content = msg.get("content", "")
                break
        
        # 根据输入内容返回不同的响应
        if "诱食剂" in user_content or "防腐剂" in user_content or "肉骨粉" in user_content:
            # 包含不良成分
            return """
{
    "ingredients": ["肉骨粉", "玉米淀粉", "诱食剂", "防腐剂"],
    "good_ingredients": [],
    "concerning_ingredients": [
        {"name": "肉骨粉", "category": "肉类副产品", "is_good": false, "note": "品质较差的蛋白来源"},
        {"name": "诱食剂", "category": "添加剂", "is_good": false, "note": "人工添加剂，可能影响健康"},
        {"name": "防腐剂", "category": "添加剂", "is_good": false, "note": "化学防腐剂"}
    ],
    "score": 45,
    "summary": "这款食品含有较多需要注意的成分，不推荐长期食用。"
}
"""
        else:
            # 正常成分
            return """
{
    "ingredients": ["鸡肉", "大米", "玉米"],
    "good_ingredients": [
        {"name": "鸡肉", "category": "肉类", "is_good": true, "note": "优质蛋白来源"}
    ],
    "concerning_ingredients": [],
    "score": 85,
    "summary": "这是一款不错的宠物食品，主要成分为鸡肉，蛋白质含量较高。"
}
"""
    
    def vision(self, prompt: str, image_base64: str, **kwargs) -> str:
        """返回模拟响应"""
        return self.chat([{"role": "user", "content": prompt}], **kwargs)


def create_ai_provider(provider_name: Optional[str] = None) -> AIProvider:
    """
    工厂函数：创建 AI 提供商实例
    
    Args:
        provider_name: 提供商名称，默认从配置读取
    
    Returns:
        AIProvider 实例
    """
    settings = get_settings()
    provider = provider_name or settings.ai_provider
    
    if provider == "mock":
        return MockAIProvider()
    
    if provider == "openai":
        return OpenAICompatibleProvider(
            api_key=settings.openai_api_key,
            model="gpt-4o",
            vision_model="gpt-4o"
        )
    
    if provider == "deepseek":
        return OpenAICompatibleProvider(
            api_key=settings.deepseek_api_key,
            base_url="https://api.deepseek.com",
            model="deepseek-chat",
            vision_model="deepseek-vl"  # 视觉模型
        )
    
    if provider == "qwen":
        return OpenAICompatibleProvider(
            api_key=settings.qwen_api_key,
            base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
            model="qwen-turbo",
            vision_model="qwen-vl-max"
        )
    
    if provider == "zhipu":
        return OpenAICompatibleProvider(
            api_key=settings.zhipu_api_key,
            base_url="https://open.bigmodel.cn/api/paas/v4",
            model="glm-4",
            vision_model="glm-4v"
        )
    
    raise ValueError(f"Unknown AI provider: {provider}")
