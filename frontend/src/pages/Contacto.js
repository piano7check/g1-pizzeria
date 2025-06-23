import React from 'react';
import '../assets/css/contacto.css';

const Contacto = () => {
  return (
    <div className="contacto-container">
      <div className="contacto-content">
        <h1>Contacto</h1>
        <div className="contacto-info">
          <div className="info-item">
            <h3>Dirección</h3>
            <p>Av. Principal #123</p>
            <p>La Paz, Bolivia</p>
          </div>
          
          <div className="info-item">
            <h3>Teléfono</h3>
            <p>+591 2 1234567</p>
            <p>+591 76543210</p>
          </div>
          
          <div className="info-item">
            <h3>Horario de Atención</h3>
            <p>Lunes a Viernes: 11:00 - 22:00</p>
            <p>Sábados y Domingos: 12:00 - 23:00</p>
          </div>
          
          <div className="info-item">
            <h3>Redes Sociales</h3>
            <p>Facebook: Mamma Mia Pizzeria</p>
            <p>Instagram: @mammamia_pizzeria</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto; 