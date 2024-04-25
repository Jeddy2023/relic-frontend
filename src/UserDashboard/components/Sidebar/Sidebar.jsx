import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';
import { UserContext } from "../../../context/userContext";


function Sidebar() {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const { userData } = useContext(UserContext);
  const userIsSeller = userData?.role === "SELLER";

  const handleSetActive = (path) => {
    setActive(path);
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
          {!userIsSeller ? (
            <div></div>
          ) : (
            <>
              <Link to="/dashboard/products">
                <li className={active === '/dashboard/products' ? 'active' : ''} onClick={() => handleSetActive('/dashboard/products')}>
                  Products
                </li>
              </Link>
              <Link to="/dashboard/shop">
                <li className={active === '/dashboard/shop' ? 'active' : ''} onClick={() => handleSetActive('/dashboard/shop')}>
                  Shop
                </li>
              </Link>
            </>
          )}
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
          <Link to="/logout">
            <li className={active === '/logout' ? 'active' : ''} onClick={() => handleSetActive('/logout')}>
              Logout
            </li>
          </Link>
        </ul>
      </menu>
    </div>
  );
}

export default Sidebar;