# PetPick 小程序前端

## 技术栈

- **框架**: uni-app (Vue 3 + TypeScript + Vite)
- **包管理**: bun
- **UI 组件**: 待选择（uView UI 或 NutUI）
- **状态管理**: Pinia
- **HTTP 请求**: uni-app 内置 uni.request

## 项目结构

```
petpick-miniprogram/
├── src/
│   ├── pages/              # 页面
│   │   ├── index/          # 首页
│   │   ├── analyze/        # 分析页
│   │   └── history/        # 历史记录
│   ├── components/         # 组件
│   ├── api/                # API 接口
│   ├── store/              # 状态管理
│   ├── utils/              # 工具函数
│   └── static/             # 静态资源
├── manifest.json           # 小程序配置
├── pages.json              # 页面路由
└── package.json
```

## 开发命令

```bash
# 安装依赖
bun install

# 开发 - H5
bun run dev:h5

# 开发 - 微信小程序
bun run dev:mp-weixin

# 构建 - 微信小程序
bun run build:mp-weixin
```

## 核心功能

1. **首页** - 拍照/输入配料表
2. **分析页** - 显示 AI 解读结果
3. **历史记录** - 查看过往分析

## API 对接

后端 API 地址配置在 `src/config/index.ts`

```typescript
export const API_BASE_URL = 'http://localhost:8000'
```

## 小程序发布准备

### 1. 小程序注册

- 访问 https://mp.weixin.qq.com
- 注册小程序账号（个人/企业）
- 获取 AppID

### 2. 配置 manifest.json

```json
{
  "mp-weixin": {
    "appid": "你的小程序AppID"
  }
}
```

### 3. 小程序备案

按照之前文档 `2026-01-19-petpick-technical-plan.md` 中的流程完成备案

### 4. 构建与上传

```bash
# 构建小程序
bun run build:mp-weixin

# 使用微信开发者工具打开 dist/build/mp-weixin 目录
# 点击"上传"提交审核
```

## 下一步

- [ ] 安装 UI 组件库
- [ ] 创建核心页面
- [ ] 对接后端 API
- [ ] 测试与优化
