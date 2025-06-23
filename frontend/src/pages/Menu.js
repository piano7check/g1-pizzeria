import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import authService from '../services/authService';
import pizzaService from '../services/pizzaService';
import '../assets/css/menu.css';

const Menu = ({ openLoginModal }) => {
  const { addToCart } = useContext(CartContext);
  const [pizzas, setPizzas] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [size, setSize] = useState('pequeño');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('Fetching pizzas...'); // Depuración
        const data = await pizzaService.getPizzas();
        console.log('Pizzas fetched:', data); // Depuración
        setPizzas(data);
        setOffers(data.filter(pizza => pizza.oferta)); // Ajusta según tu esquema
      } catch (error) {
        console.error('Error fetching pizzas:', error); // Depuración
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (item) => {
    const user = authService.getCurrentUser();
    if (!user) {
      openLoginModal();
      return;
    }
    setSelectedPizza(item);
    setModalOpen(true);
  };

  const handleCustomize = () => {
    const user = authService.getCurrentUser();
    if (!user) {
      openLoginModal();
      return;
    }
    alert('Personaliza tu pizza seleccionando ingredientes y tamaño en la próxima pantalla.');
  };

  const handleSizeSelection = () => {
    if (selectedPizza) {
      const sizePrices = {
        pequeño: selectedPizza.precio,
        mediano: selectedPizza.precio + 20,
        grande: selectedPizza.precio + 40,
      };
      const pizzaToAdd = {
        ...selectedPizza,
        precio: sizePrices[size],
        nombre: `${selectedPizza.nombre} (${size.charAt(0).toUpperCase() + size.slice(1)})`,
      };
      addToCart(pizzaToAdd);
      alert(`${pizzaToAdd.nombre} ha sido añadido al carrito por ${pizzaToAdd.precio} bs`);
      setModalOpen(false);
      setSelectedPizza(null);
    }
  };

  if (loading) {
    return <div>Cargando pizzas...</div>;
  }

  return (
    <section className="menu" id="menu">
      <div className="heading">
        <span>Productos - Menú</span>
        <h3>Elige tu favorita</h3>
      </div>
      <div className="menu-container container">
        <div className="product-content">
          {pizzas.length > 0 ? (
            pizzas.map((pizza) => (
              <div className="product" key={pizza._id}>
                <div className="product-card">
                  <img src={`/img/${pizza.imagen}`} alt={pizza.nombre} />
                  <h3>{pizza.nombre}</h3>
                  <p className="precio">Precio: {pizza.precio} bs</p>
                  <button className="btn" onClick={() => handleAddToCart(pizza)}>
                    Seleccionar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No hay pizzas disponibles.</p>
          )}
        </div>
      </div>

      {modalOpen && selectedPizza && (
        <div className="modal" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-modal" onClick={() => setModalOpen(false)}>×</span>
            <h3>Selecciona el tamaño de {selectedPizza.nombre}</h3>
            <img src={`/img/${selectedPizza.imagen}`} alt={selectedPizza.nombre} />
            <select value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="pequeño">Pequeño (+0 bs)</option>
              <option value="mediano">Mediano (+20 bs)</option>
              <option value="grande">Grande (+40 bs)</option>
            </select>
            <button className="btn" onClick={handleSizeSelection}>
              Agregar al carrito
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Menu;