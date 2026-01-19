# PetPick - 宠物消费助手

## 项目概述

PetPick（宠选）是一个 AI 驱动的宠物食品成分解读服务，帮助宠物主人快速了解宠物食品的成分质量。

### 技术栈

**后端 API**:
- Python 3.11+
- FastAPI (Web 框架)
- uv (包管理器)
- pytest (测试框架)
- OpenAI SDK (AI 接口抽象层)

**前端小程序** (待开发):
- uni-app (Vue 3)
- uView UI

### 项目结构

```
petpick-api/
├── app/
│   ├── main.py              # FastAPI 入口
│   ├── config.py            # 配置管理
│   ├── api/
│   │   └── routes.py        # API 路由
│   ├── services/
│   │   ├── ai_provider.py   # AI 提供商抽象层
│   │   └── ingredient_analyzer.py  # 成分解读服务
│   └── models/
│       └── schemas.py       # Pydantic 数据模型
├── tests/
│   ├── test_api.py          # API 测试
│   └── test_ingredient_analyzer.py  # 服务测试
├── pyproject.toml           # 项目配置
└── README.md
```

## 快速开始

### 1. 安装依赖

```bash
cd petpick-api
uv venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
uv pip install -e ".[dev]"
```

### 2. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env，填入你的 AI API Key
```

### 3. 运行测试

```bash
pytest tests/ -v
```

### 4. 启动开发服务器

```bash
python -m app.main
# 或
uvicorn app.main:app --reload
```

访问 http://localhost:8000/docs 查看 API 文档

## API 接口

### 健康检查

```
GET /health
```

### 分析配料表文本

```
POST /api/analyze/text
Content-Type: application/json

{
  "ingredients_text": "鸡肉、大米、玉米"
}
```

### 分析配料表图片

```
POST /api/analyze/image
Content-Type: application/json

{
  "image_base64": "base64_encoded_image"
}
```

### 获取历史记录

```
GET /api/history
```

## AI 提供商支持

支持多个 AI 提供商，通过配置文件切换：

- **OpenAI** (GPT-4o)
- **DeepSeek** (DeepSeek-VL) - 推荐，性价比高
- **Qwen** (通义千问 VL)
- **Zhipu** (智谱 GLM-4V)

所有提供商都兼容 OpenAI API 格式。

## 开发原则

本项目采用 **测试驱动开发 (TDD)**：
1. 先写测试
2. 运行测试（应该失败）
3. 写最小代码使测试通过
4. 重构

当前测试覆盖率：**14/14 测试通过** ✅

## 下一步

- [ ] 创建 uni-app 小程序前端
- [ ] 接入真实 AI 提供商
- [ ] 添加数据库持久化
- [ ] 部署到生产环境

## License

MIT
