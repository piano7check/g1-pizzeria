const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generar JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Registrar un nuevo usuario
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const { nombre, email, password } = req.body;

  // Verificar si todos los campos están completos
  if (!nombre || !email || !password) {
    res.status(400);
    throw new Error('Por favor completa todos los campos');
  }

  // Verificar si el usuario ya existe
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('El usuario ya existe');
  }

  // Crear usuario
  const user = await User.create({
    nombre,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      nombre: user.nombre,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Datos de usuario inválidos');
  }
};

// @desc    Autenticar usuario / obtener token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Verificar si el email existe
  const user = await User.findOne({ email }).select('+password');

  // Verificar si el usuario existe y la contraseña coincide
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      nombre: user.nombre,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Email o contraseña incorrectos');
  }
};

// @desc    Obtener perfil de usuario
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      nombre: user.nombre,
      email: user.email,
      direccion: user.direccion,
      telefono: user.telefono,
    });
  } else {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }
};

// @desc    Actualizar perfil de usuario
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.nombre = req.body.nombre || user.nombre;
    user.email = req.body.email || user.email;
    user.direccion = req.body.direccion || user.direccion;
    user.telefono = req.body.telefono || user.telefono;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      nombre: updatedUser.nombre,
      email: updatedUser.email,
      direccion: updatedUser.direccion,
      telefono: updatedUser.telefono,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
};
