FROM node:18-alpine

WORKDIR /app

# 複製package.json文件
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# 安裝依賴
RUN npm run install-all

# 複製應用程序代碼
COPY . .

# 設置環境變量
ENV NODE_ENV=production
ENV PORT=5000

# 暴露端口
EXPOSE 3000
EXPOSE 5000

# 啟動應用程序
CMD ["npm", "run", "dev"] 