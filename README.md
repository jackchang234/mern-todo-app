# MERN Stack Todo App

一個使用MERN (MongoDB, Express, React, Node.js) 技術棧構建的待辦事項應用，支持Google OAuth登入。

## 功能特性

- 使用JWT的用戶認證
- Google OAuth登入
- 待辦事項的創建、讀取、更新和刪除 (CRUD)
- 響應式設計
- 使用Material-UI組件

## 技術棧

- **前端**：React, Material-UI
- **後端**：Node.js, Express
- **數據庫**：MongoDB
- **認證**：JWT, Google OAuth

## 安裝與運行

### 前提條件

- Node.js
- npm 或 yarn
- MongoDB (本地或Atlas雲服務)

### 安裝步驟

1. 克隆倉庫
   ```
   git clone <repository-url>
   cd mern-stack
   ```

2. 安裝依賴
   ```
   npm run install-all
   ```

3. 配置環境變量
   - 複製`.env.example`文件到`.env`並更新配置
   - 配置MongoDB連接字符串
   - 設置Google OAuth憑證

4. 運行應用
   ```
   npm run dev
   ```

## 測試

### 運行後端測試

```
cd server
npm test
```

### 生成測試覆蓋率報告

```
cd server
npm run test:coverage
```

## CI/CD

本項目使用GitHub Actions進行持續集成，每次推送或拉取請求都會自動運行測試。

## 項目結構

```
mern-stack/
├── .github/           # GitHub Actions工作流配置
├── client/            # React前端
│   ├── public/        # 靜態文件
│   └── src/           # 源代碼
│       ├── components/  # 可重用組件
│       ├── contexts/    # 上下文（包括認證）
│       ├── pages/       # 頁面組件
│       └── services/    # API服務
├── server/            # Node.js後端
│   ├── config/        # 配置文件
│   ├── controllers/   # 路由控制器
│   ├── middleware/    # 中間件
│   ├── models/        # 數據模型
│   ├── routes/        # API路由
│   └── tests/         # 測試文件
└── .env               # 環境變量
```

## 授權

MIT 