import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../services/authService';
import { CartContext } from '../context/CartContext';
import '../assets/css/header.css';
import right from '../assets/img/right.webp';
import menuIcon from '../assets/img/menu.png';
import cartIcon from '../assets/img/car.svg';
import pepperoni from '../assets/img/pepperoni.webp';
import { Link } from 'react-router-dom';

const Header = ({ openLoginModal, openRegisterModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, removeFromCart, clearCart, getTotal } = useContext(CartContext);
  const [showSpecialOffer, setShowSpecialOffer] = useState(false);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const handlePay = () => {
    if (cartItems.length === 0) {
      alert('El carrito está vacío. Agrega productos antes de pagar.');
      return;
    }
    if (!authService.getCurrentUser()) {
      openLoginModal();
      return;
    }
    navigate(`/payment?total=${getTotal()}`);
    clearCart();
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSpecialOffer = () => {
    setShowSpecialOffer(true);
  };

  const closeSpecialOffer = () => {
    setShowSpecialOffer(false);
  };

  return (
    <header className="header">
      <div className="menu container">
        <a href="/" className="logo">
          <span>Mamma Mia</span>
        </a>
        <input type="checkbox" id="menu" />
        <label htmlFor="menu">
          <img src={menuIcon} className="menu-icono" alt="menup" />
        </label>
        <nav className="navbar">
          <ul>
            <li><a href="/contacto" onClick={(e) => { e.preventDefault(); handleNavigation('/contacto'); }}>Contacto</a></li>
          </ul>
        </nav>
        <div className="auth-actions">
          <ul>
            <li className="submenu">
              <img src={cartIcon} id="img-carrito" alt="carrito" />
              <div id="carrito">
                <table id="lista-carrito">
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(item => (
                      <tr key={item.id}>
                        <td>
                          <img src={item.imagen} alt={item.nombre} width="100" />
                        </td>
                        <td>{item.nombre}</td>
                        <td>{item.precio} Bs</td>
                        <td>
                          <a
                            href="#"
                            className="borrar"
                            onClick={(e) => {
                              e.preventDefault();
                              removeFromCart(item.id);
                            }}
                          >
                            X
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p id="total-carrito">Total: {getTotal()} Bs</p>
                <a
                  href="#"
                  id="vaciar-carrito"
                  className="btn-2"
                  onClick={(e) => {
                    e.preventDefault();
                    clearCart();
                  }}
                >
                  Vaciar carrito
                </a>
                <a
                  href="#"
                  id="pagar-carrito"
                  className="btn-2"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePay();
                  }}
                >
                  Pagar
                </a>
              </div>
            </li>
            <li>
              {authService.getCurrentUser() ? (
                <button onClick={handleLogout} className="btn-2 logout-btn">
                  Cerrar sesión
                </button>
              ) : (
                <button onClick={openLoginModal} className="btn-2 login-btn">
                  Iniciar sesión
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
      {location.pathname !== '/contacto' && (
        <div className="header-content container">
          <div className="header-img">
            <img src={right} alt="oferta" />
          </div>
          <div className="header-txt">
            <h1>Oferta especial</h1>
            <p>Pizza Pepperoni con 80% de descuento</p>
            <a href="#" className="btn-1" onClick={(e) => { e.preventDefault(); handleSpecialOffer(); }}>Ver oferta</a>
          </div>
        </div>
      )}

      {showSpecialOffer && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowSpecialOffer(false)}>×</button>
            <div className="special-offer-content">
              <div className="offer-image">
                <img src={pepperoni} alt="Pizza Pepperoni" />
              </div>
              <div className="offer-details">
                <h4>¡ANIVERSARIO 30 AÑOS!</h4>
                <p className="discount-text">¡80% DE DESCUENTO!</p>
                <p className="anniversary-text">¡CELEBRA CON NOSOTROS 30 AÑOS DE SABOR Y TRADICIÓN!</p>
                <p className="countdown-text">¡SOLO 50 DÍAS PARA DISFRUTAR DE NUESTRAS OFERTAS ESPECIALES!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;