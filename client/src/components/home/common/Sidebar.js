import React from 'react';
import { Link } from 'react-router-dom';
import user from '../../../image/user.png';
import order from '../../../image/bag.png';
import cart from '../../../image/cart.png';
import product from '../../../image/product.png';
import logo from '../../../image/newlogo.png';
import './Sidebar.css';

function Sidebar(){
    return (
        <div className="sidebar">
            <Link to="/home" className="sidebar-logo">
                <img className="logo-img" src={logo} alt='logo'/>
            </Link>
            <div className="sidebar-container">
                <div className="icon">
                    <Link to="/home/profile"><img src={user} alt='user'/></Link>
                    <div className="tag">Profile</div>
                </div>
                <div className="icon">
                    <Link to="/home/order"><img src={order} alt='order'/></Link>
                    <div className="tag">Orders</div>
                </div>
                <div className="icon">
                    <Link to="/home/cart"><img src={cart} alt='cart'/></Link>
                    <div className="tag">Cart</div>
                </div>
                <div className="icon">
                    <Link to="/home/product"><img src={product} alt='product'/></Link>
                    <div className="tag">Products</div>
                </div>
            </div>
        </div>
    );
}
export default Sidebar;
