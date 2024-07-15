import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import './Cart.css';
import { FavoriteContext } from '../../context/favoriteContext';
import { toast } from 'react-toastify';


const CartComponent = ({ items, removeFromCart }) => {
    // Calculate total price
    const {addToFavorite} = useContext(FavoriteContext);

    const totalPrice = items.reduce((acc, item) =>{ 
      if (item.Product.isForSale) {
        acc += item.Product.salePrice * item.quantity;
      }
      if (item.Product.isForRent) {
        acc += item.Product.rentPrice * item.quantity;
      }
      if (item.Product.isForShare) {
        acc += item.Product.sharePrice * item.quantity;
      }
      return acc; 
    },0);

    const handleMovetoFavorite = (item) => {
      addToFavorite(item.Product);
      removeFromCart(item.id);
      toast.success('Moded to favorites successfully!');
    }

    const handelRemove = (item)=>{
      removeFromCart(item.id);
      toast.info('Product removed from Cart.');
    };
  
    return (
      <div className="cart-container">
        <h2 className="cart-title">Shopping Cart</h2>
        <ul className="cart-list">
          {items.map((item, index) => (
            <li key={index} className="cart-item">
              <img src={`http://localhost:5000${item.Product.profilePicture}`} alt={item.Product.name} className="item-image" />
              <div className="item-details">
                <span className="item-name">{item.Product.name}</span>
                {item.Product.isForSale?<span className="item-price">${item.Product.salePrice}</span>:''}
                {item.Product.isForRent?<span className="item-price">${item.Product.rentPrice}</span>:''}
                {item.Product.isForShare?<span className="item-price">${item.Product.sharePrice}</span>:''}
              </div>
              <button className="move-to-fav-button" onClick={() => handleMovetoFavorite(item)}>Move to favorite</button>
              <button onClick={() => handelRemove(item)} className="remove-button">Remove</button>
            </li>
          ))}
        </ul>
        <h3 className="total-price">Total: ${totalPrice}</h3>
        <button className='buy-button'>Buy</button>
      </div>
    );
  };

export default CartComponent;

/**
 * to add the quantity of products 
 * 
 * <div className="item-quantity">
      <button  className="quantity-button">-</button>
      <span className="quantity-text">{item.quantity}</span>
      <button className="quantity-button">+</button>
    </div>
 * 
 * 
 */