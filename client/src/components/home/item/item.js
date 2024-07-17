import React, { useContext, useState } from 'react';
import './Items.css';
import { RequestContext } from '../../../context/requestContext';
import { TransactionContext } from '../../../context/transactionContext';

function Item({ items }) {
  const [visibleRequests, setVisibleRequests] = useState({});
  const { requestsOnUserItems, respondToRequest } = useContext(RequestContext);
  const { makeTransaction } = useContext(TransactionContext);

  const toggleRequest = (productId) => {
    setVisibleRequests((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };

  const numRequest = (id) => {
    return requestsOnUserItems.filter(request => request.status === 'pending' && request.ProductId === id).length;
  };

  const handleAccept = (req) => {
    let type;
    let amount;
    if (req.Product.isForSale) {
      type = "Purchase";
      amount = req.Product.salePrice;
    }
    if (req.Product.isForRent) {
      type = "Rent";
      amount = req.Product.rentPrice;
    }
    if (req.Product.isForShare) {
      type = "Share";
      amount = 0.00;
    }
    const data = {
      OwnerId: req.receiverId,
      UserId: req.senderId,
      ProductId: req.ProductId,
      Type: type,
      Amount: amount,
    };
    console.log(data);
    respondToRequest(req.id, 'accepted');
    makeTransaction(data);
  };

  const handleReject = (req) => {
    respondToRequest(req.id, 'rejected');
  };

  return (
    <div className="items-container">
      <h2 className="items-title">Your Items</h2>
      <ul className="items-list">
        {items.map((item, index) => (
          <div key={index} className="item-div">
            <li className="item">
              <img src={`http://localhost:5000${item.profilePicture}`} alt={item.name} className="item-image" />
              <div className="item-details">
                <span className="item-name">{item.name}{item.id}</span>
                <span className="item-description">{item.description}</span>
                {item.isForSale && <span className="item-price">For Sale - ${item.salePrice}</span>}
                {item.isForRent && <span className="item-price">For Borrow - ${item.rentPrice}</span>}
                {item.isForShare && <span className="item-price">For Share - ${item.sharePrice}</span>}
              </div>
              {numRequest(item.id) > 0 && (
                <div className="request-notifications">
                  <span className='number-of-request'>Number of requests : {numRequest(item.id)}</span>
                  <button className='show-request' onClick={() => toggleRequest(item.id)}>Requests</button>
                </div>
              )}
            </li>
            {visibleRequests[item.id] && (
              <div className='request-list-container'>
                {requestsOnUserItems.filter(request => request.ProductId === item.id).map((req) => (
                  <li key={req.id} className='request-list'>
                    <span>Request ID: {req.id} | Sender ID: {req.senderId}</span>
                    <button className='accept' onClick={() => handleAccept(req)}>Accept</button>
                    <button className='reject' onClick={() => handleReject(req)}>Reject</button>
                  </li>
                ))}
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Item;
