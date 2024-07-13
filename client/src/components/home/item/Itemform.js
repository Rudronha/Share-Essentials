import React, { useContext, useState } from 'react';
import './Items.css';
import { UserContext } from '../../../context/userContext';

const Itemform = ({ addItem, toggleForm }) => {
  const {user} = useContext(UserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [price, setPrice] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setPrice(''); // Clear price when changing the option
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !image || !selectedOption || !price) {
      alert('Please fill all fields');
      return;
    }

    

    //console.log(formData);

    const reader = new FileReader();
    reader.onloadend = async() => {
    
      const newItem = {
        name,
        description,
        profilePicture: image,
        isForSale: selectedOption === 'isForSale',
        salePrice: selectedOption === 'isForSale' ? parseFloat(price) : null,
        isForRent: selectedOption === 'isForRent',
        rentPrice: selectedOption === 'isForRent' ? parseFloat(price) : null,
        isForShare: selectedOption === 'isForShare',
        sharePrice: selectedOption === 'isForShare' ? parseFloat(price) : null,
        UserId: user.userId
      };
      //console.log(newItem);
      await addItem(newItem);
       setName('');
       setDescription('');
       setImage(null);
       setSelectedOption('');
       setPrice('');
       toggleForm();
    };
    reader.readAsDataURL(image);
  };
  
  return (
    <div className="item-form-container">
      <h2 className="item-form-title">Add an Item</h2>
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
          <label className="form-label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
        <div className="form-group">
          <label className="form-label">Type</label>
          <select
            id="options"
            value={selectedOption}
            onChange={handleOptionChange}
            className="form-input"
            required
          >
            <option value="">Select an option</option>
            <option value="isForSale">For Sale</option>
            <option value="isForRent">For Rent</option>
            <option value="isForShare">For Share</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Price ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-input"
            required
            disabled={!selectedOption} // Disable price input if no option is selected
          />
        </div>
        <button type="submit" className="submit-button">Add Item</button>
      </form>
    </div>
  );
};

export default Itemform;
