import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

// Páginas de autenticación
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Páginas principales
import Header from './pages/Header';
import Menu from './pages/Menu';
import Offers from './pages/Offers';
import CustomPizza from './pages/CustomPizza';
import AllPizzas from './pages/AllPizzas';
import Payment from './pages/Payment';
import Footer from './pages/Footer';
import Contacto from './pages/Contacto';

// Contexto del carrito
import { CartProvider } from './context/CartContext';

// Servicio de autenticación
import authService from './services/authService';

// Componente para manejar la lógica de rutas
const RouteHandler = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  useEffect(() => {
    if (!user && window.location.pathname === '/login') {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  return null;
};

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [user, setUser] = useState(authService.getCurrentUser());

  // Limpieza del almacenamiento local solo si no hay token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Limpiando localStorage y sessionStorage (sin token)');
      localStorage.removeItem('cartItems'); // Solo limpiamos el carrito si no hay sesión
      sessionStorage.clear();
    }
  }, []);

  const openLoginModal = () => {
    console.log('Abriendo modal de login');
    setIsLoginOpen(true);
  };

  const openRegisterModal = () => {
    console.log('Abriendo modal de registro');
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  const closeLoginModal = () => {
    console.log('Cerrando modal de login');
    setIsLoginOpen(false);
  };

  const closeRegisterModal = () => {
    console.log('Cerrando modal de registro');
    setIsRegisterOpen(false);
  };

  const handleLoginSuccess = () => {
    setUser(authService.getCurrentUser());
    closeLoginModal();
  };

  return (
    <CartProvider>
      <Router basename="/">
        <div className="App">
          <Header openLoginModal={openLoginModal} openRegisterModal={openRegisterModal} />
          <Routes>
            {/* Ruta principal */}
            <Route path="/" element={
              <>
                <Offers />
                <CustomPizza />
                <AllPizzas />
                <Menu openLoginModal={openLoginModal} />
              </>
            } />

            {/* Ruta de contacto */}
            <Route path="/contacto" element={
              <div className="contacto-page">
                <Contacto />
              </div>
            } />

            {/* Ruta de pago */}
            <Route path="/payment" element={<Payment />} />

            {/* Redirigir a la página principal si la ruta no existe */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
          <RouteHandler />
        </div>
        {isLoginOpen && !user && <Login onClose={closeLoginModal} openRegisterModal={openRegisterModal} onLoginSuccess={handleLoginSuccess} />}
        {isRegisterOpen && !user && <Register onClose={closeRegisterModal} openLoginModal={openLoginModal} />}
      </Router>
    </CartProvider>
  );
}

export default App;