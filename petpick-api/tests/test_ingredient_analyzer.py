"""
成分解读服务测试 - TDD 先写测试

测试场景:
1. 解析配料表文本，返回成分分析结果
2. 识别好的成分和需要注意的成分
3. 给出整体评分和建议
"""
import pytest
from app.services.ingredient_analyzer import IngredientAnalyzer, AnalysisResult


class TestIngredientAnalyzer:
    """成分解读器测试"""
    
    @pytest.fixture
    def analyzer(self):
        """创建测试用的分析器实例"""
        # 使用 mock AI provider
        return IngredientAnalyzer(ai_provider=None)  # 先用 None，后续实现

    def test_analyze_returns_analysis_result(self, analyzer):
        """分析配料表应返回 AnalysisResult 对象"""
        # Arrange
        ingredients_text = "鸡肉、鸡肉粉、大米、玉米、鸡油"
        
        # Act
        result = analyzer.analyze(ingredients_text)
        
        # Assert
        assert isinstance(result, AnalysisResult)
        assert result.ingredients is not None
        assert result.score is not None
        assert result.summary is not None
    
    def test_analyze_identifies_good_ingredients(self, analyzer):
        """应识别出好的成分（如真实肉类）"""
        # Arrange
        ingredients_text = "新鲜鸡肉、三文鱼、鸡肝"
        
        # Act
        result = analyzer.analyze(ingredients_text)
        
        # Assert
        assert len(result.good_ingredients) > 0
        assert any('鸡肉' in ing.name for ing in result.good_ingredients)
    
    def test_analyze_identifies_concerning_ingredients(self, analyzer):
        """应识别出需要注意的成分（如添加剂）"""
        # Arrange
        ingredients_text = "肉骨粉、玉米淀粉、诱食剂、防腐剂"
        
        # Act
        result = analyzer.analyze(ingredients_text)
        
        # Assert
        assert len(result.concerning_ingredients) > 0
    
    def test_analyze_returns_score_between_0_and_100(self, analyzer):
        """评分应在 0-100 之间"""
        # Arrange
        ingredients_text = "鸡肉、大米、玉米"
        
        # Act
        result = analyzer.analyze(ingredients_text)
        
        # Assert
        assert 0 <= result.score <= 100
    
    def test_analyze_empty_input_raises_error(self, analyzer):
        """空输入应抛出错误"""
        # Arrange
        ingredients_text = ""
        
        # Act & Assert
        with pytest.raises(ValueError, match="配料表不能为空"):
            analyzer.analyze(ingredients_text)
    
    def test_analyze_with_image_base64(self, analyzer):
        """应支持图片 base64 输入（用于 OCR + 分析）"""
        # Arrange
        image_base64 = "data:image/jpeg;base64,/9j/4AAQSkZJRg..."  # 示例
        
        # Act
        result = analyzer.analyze_image(image_base64)
        
        # Assert
        assert isinstance(result, AnalysisResult)


class TestAnalysisResult:
    """分析结果模型测试"""
    
    def test_analysis_result_creation(self):
        """应能创建分析结果对象"""
        result = AnalysisResult(
            ingredients=["鸡肉", "大米"],
            good_ingredients=[],
            concerning_ingredients=[],
            score=85,
            summary="这是一款不错的猫粮",
            details={}
        )
        
        assert result.score == 85
        assert result.summary == "这是一款不错的猫粮"
    
    def test_analysis_result_to_dict(self):
        """应能转换为字典（用于 API 响应）"""
        result = AnalysisResult(
            ingredients=["鸡肉", "大米"],
            good_ingredients=[],
            concerning_ingredients=[],
            score=85,
            summary="这是一款不错的猫粮",
            details={}
        )
        
        data = result.to_dict()
        
        assert isinstance(data, dict)
        assert "score" in data
        assert "summary" in data
