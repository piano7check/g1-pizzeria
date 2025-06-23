import axios from 'axios';

const API_URL = 'http://localhost:5000/api/pizzas';

const getPizzas = async () => {
  try {
    const response = await axios.get(API_URL); // Sin headers de autorización
    return response.data;
  } catch (error) {
    console.error('Error fetching pizzas:', error);
    throw error;
  }
};

export default { getPizzas };