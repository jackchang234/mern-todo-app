import React, { useEffect, useRef, useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

// === Google 登入組件開始 ===
const GoogleLogin = () => {
  const { handleGoogleLogin } = useAuth();
  const googleButtonRef = useRef(null);
  const [clientIdError, setClientIdError] = useState(false);

  useEffect(() => {
    // 獲取 Client ID
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    console.log('Google Client ID:', clientId);
    
    // 檢查是否有 Client ID
    if (!clientId) {
      console.error('未設置 Google Client ID 環境變數');
      setClientIdError(true);
      return;
    }
    
    // 確保 Google API 已加載完成
    if (window.google && googleButtonRef.current) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse
      });

      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        { theme: 'outline', size: 'large', width: '100%' }
      );
    }
  }, [handleGoogleLogin]);

  const handleCredentialResponse = (response) => {
    // 處理 Google 返回的 credential
    if (response.credential) {
      handleGoogleLogin(response.credential);
    } else {
      console.error('Google 登入失敗：未獲取 credential');
      alert('Google 登入失敗，請稍後再試');
    }
  };

  if (clientIdError) {
    return (
      <Box sx={{ mt: 3, p: 2, bgcolor: '#ffebee', borderRadius: 1 }}>
        <Typography color="error" variant="body1" align="center">
          Google 登入未配置正確。請聯繫管理員設置 Google Client ID。
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