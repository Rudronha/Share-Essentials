import React from 'react';
import './Items.css';


function Sold({items}) {

  return (
      <div className="items-container">
        <h2 className="items-title">Your Sold & Shared</h2>
        {items.length===0 ?(<p className="no-favorites">You have no favorite items.</p>):(
        <ul className="items-list">
          {items.map((item, index) => (
            <div key={index} className="item-div">
              <li className="item">
                <img src={`http://localhost:5000${item.Product.profilePicture}`} alt={item.Product.name} className="item-image" />
                <div className="item-details">
                  <span className="item-name">{item.Product.name}</span>
                  <span className="item-description">{item.Product.description}</span>
                  {item.Product.isForSale && <span className="item-price">For Sale - ${item.Product.salePrice}</span>}
                  {item.Product.isForRent && <span className="item-price">For Borrow - ${item.Product.rentPrice}</span>}
                  {item.Product.isForShare && <span className="item-price">For Share - ${item.Product.sharePrice}</span>}
                </div>
              </li>
            </div>
          ))}
        </ul>)}
      </div>
  );
}

export default Sold;
