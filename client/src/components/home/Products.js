import React, { useContext } from 'react';
import './Products.css';
import fav from '../../image/heart.png';
import favFilled from '../../image/heart_filled.png'; // New filled heart image
import { ProductContext } from '../../context/productContext';
import { FavoriteContext } from '../../context/favoriteContext';
import { Link } from 'react-router-dom';


const Products = () => {
  const { allproducts } = useContext(ProductContext);
  const { addToFavorite, removeFromFavorites, isFavorite ,retFavoriteId } = useContext(FavoriteContext);

  return (
    <div className="product-list">
      {allproducts.map((product) => (
        <div key={product.id} className="product-card">
          <Link to={`/home/item/${product.id}`}>
            <img src={`http://localhost:5000${product.profilePicture}`} alt={product.name}/>
          </Link>
          <h3>
            {product.name}
            <img
              src={isFavorite(product.id) ? favFilled : fav}
              alt="fav"
              className='fav'
              onClick={() =>{ 
                isFavorite(product.id) ? removeFromFavorites(retFavoriteId(product.id)) : addToFavorite(product);
               }}
            />
          </h3>
          <p>{product.description}</p>
          {product.isForSale ? <p>$For sale - {product.salePrice}</p> : ''}
          {product.isForRent ? <p>$For Borrow - {product.rentPrice}</p> : ''}
          {product.isForShare ? <p>$For Share - {product.sharePrice}</p> : ''}
        </div>
      ))}
    </div>
  );
};

export default Products;
