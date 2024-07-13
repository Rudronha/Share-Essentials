// src/components/ProductList.js
import React, { useContext, useEffect, useState } from 'react';
import axios from '../../axiosConfig';
import './Products.css';

import img1 from '../../image/img1.jpg';
import img2 from '../../image/img2.jpg';
import img3 from '../../image/img3.jpg';
import img4 from '../../image/img4.png';

import productData from './productdata.json';
import { ProductContext } from '../../context/productContext';

const imageMapping = {
  'img1.jpg': img1,
  'img2.jpg': img2,
  'img3.jpg': img3,
  'img4.png': img4,
};

const Products = () => {

  const {allproducts} = useContext(ProductContext);

  //const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       //const response = await axios.get('/api/products/all');
  //       //setProducts(response.data.products);
  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //     }
  //   };

  //   //fetchProducts();
  // }, []);


  return (
    <div className="product-list">
      {allproducts.map((product) => (
        <div key={product.id} className="product-card">
          <img src={`http://localhost:5000${product.profilePicture}`} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          {product.isForSale?<p>$For sale - {product.salePrice}</p>:''}
          {product.isForRent?<p>$For Borrow - {product.rentPrice}</p>:''}
          {product.isForShare?<p>$For Share - {product.sharePrice}</p>:''}
        </div>
      ))}
    </div>
  );
};

export default Products;
