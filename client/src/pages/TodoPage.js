import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  CircularProgress,
  AppBar,
  Toolbar,
  Button,
  Divider,
  Paper,
  Alert
} from '@mui/material';
import { ExitToApp as LogoutIcon } from '@mui/icons-material';
import TodoItem from '../components/TodoItem';
import AddTodoForm from '../components/AddTodoForm';
import { useAuth } from '../contexts/AuthContext';
import { getTodos } from '../services/todoService';

// === 待辦事項頁面開始 ===
const TodoPage = () => {
  const { currentUser, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 加載待辦事項
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const data = await getTodos();
        setTodos(data);
        setError(null);
      } catch (err) {
        setError('獲取待辦事項失敗');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // 添加待辦事項
  const handleAddTodo = (newTodo) => {
    setTodos(prev => [newTodo, ...prev]);
  };

  // 更新待辦事項
  const handleUpdateTodo = (updatedTodo) => {
    setTodos(prev => 
      prev.map(todo => 
        todo._id === updatedTodo._id ? updatedTodo : todo
      )
    );
  };

  // 刪除待辦事項
  const handleDeleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo._id !== id));
  };

  // 登出
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* 導航欄 */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            待辦事項管理
          </Typography>
          <Box display="flex" alignItems="center">
            {currentUser && (
              <>
                <Box display="flex" alignItems="center">
                  {currentUser.picture && (
                    <Box
                      component="img"
                      src={currentUser.picture}
                      alt={currentUser.name}
                      sx={{ width: 35, height: 35, borderRadius: '50%', mr: 1 }}
                    />
                  )}
                  <Typography variant="body1" sx={{ mr: 2 }}>
                    {currentUser.name}
                  </Typography>
                </Box>
                <Button 
                  color="inherit" 
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                >
                  登出
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box mb={4}>
          <AddTodoForm onAdd={handleAddTodo} />
        </Box>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            我的待辦事項
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : todos.length === 0 ? (
            <Alert severity="info" sx={{ mt: 2 }}>
              您還沒有待辦事項。使用上方表單添加一個新的待辦事項。
            </Alert>
          ) : (
            <Box>
              {todos.map(todo => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onUpdate={handleUpdateTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </Box>
          )}
        </Paper>
      </Container>
    </>
  );
};
// === 待辦事項頁面結束 ===

export default TodoPage; 