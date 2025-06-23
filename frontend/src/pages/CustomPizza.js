import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { CartContext } from '../context/CartContext';
import '../assets/css/customPizza.css';
import pizzaPersonalizada from '../assets/img/pizza-personalizada.webp';

const CustomPizza = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('mediano');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [totalPrice, setTotalPrice] = useState(30);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
    }
  }, [navigate]);

  const sizes = [
    { id: 'pequeño', label: 'Pequeño - 30 bs' },
    { id: 'mediano', label: 'Mediano - 70 bs' },
    { id: 'grande', label: 'Grande - 100 bs' }
  ];

  const availableIngredients = [
    { id: 'pepperoni', name: 'Pepperoni', price: 5 },
    { id: 'jamon', name: 'Jamón', price: 5 },
    { id: 'pollo', name: 'Pollo', price: 5 },
    { id: 'champinones', name: 'Champiñones', price: 5 },
    { id: 'cebolla', name: 'Cebolla', price: 5 },
    { id: 'pimiento', name: 'Pimiento', price: 5 },
    { id: 'aceitunas', name: 'Aceitunas', price: 5 },
    { id: 'tomate', name: 'Tomate', price: 5 },
    { id: 'maiz', name: 'Maíz', price: 5 },
    { id: 'piña', name: 'Piña', price: 5 },
    { id: 'tocino', name: 'Tocino', price: 5 },
    { id: 'queso_extra', name: 'Queso Extra', price: 5 }
  ];

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSize('mediano');
    setSelectedIngredients([]);
    setTotalPrice(30);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    updateTotalPrice(size, selectedIngredients);
  };

  const handleIngredientChange = (ingredientId) => {
    const newIngredients = selectedIngredients.includes(ingredientId)
      ? selectedIngredients.filter(id => id !== ingredientId)
      : [...selectedIngredients, ingredientId];
    setSelectedIngredients(newIngredients);
    updateTotalPrice(selectedSize, newIngredients);
  };

  const updateTotalPrice = (size, ingredients) => {
    const sizePrice = sizes.find(s => s.id === size)?.price || 30;
    const ingredientsPrice = ingredients.reduce((total, ing) => {
      const ingredient = availableIngredients.find(i => i.id === ing);
      return total + (ingredient?.price || 0);
    }, 0);
    setTotalPrice(sizePrice + ingredientsPrice);
  };

  const handleAddToCart = () => {
    const selectedIngredientsList = selectedIngredients.map(id => 
      availableIngredients.find(ing => ing.id === id)
    );
    
    const pizza = {
      id: `custom-${Date.now()}`,
      nombre: `Pizza Personalizada (${selectedSize})`,
      imagen: pizzaPersonalizada,
      precio: totalPrice,
      descripcion: `Pizza ${selectedSize} con: ${selectedIngredientsList.map(ing => ing.name).join(', ')}`
    };
    
    addToCart(pizza);
    closeModal();
  };

  return (
    <section className="custom-pizza">
      <h2>PERSONALIZACIÓN DE PIZZA</h2>
      <div className="custom-content">
        <div className="custom-item">
          <div className="custom-image">
            <img src={pizzaPersonalizada} alt="Pizza Personalizada" />
          </div>
          <div className="custom-details">
            <h3>CREA TU PROPIA PIZZA</h3>
            <p>Selecciona el tamaño y los ingredientes que más te gusten para crear tu pizza perfecta.</p>
            <button className="btn-2" onClick={openModal}>
              Personalizar Ahora
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>×</button>
            <div className="size-selection">
              <h4>Selecciona el tamaño</h4>
              <div className="size-options">
                {sizes.map((size) => (
                  <button
                    key={size.id}
                    className={`size-option ${selectedSize === size.id ? 'selected' : ''}`}
                    onClick={() => handleSizeChange(size.id)}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="ingredients-selection">
              <h4>Selecciona los ingredientes</h4>
              <div className="ingredients-options">
                {availableIngredients.map((ingredient) => (
                  <button
                    key={ingredient.id}
                    className={`ingredient-option ${selectedIngredients.includes(ingredient.id) ? 'selected' : ''}`}
                    onClick={() => handleIngredientChange(ingredient.id)}
                  >
                    {ingredient.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="total-section">
              <span>Total: {totalPrice} bs</span>
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CustomPizza;