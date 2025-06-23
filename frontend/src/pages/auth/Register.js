import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';
import '../../assets/css/auth.css';

const Register = ({ onClose, openLoginModal }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { nombre, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!nombre || !email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      setLoading(true);
      await authService.register({ nombre, email, password });
      setSuccess(`Registro exitoso. Redirigiendo al login...`);
      setTimeout(() => {
        setLoading(false);
        if (onClose) onClose();
        openLoginModal(); // Abre el modal de login después de registrarse
        navigate('/'); // Redirección controlada
      }, 500);
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Error al registrar el usuario'
      );
      setLoading(false);
    }
  };

  const closeModal = () => {
    if (onClose) onClose();
  };

  return (
    <div className="auth-container modal-backdrop">
      <div className="auth-box modal-content">
        <span className="close-btn" onClick={closeModal}>×</span>
        <div className="auth-header">
          <h2>Regístrate en Mamma Mia</h2>
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

          <div className="input-submit">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Cargando...' : 'Registrarse'}
            </button>
          </div>
        </form>

        <div className="auth-link">
          <p>
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="auth-link-text" onClick={() => { closeModal(); openLoginModal(); }}>
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;