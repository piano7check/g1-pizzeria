import React from 'react';
import '../assets/css/footer.css';

const Footer = () => {
  const footerLinks = [
    { title: 'Contacto', links: ['Teléfono: 123-456-789', 'Email: info@pizzeria.com', 'Dirección: Calle Falsa 123'] },
    { title: 'Redes Sociales', links: ['Facebook', 'Instagram', 'Twitter'] },
    { title: 'Ayuda', links: ['Preguntas frecuentes', 'Soporte', 'Términos y condiciones'] },
  ];

  return (
    <footer className="footer">
      <div className="footer-content container">
        {footerLinks.map((section, index) => (
          <div key={index} className="link">
            <h3>{section.title}</h3>
            <ul>
              {section.links.map((link, i) => (
                <li key={i}><a href="#">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;