import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import bell from '../../../image/bell.png';
import fav from '../../../image/favorite_16.png';
import Bell from '../Bell'; // Import the Bell component

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-search">
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
        <div className="navbar-icons">
          <div className="navbar-icon">
            <button onClick={handleBellClick} className="bell-button">
              <img src={bell} alt='notification' />
            </button>
            {showNotifications && <Bell />} {/* Show Bell component when showNotifications is true */}
          </div>
          <div className="navbar-icon">
            <i className="fas fa-user">
              <Link to="/home/favorite">
                <img src={fav} alt='favorite' />
              </Link>
            </i>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
