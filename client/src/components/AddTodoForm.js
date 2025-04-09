import React, { useState } from 'react';
import { 
  Paper, 
  TextField, 
  Button, 
  Box,
  Typography
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { createTodo } from '../services/todoService';

// === 添加待辦事項表單開始 ===
const AddTodoForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('標題不能為空');
      return;
    }
    
    try {
      setLoading(true);
      const newTodo = await createTodo(formData);
      onAdd(newTodo);
      
      // 重設表單
      setFormData({
        title: '',
        description: ''
      });
    } catch (err) {
      // 錯誤已在 service 中處理
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" mb={2}>
        新增待辦事項
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="標題"
          name="title"
          value={formData.title}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
          placeholder="輸入待辦事項標題"
        />
        
        <TextField
          fullWidth
          label="描述 (可選)"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          multiline
          rows={3}
          placeholder="輸入詳細描述"
        />
        
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            disabled={loading}
          >
            {loading ? '新增中...' : '新增待辦事項'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};
// === 添加待辦事項表單結束 ===

export default AddTodoForm; 