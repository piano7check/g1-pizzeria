import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../assets/css/allPizzas.css';

// Importar todas las imágenes de pizzas
import pepperoni from '../assets/img/pepperoni.webp';
import mozzarella from '../assets/img/Mozzarella.webp';
import hawaiana from '../assets/img/hawaiana.webp';
import napolitana from '../assets/img/napolitana.webp';
import fugazzeta from '../assets/img/fugazzeta.webp';
import champiñones from '../assets/img/champiñones.webp';
import pestoypollo from '../assets/img/pestoypollo.webp';
import strogonoff from '../assets/img/strogonoff.webp';
import rossini from '../assets/img/rossini.webp';

const AllPizzas = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [selectedSize, setSelectedSize] = useState('mediano');
  const { addToCart } = useContext(CartContext);

  const pizzas = [
    { id: 1, nombre: 'Pepperoni', imagen: pepperoni, descripcion: 'Pizza con pepperoni y queso mozzarella' },
    { id: 2, nombre: 'Mozzarella', imagen: mozzarella, descripcion: 'Pizza con queso mozzarella y tomate' },
    { id: 3, nombre: 'Hawaiana', imagen: hawaiana, descripcion: 'Pizza con jamón, piña y queso mozzarella' },
    { id: 4, nombre: 'Napolitana', imagen: napolitana, descripcion: 'Pizza con tomate, albahaca y queso mozzarella' },
    { id: 5, nombre: 'Fugazzeta', imagen: fugazzeta, descripcion: 'Pizza con cebolla y queso mozzarella' },
    { id: 6, nombre: 'Champiñones', imagen: champiñones, descripcion: 'Pizza con champiñones y queso mozzarella' },
    { id: 7, nombre: 'Pesto y Pollo', imagen: pestoypollo, descripcion: 'Pizza con pollo, pesto y queso mozzarella' },
    { id: 8, nombre: 'Strogonoff', imagen: strogonoff, descripcion: 'Pizza con salsa strogonoff y queso mozzarella' },
    { id: 9, nombre: 'Rossini', imagen: rossini, descripcion: 'Pizza con jamón, huevo y queso mozzarella' },
  ];

  const precios = {
    pequeño: 80,
    mediano: 100,
    grande: 120
  };

  const openModal = (pizza) => {
    setSelectedPizza(pizza);
    setSelectedSize('mediano');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPizza(null);
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleAddToCart = () => {
    if (selectedPizza) {
      const pizza = {
        id: `${selectedPizza.id}-${selectedSize}-${Date.now()}`,
        nombre: `${selectedPizza.nombre} (${selectedSize})`,
        imagen: selectedPizza.imagen,
        precio: precios[selectedSize],
        descripcion: selectedPizza.descripcion
      };
      addToCart(pizza);
      closeModal();
    }
  };

  return (
    <section className="all-pizzas" id="pizzas">
      <h2>PRODUCTO - MENÚ</h2>
      <div className="pizzas-grid">
        {pizzas.map(pizza => (
          <div key={pizza.id} className="pizza-card">
            <div className="pizza-image">
              <img src={pizza.imagen} alt={pizza.nombre} />
            </div>
            <div className="pizza-info">
              <h3>{pizza.nombre}</h3>
              <p>{pizza.descripcion}</p>
              <p className="pizza-price">Desde Bs. {precios.mediano}</p>
              <button 
                className="select-pizza-btn"
                onClick={() => openModal(pizza)}
              >
                Seleccionar
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && selectedPizza && (
        <div className="pizza-modal">
          <div className="modal-content">
            <span className="close-modal" onClick={closeModal}>×</span>
            <div className="modal-pizza-image">
              <img src={selectedPizza.imagen} alt={selectedPizza.nombre} />
            </div>
            <div className="modal-pizza-info">
              <h3>{selectedPizza.nombre}</h3>
              <p>{selectedPizza.descripcion}</p>
              <div className="size-selection">
                <h4>Selecciona el tamaño</h4>
                <div className="size-options">
                  <button 
                    className={`size-option ${selectedSize === 'pequeño' ? 'selected' : ''}`}
                    onClick={() => setSelectedSize('pequeño')}
                  >
                    Pequeño - 30 bs
                  </button>
                  <button 
                    className={`size-option ${selectedSize === 'mediano' ? 'selected' : ''}`}
                    onClick={() => setSelectedSize('mediano')}
                  >
                    Mediano - 70 bs
                  </button>
                  <button 
                    className={`size-option ${selectedSize === 'grande' ? 'selected' : ''}`}
                    onClick={() => setSelectedSize('grande')}
                  >
                    Grande - 100 bs
                  </button>
                </div>
              </div>
              <div className="modal-actions">
                <p className="total-price">Total: Bs. {precios[selectedSize]}</p>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AllPizzas; 