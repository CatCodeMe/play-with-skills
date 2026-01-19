"""
PetPick API - 宠物消费助手后端服务

FastAPI 主入口
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as api_router
from app.config import get_settings

settings = get_settings()

# 创建 FastAPI 应用
app = FastAPI(
    title="PetPick API",
    description="宠物消费助手 - AI 驱动的宠物食品成分解读服务",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS 配置（允许小程序访问）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 生产环境应限制
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    """健康检查"""
    return {
        "status": "ok",
        "version": "0.1.0",
        "ai_provider": settings.ai_provider
    }


# 注册 API 路由
app.include_router(api_router, prefix="/api", tags=["API"])


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug
    )
