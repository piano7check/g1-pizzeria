import React, { useState, useContext } from 'react';
import '../assets/css/offers.css';
import pepperoni from '../assets/img/pepperoni.webp';
import mozzarella from '../assets/img/Mozzarella.webp';
import hawaiana from '../assets/img/hawaiana.webp';
import napolitana from '../assets/img/napolitana.webp';
import fugazzeta from '../assets/img/fugazzeta.webp';
import champiñones from '../assets/img/champiñones.webp';
import pestoypollo from '../assets/img/pestoypollo.webp';
import strogonoff from '../assets/img/strogonoff.webp';
import rossini from '../assets/img/rossini.webp';
import { CartContext } from '../context/CartContext';

const Offers = () => {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const { addToCart } = useContext(CartContext);

  const offers = [
    {
      id: 1,
      title: "2X1 EN PIZZAS MEDIANAS",
      image: pepperoni,
      products: [
        { id: 1, name: "Pizza Mediana Pepperoni", image: pepperoni, price: 70 },
        { id: 2, name: "Pizza Mediana Hawaiana", image: hawaiana, price: 70 },
        { id: 3, name: "Pizza Mediana Mozzarella", image: mozzarella, price: 70 },
        { id: 4, name: "Pizza Mediana Napolitana", image: napolitana, price: 70 },
      ]
    },
    {
      id: 2,
      title: "PROMO FINDE SEMANA",
      image: strogonoff,
      products: [
        { id: 5, name: "Pizza Strogonoff", image: strogonoff, price: 96 },
        { id: 6, name: "Pizza Rossini", image: rossini, price: 96 },
        { id: 7, name: "Pizza Pesto y Pollo", image: pestoypollo, price: 96 },
        { id: 8, name: "Pizza Champiñones", image: champiñones, price: 96 },
      ]
    },
    {
      id: 3,
      title: "PIZZA FAMILIAR",
      image: fugazzeta,
      products: [
        { id: 9, name: "Pizza Familiar Fugazzeta", image: fugazzeta, price: 100 },
        { id: 10, name: "Pizza Familiar Hawaiana", image: hawaiana, price: 100 },
        { id: 11, name: "Pizza Familiar Pepperoni", image: pepperoni, price: 100 },
        { id: 12, name: "Pizza Familiar Mozzarella", image: mozzarella, price: 100 },
      ]
    }
  ];

  const openOfferModal = (offer) => {
    setSelectedOffer(offer);
  };

  const closeOfferModal = () => {
    setSelectedOffer(null);
  };

  const handleAddToCart = (product) => {
    const itemToAdd = {
      id: product.id,
      nombre: product.name,
      precio: product.price,
      imagen: product.image,
      quantity: 1,
      title: selectedOffer.title
    };
    console.log('Adding to cart:', itemToAdd); // Para debug
    addToCart(itemToAdd);
    setSelectedOffer(null); // Cierra el modal
  };

  return (
    <div className="offers">
      <h2>OFERTAS ESPECIALES</h2>
      <div className="offers-grid">
        {offers.map(offer => (
          <div key={offer.id} className="offer-card">
            <div className="offer-image">
              <img src={offer.image} alt={offer.title} />
            </div>
            <div className="offer-details">
              <h3>{offer.title}</h3>
              <button className="btn-2" onClick={() => openOfferModal(offer)}>
                VER OFERTA
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedOffer && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal" onClick={closeOfferModal}>×</button>
            <h3>{selectedOffer.title}</h3>
            <div className="products-grid">
              {selectedOffer.products.map(product => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <h4>{product.name}</h4>
                  <p className="price">{product.price} Bs</p>
                  <button 
                    className="btn-2"
                    onClick={() => handleAddToCart(product)}
                  >
                    AGREGAR AL CARRITO
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offers;