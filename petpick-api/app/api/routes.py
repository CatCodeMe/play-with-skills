"""
API 路由
"""
from fastapi import APIRouter, HTTPException
from typing import List
from app.models.schemas import (
    AnalyzeTextRequest,
    AnalyzeImageRequest,
    AnalysisResponse,
    HistoryItem,
    ErrorResponse
)
from app.services.ingredient_analyzer import IngredientAnalyzer

router = APIRouter()

# 创建解读器实例（使用 Mock 进行开发）
analyzer = IngredientAnalyzer()

# 临时存储历史记录（后续换成数据库）
history_store: List[dict] = []


@router.post(
    "/analyze/text",
    response_model=AnalysisResponse,
    responses={400: {"model": ErrorResponse}}
)
async def analyze_text(request: AnalyzeTextRequest):
    """
    分析配料表文本
    
    - **ingredients_text**: 配料表文本内容
    """
    try:
        result = analyzer.analyze(request.ingredients_text)
        
        # 生成 ID 并保存到历史
        import uuid
        from datetime import datetime
        
        record_id = str(uuid.uuid4())[:8]
        record = {
            "id": record_id,
            "ingredients_text": request.ingredients_text,
            **result.to_dict(),
            "created_at": datetime.now().isoformat()
        }
        history_store.append(record)
        
        return {**result.to_dict(), "id": record_id}
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail={"error": str(e)})


@router.post(
    "/analyze/image",
    response_model=AnalysisResponse,
    responses={400: {"model": ErrorResponse}}
)
async def analyze_image(request: AnalyzeImageRequest):
    """
    分析配料表图片
    
    - **image_base64**: 图片 Base64 编码
    """
    try:
        result = analyzer.analyze_image(request.image_base64)
        
        # 生成 ID
        import uuid
        record_id = str(uuid.uuid4())[:8]
        
        return {**result.to_dict(), "id": record_id}
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail={"error": str(e)})


@router.get("/history", response_model=List[HistoryItem])
async def get_history():
    """获取历史记录列表"""
    return [
        {
            "id": record["id"],
            "ingredients_text": record.get("ingredients_text", ""),
            "score": record.get("score", 0),
            "summary": record.get("summary", ""),
            "created_at": record.get("created_at")
        }
        for record in history_store
    ]


@router.get("/history/{record_id}", response_model=AnalysisResponse)
async def get_history_item(record_id: str):
    """获取单条历史记录"""
    for record in history_store:
        if record["id"] == record_id:
            return record
    
    raise HTTPException(status_code=404, detail="Record not found")
