import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';
import '../../assets/css/auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (authService.getCurrentUser()) {
      navigate('/');
    }
  }, [navigate]);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      setLoading(true);
      const response = await authService.login({ email, password });
      setSuccess(`Inicio de sesión exitoso. Redirigiendo...`);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Email o contraseña incorrectos'
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
              {loading ? 'Cargando...' : 'Iniciar sesión'}
            </button>
          </div>
        </form>

        <div className="auth-link">
          <p>
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="auth-link-text">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;