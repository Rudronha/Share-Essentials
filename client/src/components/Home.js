import React, { useState,useContext,useEffect } from 'react';
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
import Bell from './home/Bell';

function Home(){

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
            <Route path='favorite' element={<Favorite/>}/>
            <Route path='noti' element={<Bell/>}/>
          </Routes>
        </div>
    );
}

export default Home;
