const Cart = require('../models/Cart');

// Obtener carrito del usuario
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.json({ items: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el carrito', error: error.message });
  }
};

// Agregar ítem al carrito
const addToCart = async (req, res) => {
  try {
    const { item } = req.body;
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }
    cart.items.push(item);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar al carrito', error: error.message });
  }
};

// Eliminar ítem del carrito
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    cart.items = cart.items.filter(item => item.id !== id);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar del carrito', error: error.message });
  }
};

// Vaciar carrito
const clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.json({ items: [] });
    }
    cart.items = [];
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al vaciar el carrito', error: error.message });
  }
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };