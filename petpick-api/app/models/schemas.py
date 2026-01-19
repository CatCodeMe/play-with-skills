"""
Pydantic 数据模型
"""
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime


class IngredientItem(BaseModel):
    """单个成分"""
    name: str
    category: str = ""  # 如: 肉类、谷物、添加剂
    is_good: bool = True
    note: str = ""


class AnalyzeTextRequest(BaseModel):
    """文本分析请求"""
    ingredients_text: str = Field(..., min_length=1, max_length=10000, description="配料表文本")


class AnalyzeImageRequest(BaseModel):
    """图片分析请求"""
    image_base64: str = Field(..., description="图片 Base64 编码")


class AnalysisResponse(BaseModel):
    """分析结果响应"""
    id: Optional[str] = None
    ingredients: List[str]
    good_ingredients: List[IngredientItem] = []
    concerning_ingredients: List[IngredientItem] = []
    score: int = Field(..., ge=0, le=100)
    summary: str
    details: Dict[str, Any] = {}
    created_at: Optional[datetime] = None


class HistoryItem(BaseModel):
    """历史记录项"""
    id: str
    ingredients_text: str
    score: int
    summary: str
    created_at: datetime


class ErrorResponse(BaseModel):
    """错误响应"""
    error: str
    detail: Optional[str] = None
