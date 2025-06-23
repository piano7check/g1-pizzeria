const Pizza = require('../models/Pizza');

const getPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las pizzas' });
  }
};

module.exports = { getPizzas };