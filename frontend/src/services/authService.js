import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

// Registrar un usuario
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  
  if (response.data) {
    const { token, ...user } = response.data; // Extrae el token y el resto de los datos
    localStorage.setItem('token', token);    // Guarda el token por separado
    localStorage.setItem('user', JSON.stringify(user)); // Guarda los datos del usuario
  }
  
  return response.data;
};

// Login de usuario
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  
  if (response.data) {
    const { token, ...user } = response.data; // Extrae el token y el resto de los datos
    localStorage.setItem('token', token);    // Guarda el token por separado
    localStorage.setItem('user', JSON.stringify(user)); // Guarda los datos del usuario
  }
  
  return response.data;
};

// Logout de usuario
const logout = () => {
  localStorage.removeItem('token');
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