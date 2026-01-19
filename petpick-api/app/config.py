"""
配置管理
"""
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Literal
from functools import lru_cache


class Settings(BaseSettings):
    """应用配置"""
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8"
    )
    
    # AI Provider
    ai_provider: Literal["openai", "deepseek", "qwen", "zhipu"] = "deepseek"
    
    # API Keys
    openai_api_key: str = ""
    deepseek_api_key: str = ""
    qwen_api_key: str = ""
    zhipu_api_key: str = ""
    
    # Database
    database_url: str = "sqlite+aiosqlite:///./petpick.db"
    
    # Server
    host: str = "0.0.0.0"
    port: int = 8000
    debug: bool = True


@lru_cache()
def get_settings() -> Settings:
    """获取配置单例"""
    return Settings()
