import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  IconButton,
  Box,
  TextField,
  Button
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { updateTodo, deleteTodo } from '../services/todoService';

// === 待辦事項項目組件開始 ===
const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description,
    completed: todo.completed
  });

  // 切換完成狀態
  const handleToggleComplete = async () => {
    try {
      const updatedTodo = await updateTodo(todo._id, {
        ...todo,
        completed: !todo.completed
      });
      onUpdate(updatedTodo);
    } catch (err) {
      // 錯誤已在 service 中處理
    }
  };

  // 開始編輯
  const handleStartEdit = () => {
    setEditData({
      title: todo.title,
      description: todo.description,
      completed: todo.completed
    });
    setIsEditing(true);
  };

  // 取消編輯
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // 處理輸入變更
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 保存編輯
  const handleSave = async () => {
    try {
      if (!editData.title.trim()) {
        alert('標題不能為空');
        return;
      }

      const updatedTodo = await updateTodo(todo._id, {
        ...editData
      });
      onUpdate(updatedTodo);
      setIsEditing(false);
    } catch (err) {
      // 錯誤已在 service 中處理
    }
  };

  // 刪除待辦事項
  const handleDelete = async () => {
    try {
      if (window.confirm('確定要刪除此待辦事項嗎？')) {
        await deleteTodo(todo._id);
        onDelete(todo._id);
      }
    } catch (err) {
      // 錯誤已在 service 中處理
    }
  };

  // 查看模式
  if (!isEditing) {
    return (
      <Card sx={{ mb: 2, bgcolor: todo.completed ? '#f5f5f5' : 'white' }}>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" width="100%">
              <Checkbox
                checked={todo.completed}
                onChange={handleToggleComplete}
                color="primary"
              />
              <Box width="100%">
                <Typography 
                  variant="h6" 
                  sx={{ 
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'text.secondary' : 'text.primary'
                  }}
                >
                  {todo.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    textDecoration: todo.completed ? 'line-through' : 'none'
                  }}
                >
                  {todo.description}
                </Typography>
              </Box>
            </Box>
            <Box>
              <IconButton onClick={handleStartEdit} color="primary" size="small">
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDelete} color="error" size="small">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  }

  // 編輯模式
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <TextField
          fullWidth
          margin="normal"
          label="標題"
          name="title"
          value={editData.title}
          onChange={handleChange}
          variant="outlined"
          autoFocus
        />
        <TextField
          fullWidth
          margin="normal"
          label="描述"
          name="description"
          value={editData.description || ''}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={2}
        />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<CancelIcon />}
            onClick={handleCancelEdit}
            sx={{ mr: 1 }}
          >
            取消
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
          >
            保存
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
// === 待辦事項項目組件結束 ===

export default TodoItem;