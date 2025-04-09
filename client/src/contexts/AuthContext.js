import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

// === 認證上下文開始 ===
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 從 localStorage 加載 token
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await api.get('/api/auth/me');
          setCurrentUser(response.data.user);
        } catch (err) {
          console.error('API 錯誤:', err.response?.data?.message || err.message);
          localStorage.removeItem('token');
          setError('身份驗證失敗，請重新登入');
        }
      }
      
      setLoading(false);
    };

    loadUser();
  }, []);

  // Google 登入處理
  const handleGoogleLogin = async (tokenId) => {
    try {
      setLoading(true);
      const response = await api.post('/api/auth/google', { tokenId });
      
      const { token, user } = response.data;
      
      // 保存 token 到 localStorage
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setCurrentUser(user);
      setError(null);
      
      return user;
    } catch (err) {
      console.error('API 錯誤:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || '登入失敗，請稍後再試');
      alert(err.response?.data?.message || '登入失敗，請稍後再試');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 登出
  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    error,
    handleGoogleLogin,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
// === 認證上下文結束 === 