@echo off
echo 正在啟動 MERN Todo 應用...

cd server
echo 安裝服務器依賴...
call npm install

cd ../client
echo 安裝客戶端依賴...
call npm install

cd ..
echo 啟動開發服務器...
call npm run dev 