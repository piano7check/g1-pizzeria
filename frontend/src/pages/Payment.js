import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../services/authService';
import '../assets/css/payment.css';
import qrCode from '../assets/img/qr.webp';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const total = new URLSearchParams(location.search).get('total') || 0;

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
    }
  }, [navigate]);

  const closeModal = () => {
    navigate(-1); // Regresa a la página anterior
  };

  return (
    <div className="payment-container modal-backdrop">
      <div className="payment-box modal-content">
        <span className="close-btn" onClick={closeModal}>×</span>
        <h1 className="payment-title">Método de Pago</h1>
        <div className="qr-container">
          <img src={qrCode} alt="Código QR de pago" className="qr-code" />
        </div>
        <p className="payment-text">
          Este es el modo que tienes que pagar: <br />
          Método unido de pago QR
        </p>
        <p className="monto">Total a pagar: <span id="monto-total">{parseFloat(total).toFixed(2)} bs</span></p>
      </div>
    </div>
  );
};

export default Payment;