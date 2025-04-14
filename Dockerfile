# 使用 Node.js 作為基礎鏡像
FROM node:16-alpine

# 設置工作目錄
WORKDIR /app

# 複製 package.json 文件
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# 安裝依賴
RUN npm run install-all

# 複製源代碼
COPY . .

# 構建前端
RUN cd client && npm run build

# 設置環境變數
ENV NODE_ENV=production

# 暴露端口
EXPOSE 10000

# 啟動應用
CMD ["npm", "start"] 