// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig';
import './Products.css';

import img1 from '../../image/img1.jpg';
import img2 from '../../image/img2.jpg';
import img3 from '../../image/img3.jpg';
import img4 from '../../image/img4.png';

import productData from './productdata.json';

const imageMapping = {
  'img1.jpg': img1,
  'img2.jpg': img2,
  'img3.jpg': img3,
  'img4.png': img4,
};

const Products = () => {
  //const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        //const response = await axios.get('/api/products/all');
        //setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    //fetchProducts();
  }, []);


  return (
    <div className="product-list">
      {productData.products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={imageMapping[product.imageUrl]} alt={product.title} />
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
