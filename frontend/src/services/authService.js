import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

// Registrar un usuario
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  
  return response.data;
};

// Login de usuario
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  
  return response.data;
};

// Logout de usuario
const logout = () => {
  localStorage.removeItem('user');
};

// Obtener usuario del localStorage
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser
};

export default authService;
