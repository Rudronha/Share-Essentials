import React, { useState } from 'react';
import './Items.css';
import Itemform from './Itemform';


function Items() {
  const [items, setItems] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const addItem = (item) => {
    setItems([...items, item]);
  };

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };
    return (
        <div class="container">
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
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">${item.price.toFixed(2)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
        </div>
    );
  }
  
export default Items;

