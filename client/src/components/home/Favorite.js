import React, { useContext } from 'react';
import './Favorite.css';
import { FavoriteContext } from '../../context/favoriteContext';
import { CartContext } from '../../context/cartContext';
import { toast } from 'react-toastify';
// Mock favorite items data for demonstration purposes

  

const Favorite = () => {
  const { favorites, removeFromFavorites } = useContext(FavoriteContext);
  const {addToCart} = useContext(CartContext);
  //console.log(favorites.Product);

  const handleMovetoCart = (product)=>{
    addToCart(product.Product);
    removeFromFavorites(product.id);
    toast.success('Moded to Cart successfully!');
  };

  const handelRemove = (id)=>{
    removeFromFavorites(id);
    toast.info('Product removed from Favorite.');
  };

  return (
    <div className="container">
    <div className="favorite-container">
      <h2 className="favorite-title">Favorite Items</h2>
      {favorites.length === 0 ? (
        <p className="no-favorites">You have no favorite items.</p>
      ) : (
        <ul className="favorite-list">
          {favorites.map((product, index) => (
            <li key={index} className="favorite-item">
              <img src={`http://localhost:5000${product.Product.profilePicture}`} alt={product.Product.name} className="favorite-image" />
              <div className="favorite-details">
                <span className="favorite-name">{product.Product.name}</span>
                {product.Product.isForSale?<span className="favorite-price">${product.Product.salePrice}</span>:''}
                {product.Product.isForRent?<span className="favorite-price">${product.Product.rentPrice}</span>:''}
                {product.Product.isForShare?<span className="favorite-price">${product.Product.sharePrice}</span>:''}
              </div>
              <button className="move-to-bag-button" onClick={()=>handleMovetoCart(product)}>Move to Cart</button>
              <button onClick={() => handelRemove(product.id)} className="remove-favorite-button">Remove</button>
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
