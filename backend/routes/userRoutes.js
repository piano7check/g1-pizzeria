const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Rutas públicas
router.post('/', registerUser);
router.post('/login', loginUser);

// Rutas protegidas
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
