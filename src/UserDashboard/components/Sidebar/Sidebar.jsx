import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';

function Sidebar() {
  const location = useLocation(); // Get the current location using useLocation hook
  const [active, setActive] = useState(location.pathname); // Set initial active link based on current path

  // Function to handle click event on link
  const handleSetActive = (path) => {
    setActive(path); // Update active state when a link is clicked
  };

  return (
    <div className="dashboard_sidebar">
      <menu>
        <ul>
          <Link to="/dashboard">
            <li className={active === '/dashboard' ? 'active' : ''} onClick={() => handleSetActive('/dashboard')}>
              Dashboard
            </li>
          </Link>
          <Link to="/dashboard/auction-orders">
            <li className={active === '/dashboard/auction-orders' ? 'active' : ''} onClick={() => handleSetActive('/dashboard/auction-orders')}>
              Orders
            </li>
          </Link>
          <Link to="/dashboard/account-details">
            <li className={active === '/dashboard/account-details' ? 'active' : ''} onClick={() => handleSetActive('/dashboard/account-details')}>
              Account Details
            </li>
          </Link>
          <Link to="/dashboard/addresses">
            <li className={active === '/dashboard/addresses' ? 'active' : ''} onClick={() => handleSetActive('/dashboard/addresses')}>
              Addresses
            </li>
          </Link>
          <Link to="/dashboard/active-auction">
            <li className={active === '/dashboard/active-auction' ? 'active' : ''} onClick={() => handleSetActive('/dashboard/active-auction')}>
              Active Auction
            </li>
          </Link>
          <Link to="/dashboard/won-auction">
            <li className={active === '/dashboard/won-auction' ? 'active' : ''} onClick={() => handleSetActive('/dashboard/won-auction')}>
              Won Auction
            </li>
          </Link>
          <Link to="/dashboard/auction-activity">
            <li className={active === '/dashboard/auction-activity' ? 'active' : ''} onClick={() => handleSetActive('/dashboard/auction-activity')}>
              Auction Activity
            </li>
          </Link>
          {/* Logout link */}
          <li>Log out</li>
        </ul>
      </menu>
    </div>
  );
}

export default Sidebar;