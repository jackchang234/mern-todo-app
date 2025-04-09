import api from './api';

// === 待辦事項服務開始 ===
/**
 * 獲取所有待辦事項
 */
export const getTodos = async () => {
  try {
    const response = await api.get('/api/todos');
    return response.data.data;
  } catch (err) {
    console.error('API 錯誤:', err.response?.data?.message || err.message);
    alert(err.response?.data?.message || '獲取待辦事項失敗');
    throw err;
  }
};

/**
 * 獲取單個待辦事項
 * @param {string} id 待辦事項 ID
 */
export const getTodo = async (id) => {
  try {
    const response = await api.get(`/api/todos/${id}`);
    return response.data.data;
  } catch (err) {
    console.error('API 錯誤:', err.response?.data?.message || err.message);
    alert(err.response?.data?.message || '獲取待辦事項失敗');
    throw err;
  }
};

/**
 * 創建新待辦事項
 * @param {Object} todoData 待辦事項資料
 */
export const createTodo = async (todoData) => {
  try {
    const response = await api.post('/api/todos', todoData);
    return response.data.data;
  } catch (err) {
    console.error('API 錯誤:', err.response?.data?.message || err.message);
    alert(err.response?.data?.message || '創建待辦事項失敗');
    throw err;
  }
};

/**
 * 更新待辦事項
 * @param {string} id 待辦事項 ID
 * @param {Object} todoData 待辦事項資料
 */
export const updateTodo = async (id, todoData) => {
  try {
    const response = await api.put(`/api/todos/${id}`, todoData);
    return response.data.data;
  } catch (err) {
    console.error('API 錯誤:', err.response?.data?.message || err.message);
    alert(err.response?.data?.message || '更新待辦事項失敗');
    throw err;
  }
};

/**
 * 刪除待辦事項
 * @param {string} id 待辦事項 ID
 */
export const deleteTodo = async (id) => {
  try {
    await api.delete(`/api/todos/${id}`);
    return true;
  } catch (err) {
    console.error('API 錯誤:', err.response?.data?.message || err.message);
    alert(err.response?.data?.message || '刪除待辦事項失敗');
    throw err;
  }
};
// === 待辦事項服務結束 === 