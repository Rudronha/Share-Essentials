import React, { useContext, useState } from 'react';
import './Items.css';
import Itemform from './Itemform';
import axios from '../../../axiosConfig';
import { ItemContext } from '../../../context/itemContext';


function Items() {
  const { items, updateItems } = useContext(ItemContext);
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  const addItem = (formData) => {
      updateItems(formData);
  };

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };
    return (
        <div className="container">
            <div className="add-item-button-container">
              <button onClick={toggleForm} className="add-item-button">
                {isFormVisible ? 'Cancel' : 'Add Item'}
              </button>
            </div>
            {isFormVisible && <Itemform addItem={addItem} toggleForm={toggleForm} />}
            <div className="items-container">
              <h2 className="items-title">Your Items</h2>
              <ul className="items-list">
                {items.map((item, index) => (
                  <li key={index} className="item">
                    <img src={`http://localhost:5000${item.profilePicture}`} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <span className="item-name">{item.name}</span>
                      <span className="item-description">{item.description}</span>
                      {item.isForSale?(<span className="item-price">For Sale - ${item.salePrice}</span>):''}
                      {item.isForRent?<span className="item-price">For Borrow - ${item.rentPrice}</span>:''}
                      {item.isForShare?<span className="item-price">For Share - ${item.sharePrice}</span>:''}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
        </div>
    );
  }
  
export default Items;

