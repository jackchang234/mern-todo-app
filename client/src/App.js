import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container, Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from './contexts/AuthContext';

// 頁面導入 - 使用實際存在的頁面
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';
import AuthCallback from './pages/AuthCallback';

// 私有路由保護
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  return currentUser ? children : <Navigate to="/login" />;
};

// 簡易導航欄
const Navbar = () => {
  const { currentUser, logout } = useAuth();
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          待辦事項應用
        </Typography>
        {currentUser && (
          <Button color="inherit" onClick={logout}>
            登出
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

function App() {
  const { currentUser } = useAuth();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <TodoPage />
            </PrivateRoute>
          } />
          <Route path="/login" element={currentUser ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App; 