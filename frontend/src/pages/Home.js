import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">Pizzería Mamma Mia</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="/">Inicio</a>
              </li>
            </ul>
            <div className="d-flex">
              {user && (
                <>
                  <span className="navbar-text me-3 text-white">
                    Bienvenido, {user.nombre}
                  </span>
                  <button 
                    className="btn btn-outline-light" 
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="alert alert-success">
          <h4 className="alert-heading">¡Inicio de sesión exitoso!</h4>
          <p>Has iniciado sesión correctamente en Pizzería Mamma Mia.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
