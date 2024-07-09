import React, { useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import userimg from '../../../image/user.png';
import order from '../../../image/bag.png';
import cart from '../../../image/cart.png';
import product from '../../../image/product.png';
import logo from '../../../image/newlogo.png';
import logout from '../../../image/power.png';
import './Sidebar.css';
import { UserContext } from '../../../context/userContext';
import axios from '../../../axiosConfig';

function Sidebar(){
    const {user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();
    const handleLogout = async() =>{
        try{
            const response = await axios.get('/users/logout');
            clearUser();
            console.log(user);
            navigate('/login');
        }catch(error){
            console.error('Error in logout:',error);
        }
        
    };

    return (
        <div className="sidebar">
            <Link to="/home" className="sidebar-logo">
                <img className="logo-img" src={logo} alt='logo'/>
            </Link>
            <div className="sidebar-container">
                <div className="icon">
                    <Link to="/home/profile"><img src={userimg} alt='user'/></Link>
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
                <div className="icon">
                    <Link onClick={handleLogout}><img src={logout} alt='product'/></Link>
                    <div className="tag">Logout</div>
                </div>
            </div>
        </div>
    );
}
export default Sidebar;
