import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './home/common/Navbar';
import Sidebar from './home/common/Sidebar';
import Order from './home/Order';
import Profile from './home/Profile';
import Products from './home/Products';
import Cart from './home/Cart';
import './Home.css';
import Items from './home/item/Items';
import Favorite from './home/Favorite';
import img1 from '../image/img1.jpg';
import img2 from '../image/img2.jpg';
import img3 from '../image/img3.jpg';
import Bell from './home/Bell';

const mockFavorites = [
  {
    image: img1,
    name: 'Item 1',
    price: 29.99
  },
  {
    image: img2,
    name: 'Item 2',
    price: 49.99
  },
  {
    image: img3,
    name: 'Item 3',
    price: 79.99
  }
];

function Home(){
    const [favorites, setFavorites] = useState(mockFavorites);

    const removeFromFavorites = (index) => {
      const newFavorites = favorites.filter((_, i) => i !== index);
      setFavorites(newFavorites);
    };
    return (
        <div className="home-container">
          <Navbar/>
          <Sidebar/>
          <Routes>
            <Route path='' element={<Products/>}/>
            <Route path='profile' element={<Profile/>}/>
            <Route path='order' element={<Order/>}/>
            <Route path='cart' element={<Cart/>}/>
            <Route path='product' element={<Items/>}/>
            <Route path='favorite' element={<Favorite items={favorites} removeFromFavorites={removeFromFavorites} />}/>
            <Route path='noti' element={<Bell/>}/>
          </Routes>
        </div>
    );
}

export default Home;
