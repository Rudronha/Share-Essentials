import React from 'react';
import './Order.css';
import img1 from '../../image/img1.jpg';
import img2 from '../../image/img2.jpg';
import img3 from '../../image/img3.jpg';
import img4 from '../../image/img4.png';

const OrderComponent = ({ orders }) => {
    return (
      <div className="orders-container">
        <h2 className="orders-title">Your Orders</h2>
        {orders.map((order, index) => (
          <div key={index} className="order">
            <div className="order-info">
              <div className="order-details">
                <div><strong>Order placed:</strong> {order.date}</div>
                <div><strong>Order ID:</strong> {order.id}</div>
              </div>
              <div className="order-total">
                <strong>Total:</strong> ${order.total.toFixed(2)}
              </div>
            </div>
            <ul className="order-items">
              {order.items.map((item, index) => (
                <li key={index} className="order-item">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">${item.price.toFixed(2)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

function Order() {
    const orders = [
        {
          date: 'July 5, 2024',
          id: '123-4567890-1234567',
          total: 45.0,
          items: [
            { name: 'Item 1', price: 10.0, image: img1 },
            { name: 'Item 2', price: 15.0, image: img2 },
            { name: 'Item 3', price: 20.0, image: img3 },
          ],
        },
        {
          date: 'July 3, 2024',
          id: '123-4567890-7654321',
          total: 30.0,
          items: [
            { name: 'Item 4', price: 15.0, image: img4 },
            { name: 'Item 5', price: 15.0, image: img2 },
          ],
        },
      ];
    return (
        <div class="container">
            <OrderComponent orders={orders} />;
        </div>
    );
  }
  
export default Order;

