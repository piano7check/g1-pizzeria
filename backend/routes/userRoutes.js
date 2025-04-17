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

// Rutas protegidas (temporalmente sin protección)
router.route('/profile')
  .get(getUserProfile) // Se ha quitado la protección temporalmente
  .put(updateUserProfile); // Se ha quitado la protección temporalmente

// Código original con protección:
// router.route('/profile')
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile);

module.exports = router;
