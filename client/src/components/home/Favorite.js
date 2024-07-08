import React from 'react';
import './Favorite.css';

// Mock favorite items data for demonstration purposes

  

const Favorite = ({ items, removeFromFavorites }) => {

  return (
    <div className="container">
    <div className="favorite-container">
      <h2 className="favorite-title">Favorite Items</h2>
      {items.length === 0 ? (
        <p className="no-favorites">You have no favorite items.</p>
      ) : (
        <ul className="favorite-list">
          {items.map((item, index) => (
            <li key={index} className="favorite-item">
              <img src={item.image} alt={item.name} className="favorite-image" />
              <div className="favorite-details">
                <span className="favorite-name">{item.name}</span>
                <span className="favorite-price">${item.price.toFixed(2)}</span>
              </div>
              <button onClick={() => removeFromFavorites(index)} className="remove-favorite-button">Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};


// const App = () => {
//   const [favorites, setFavorites] = React.useState(mockFavorites);

//   const removeFromFavorites = (index) => {
//     const newFavorites = favorites.filter((_, i) => i !== index);
//     setFavorites(newFavorites);
//   };

//   return <Favorite items={favorites} removeFromFavorites={removeFromFavorites} />;
// };

export default Favorite;
