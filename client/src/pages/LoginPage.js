import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  Typography, 
  Box,
  Divider
} from '@mui/material';
import GoogleLogin from '../components/GoogleLogin';
import { useAuth } from '../contexts/AuthContext';

// === 登入頁面開始 ===
const LoginPage = () => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  
  // 如果用戶已登入，重定向到首頁
  useEffect(() => {
    if (currentUser && !loading) {
      navigate('/');
    }
  }, [currentUser, loading, navigate]);

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="h5">
            加載中...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              待辦事項應用
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              使用 Google 帳號登入以管理您的待辦事項
            </Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              登入
            </Typography>
            <GoogleLogin />
          </Box>
        </Paper>
        
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            本應用使用 MERN Stack 開發 (MongoDB, Express, React, Node.js)
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};
// === 登入頁面結束 ===

export default LoginPage; 