import React, { useState } from 'react';
import './Items.css';

const Itemform = ({ addItem, toggleForm }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !image) {
      alert('Please fill all fields');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newItem = { name, price: parseFloat(price), image: reader.result };
      addItem(newItem);
      setName('');
      setPrice('');
      setImage(null);
      toggleForm();
    };
    reader.readAsDataURL(image);
  };

  return (
    <div className="item-form-container">
      <h2 className="item-form-title">Add an Item to Sell</h2>
      <form onSubmit={handleSubmit} className="item-form">
        <div className="form-group">
          <label className="form-label">Item Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Price ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Item</button>
      </form>
    </div>
  );
};

export default Itemform;