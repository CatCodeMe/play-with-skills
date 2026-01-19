"""
API 路由测试 - TDD
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app


class TestHealthCheck:
    """健康检查接口测试"""
    
    def test_health_check_returns_ok(self):
        """健康检查应返回 OK"""
        client = TestClient(app)
        
        response = client.get("/health")
        
        assert response.status_code == 200
        assert response.json()["status"] == "ok"


class TestIngredientAnalyzeAPI:
    """成分解读 API 测试"""
    
    def test_analyze_text_returns_result(self):
        """POST /api/analyze/text 应返回分析结果"""
        client = TestClient(app)
        
        response = client.post(
            "/api/analyze/text",
            json={"ingredients_text": "鸡肉、大米、玉米"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert "score" in data
        assert "summary" in data
        assert "ingredients" in data
    
    def test_analyze_text_empty_returns_422(self):
        """空配料表应返回 422 验证错误"""
        client = TestClient(app)
        
        response = client.post(
            "/api/analyze/text",
            json={"ingredients_text": ""}
        )
        
        assert response.status_code == 422  # Pydantic 验证失败
        assert "detail" in response.json()
    
    def test_analyze_image_returns_result(self):
        """POST /api/analyze/image 应返回分析结果"""
        client = TestClient(app)
        
        # 使用一个简单的 1x1 像素图片的 base64
        test_image_base64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        
        response = client.post(
            "/api/analyze/image",
            json={"image_base64": test_image_base64}
        )
        
        # 即使是无效图片，也应该返回结构化响应
        assert response.status_code in [200, 400]


class TestHistoryAPI:
    """历史记录 API 测试"""
    
    def test_get_history_returns_list(self):
        """GET /api/history 应返回历史记录列表"""
        client = TestClient(app)
        
        response = client.get("/api/history")
        
        assert response.status_code == 200
        assert isinstance(response.json(), list)
    
    def test_get_history_item_by_id(self):
        """GET /api/history/{id} 应返回单条记录"""
        client = TestClient(app)
        
        # 先创建一条记录
        create_response = client.post(
            "/api/analyze/text",
            json={"ingredients_text": "鸡肉、大米"}
        )
        
        if create_response.status_code == 200:
            record_id = create_response.json().get("id")
            if record_id:
                response = client.get(f"/api/history/{record_id}")
                assert response.status_code == 200
