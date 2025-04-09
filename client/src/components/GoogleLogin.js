import React, { useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

// === Google 登入組件開始 ===
const GoogleLogin = () => {
  const { handleGoogleLogin } = useAuth();
  const googleButtonRef = useRef(null);

  useEffect(() => {
    // 確保 Google API 已加載完成
    if (window.google && googleButtonRef.current) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
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