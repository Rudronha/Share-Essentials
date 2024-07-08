import React from 'react';
import { useEffect, useState } from 'react';
import './Cart.css';

const CartComponent = ({ items, removeFromCart, increaseQuantity, decreaseQuantity }) => {
    // Calculate total price
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
    return (
      <div className="cart-container">
        <h2 className="cart-title">Shopping Cart</h2>
        <ul className="cart-list">
          {items.map((item, index) => (
            <li key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-price">${item.price.toFixed(2)}</span>
              </div>
              <div className="item-quantity">
                <button onClick={() => decreaseQuantity(index)} className="quantity-button">-</button>
                <span className="quantity-text">{item.quantity}</span>
                <button onClick={() => increaseQuantity(index)} className="quantity-button">+</button>
              </div>
              <button onClick={() => removeFromCart(index)} className="remove-button">Remove</button>
            </li>
          ))}
        </ul>
        <h3 className="total-price">Total: ${totalPrice.toFixed(2)}</h3>
      </div>
    );
  };

export default CartComponent;