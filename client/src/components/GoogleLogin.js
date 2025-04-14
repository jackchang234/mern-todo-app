import React, { useEffect, useRef, useState } from 'react';
import { Button, Typography, Box, Alert } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

// === Google 登入組件開始 ===
const GoogleLogin = () => {
  const { handleGoogleLogin } = useAuth();
  const googleButtonRef = useRef(null);
  const [error, setError] = useState(null);
  
  // 硬編碼 Google Client ID - 確保在 Render 環境中可用
  const GOOGLE_CLIENT_ID = '971251904501-8q699c73mjqiof39jnhko8oja0c4kntp.apps.googleusercontent.com';

  useEffect(() => {
    // 加載 Google API
    const loadGoogleAPI = () => {
      // 檢查是否已加載
      if (window.google) {
        initializeGoogleAPI();
        return;
      }
      
      // 手動加載 Google API
      const script = document.createElement('script');
      script.src = `https://accounts.google.com/gsi/client?client_id=${GOOGLE_CLIENT_ID}`;
      script.onload = () => initializeGoogleAPI();
      script.onerror = () => setError('無法加載 Google 認證服務');
      document.body.appendChild(script);
    };
    
    // 初始化 Google API
    const initializeGoogleAPI = () => {
      if (!window.google) {
        setError('Google API 未正確加載');
        return;
      }
      
      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse
        });
        
        window.google.accounts.id.renderButton(
          googleButtonRef.current,
          { theme: 'outline', size: 'large', width: '100%' }
        );
      } catch (err) {
        console.error('Google API 初始化錯誤:', err);
        setError('Google 登入初始化失敗');
      }
    };
    
    loadGoogleAPI();
  }, []);
  
  const handleCredentialResponse = (response) => {
    if (response && response.credential) {
      handleGoogleLogin(response.credential);
    } else {
      console.error('Google 登入失敗：未獲取 credential');
      setError('Google 登入失敗，未獲取憑證');
    }
  };

  if (error) {
    return (
      <Box sx={{ mt: 3 }}>
        <Alert severity="error">{error}</Alert>
        <Typography variant="body2" sx={{ mt: 1 }}>
          請嘗試刷新頁面或使用其他登入方式。
        </Typography>
      </Box>
    );
  }

  return (
    <div className="google-login-container" style={{ marginTop: '20px' }}>
      <div ref={googleButtonRef}></div>
      {!window.google && (
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          disabled
        >
          Google 登入正在加載中...
        </Button>
      )}
    </div>
  );
};
// === Google 登入組件結束 ===

export default GoogleLogin; 