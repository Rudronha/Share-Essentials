import React from 'react';
import { useEffect, useState } from 'react';
import './Cart.css';
import CartComponent from './CartComponent';
import img1 from '../../image/img1.jpg';
import img2 from '../../image/img2.jpg';
import img3 from '../../image/img3.jpg';
import img4 from '../../image/img4.png';

function Cart() {
    const [items, setItems] = useState([
        { name: 'Item 1', price: 10.0, quantity: 1, image: img1 },
        { name: 'Item 2', price: 15.0, quantity: 2, image: img2 },
        { name: 'Item 3', price: 20.0, quantity: 1, image: img3 },
      ]);
    
      const removeFromCart = (index) => {
        setItems(items.filter((_, i) => i !== index));
      };
    
      const increaseQuantity = (index) => {
        const newItems = [...items];
        newItems[index].quantity += 1;
        setItems(newItems);
      };
    
      const decreaseQuantity = (index) => {
        const newItems = [...items];
        if (newItems[index].quantity > 1) {
          newItems[index].quantity -= 1;
          setItems(newItems);
        }
      };
    
    return (
        <div class="container">
            <CartComponent
            items={items}
            removeFromCart={removeFromCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            />
        </div>
    );
  }
  
export default Cart;

