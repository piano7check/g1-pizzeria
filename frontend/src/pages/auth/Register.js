import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';
import '../../assets/css/auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirigir si el usuario ya está autenticado
    if (authService.getCurrentUser()) {
      navigate('/');
    }
  }, [navigate]);
  
  const { nombre, email, password, confirmPassword } = formData;
  
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!nombre || !email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    try {
      setLoading(true);
      await authService.register({ nombre, email, password });
      // Limpiar el localStorage para que no se inicie sesión automáticamente
      localStorage.removeItem('user');
      setSuccess('Usuario creado exitosamente. Redirigiendo a inicio de sesión...');
      setFormData({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      // Esperar 2 segundos antes de redirigir
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Error al registrar usuario'
      );
      setLoading(false);
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h2>Mamma mia</h2>
        </div>
        
        {error && (
          <div className="message-container error-message">
            <span className="message-icon">⚠️</span>
            {error}
          </div>
        )}
        {success && (
          <div className="message-container success-message">
            <span className="message-icon">✅</span>
            {success}
          </div>
        )}
        
        <form onSubmit={onSubmit}>
          <div className="input-box">
            <input
              type="text"
              className="input-field"
              placeholder="Nombre"
              name="nombre"
              value={nombre}
              onChange={onChange}
              autoComplete="off"
              required
            />
          </div>
          
          <div className="input-box">
            <input
              type="email"
              className="input-field"
              placeholder="Correo"
              name="email"
              value={email}
              onChange={onChange}
              autoComplete="off"
              required
            />
          </div>
          
          <div className="input-box">
            <input
              type="password"
              className="input-field"
              placeholder="Contraseña"
              name="password"
              value={password}
              onChange={onChange}
              autoComplete="off"
              required
            />
          </div>
          
          <div className="input-box">
            <input
              type="password"
              className="input-field"
              placeholder="Confirmar contraseña"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              autoComplete="off"
              required
            />
          </div>
          
          <div className="input-submit">
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Registrarse'}
            </button>
          </div>
        </form>
        
        <div className="auth-link">
          <p>¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
