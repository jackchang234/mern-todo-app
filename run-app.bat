@echo off
echo 正在啟動MERN Todo應用...
echo.
echo 切換到項目目錄
cd /d "C:\Users\user\Desktop\jackchang\cursor\mern_stack"
echo.
echo 安裝所有依賴
call npm run install-all
echo.
echo 啟動開發服務器
call npm run dev 