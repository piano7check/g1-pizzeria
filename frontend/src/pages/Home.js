import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import '../assets/css/auth.css';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <nav className="custom-nav">
        <div className="nav-content">
          <a href="/" className="nav-brand">Pizzería Mamma Mia</a>
          <div className="nav-items">
            <a href="/" className="nav-link">Inicio</a>
            {user && (
              <>
                <span className="nav-text">Bienvenido, {user.nombre}</span>
                <button className="submit-btn nav-btn" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="auth-box">
        <div className="auth-header">
          <h2>¡Bienvenido, {user?.nombre}!</h2>
        </div>
        <div className="welcome-message">
          <p>Estás en la página principal de Pizzería Mamma Mia.</p>
          <p>Puedes comenzar a explorar nuestras deliciosas pizzas.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;