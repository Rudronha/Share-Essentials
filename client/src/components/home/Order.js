import React, { useContext, useState } from 'react';
import './Order.css';
import axios from '../../axiosConfig';
import { RequestContext } from '../../context/requestContext';
import { TransactionContext } from '../../context/transactionContext';

const OrderComponent = ({ orders }) => {
  const handleCreatedAt = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">Your Orders</h2>
      {orders.length === 0 ? (
        <div className='order'>
          <p className="no-orders">You have no orders.</p>
        </div>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order">
            <div className="order-info">
              <div className="order-details">
                <div><strong>Order placed:</strong> {handleCreatedAt(order.createdAt)}</div>
                <div><strong>Order ID:</strong> {order.id}</div>
              </div>
              <div className="order-total">
                <strong>Total:</strong> ${order.Amount}
              </div>
            </div>
            <ul className="order-items">
              <li className="order-item">
                <img src={`http://localhost:5000${order.Product.profilePicture}`} alt={order.Product.name} className="item-image" />
                <div className="item-details">
                  <span className="item-name">{order.Product.name}</span>
                  <span className="item-price">{order.Product.description}</span>
                </div>
              </li>
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

const RequestComponent = ({ requests, removeRequest }) => {
  const [userContact, setUserContact] = useState('');

  const fetchUserContact = async (id) => {
    try {
      if (id) {
        const response = await axios.get(`/users/user/${id}`);
        setUserContact(response.data);
      }
    } catch (error) {
      console.error('Error in fetching user data:', error);
    }
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">Your Requests</h2>
      {requests.length === 0 ? (
        <div className='order'>
          <p className="no-requests">You have no requested items.</p>
        </div>
      ) : (
        requests.map((request, index) => (
          <div key={index} className="order">
            <div className="order-info">
              <div className="order-details">
                <div><strong>Request Status:</strong> {request.status}</div>
                <div><strong>Request ID:</strong> {request.id}</div>
              </div>
              <div className="order-total">
                {request.status === 'accepted' && (
                  <button onClick={() => fetchUserContact(request.receiverId)}>Contact</button>
                )}
                <button onClick={() => removeRequest(request.id)}>Remove</button>
              </div>
            </div>
            <ul className="order-items">
              <li className="order-item">
                <img src={`http://localhost:5000${request.Product.profilePicture}`} alt={request.Product.name} className="item-image" />
                <div className="item-details">
                  <span className="item-name">{request.Product.name}</span>
                  {request.Product.isForSale && <span className="item-price">${request.Product.salePrice}</span>}
                  {request.Product.isForRent && <span className="item-price">${request.Product.rentPrice}</span>}
                  {request.Product.isForShare && <span className="item-price">${request.Product.sharePrice}</span>}
                </div>
                {userContact && request.status === 'accepted' && (
                  <div className="contact-details">
                    <span><strong>Seller:</strong> {userContact.username}</span>
                    <span><strong>Email:</strong> {userContact.email}</span>
                    <span><strong>Address:</strong> {userContact.city}, {userContact.state}, {userContact.country}</span>
                  </div>
                )}
              </li>
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

function Order() {
  const { requests, removeRequest } = useContext(RequestContext);
  const { transactions } = useContext(TransactionContext);

  return (
    <div className="container">
      <RequestComponent requests={requests} removeRequest={removeRequest} />
      <OrderComponent orders={transactions} />
    </div>
  );
}

export default Order;
