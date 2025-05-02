const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generar JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Validar email
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// @desc    Registrar un nuevo usuario
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const { nombre, email, password } = req.body;

  // Validaciones
  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Por favor completa todos los campos' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Por favor ingresa un correo electrónico válido' });
  }
  if (password.length < 6 || password.length > 128) {
    return res.status(400).json({ message: 'La contraseña debe tener entre 6 y 128 caracteres' });
  }

  // Verificar si el usuario ya existe
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  // Crear usuario
  const user = await User.create({
    nombre,
    email,
    password,
  });

  if (user) {
    const token = generateToken(user._id);
    res.status(201).json({
      _id: user._id,
      nombre: user.nombre,
      email: user.email,
      token,
      expiresIn: '30d', // Añadido para informar al frontend
    });
  } else {
    res.status(400).json({ message: 'Datos de usuario inválidos' });
  }
};

// @desc    Autenticar usuario / obtener token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validaciones
  if (!email || !password) {
    return res.status(400).json({ message: 'Por favor completa todos los campos' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Por favor ingresa un correo electrónico válido' });
  }

  // Verificar si el email existe
  const user = await User.findOne({ email }).select('+password');

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    res.json({
      _id: user._id,
      nombre: user.nombre,
      email: user.email,
      token,
      expiresIn: '30d', // Añadido para informar al frontend
    });
  } else {
    res.status(401).json({ message: 'Email o contraseña incorrectos' });
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
    res.status(404).json({ message: 'Usuario no encontrado' });
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
      if (req.body.password.length < 6 || req.body.password.length > 128) {
        return res.status(400).json({ message: 'La contraseña debe tener entre 6 y 128 caracteres' });
      }
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
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
};