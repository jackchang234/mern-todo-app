import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Box, Typography, CircularProgress } from '@mui/material';

// === 認證回調頁面開始 ===
const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    
    if (token) {
      // 保存 token 到 localStorage
      localStorage.setItem('token', token);
      
      // 重定向到首頁
      navigate('/');
    } else {
      // 如果沒有 token，重定向到登入頁面
      navigate('/login', { 
        state: { 
          error: '認證失敗，請重新嘗試登入' 
        }
      });
    }
  }, [location, navigate]);
  
  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh'
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 3 }}>
          登入中，請稍候...
        </Typography>
      </Box>
    </Container>
  );
};
// === 認證回調頁面結束 ===

export default AuthCallback; 