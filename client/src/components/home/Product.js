import React, { useContext } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import './Product.css';
import { ProductContext } from '../../context/productContext';
import { CartContext } from '../../context/cartContext';
import { toast } from 'react-toastify';

const Product = () => {
    const navigate = useNavigate();
    const { allproducts } = useContext(ProductContext);
    const { id } = useParams();
    const product = allproducts.find(p => p.id === parseInt(id));
    const { addToCart } = useContext(CartContext);
    
    if (!product) {
        return <div className="container"><p>No product details available.</p></div>;
    }

    const handelAddtocart = (product)=>{
        addToCart(product);
        toast.success('Add to Cart successfully!');
    }

  return (
    <div className="container">
      <div className="product-detail-container">
        <div className="product-image-section">
          <img src={`http://localhost:5000${product.profilePicture}`} alt={product.name} className="product-main-image" />
        </div>
        <div className="product-info-section">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          
          {product.isForSale && <p className="product-price">Price: ${product.salePrice}</p>}
          {product.isForRent && <p className="product-price">Rent: ${product.rentPrice}</p>}
          {product.isForShare && <p className="product-price">Share: ${product.sharePrice}</p>}
          <button className="add-to-cart-button" onClick={()=> handelAddtocart(product)}>Add to Cart</button>
          <button className="back-button" onClick={()=>navigate('/home')}>Back</button>
          <ul className="product-features">
            {product.features && product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Product;
