import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './sidebar.css';
import { UserContext } from "../../../context/userContext";
import { Modal, Text, Button, Flex, Drawer } from '@mantine/core';

function Sidebar() {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const { userData } = useContext(UserContext);
  const userIsSeller = userData?.role === "SELLER";
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate()

  const handleSetActive = (path) => {
    setActive(path);
  };

  const handleModalClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirmModalFunction = () => {
    navigate('/logout')
  };

  const handleCancelModalFunction = () => {
    setConfirmOpen(false);
  };

  return (
    <>
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
                {/* <Link to="/dashboard/shop">
                <li className={active === '/dashboard/shop' ? 'active' : ''} onClick={() => handleSetActive('/dashboard/shop')}>
                  Shop
                </li>
              </Link> */}
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
                Address
              </li>
            </Link>
            {/* <Link to="/dashboard/active-auction">
            <li className={active === '/dashboard/active-auction' ? 'active' : ''} onClick={() => handleSetActive('/dashboard/active-auction')}>
              Active Auction
            </li>
          </Link>
          <Link to="/dashboard/won-auction">
            <li className={active === '/dashboard/won-auction' ? 'active' : ''} onClick={() => handleSetActive('/dashboard/won-auction')}>
              Won Auction
            </li>
          </Link> */}
            <Link to="/dashboard/auction-activity">
              <li className={active === '/dashboard/auction-activity' ? 'active' : ''} onClick={() => handleSetActive('/dashboard/auction-activity')}>
                Auction Activity
              </li>
            </Link>
            <Link to="/dashboard/notifications">
              <li className={active === '/dashboard/notifications' ? 'active' : ''} onClick={() => handleSetActive('/dashboard/notifications')}>
                Notifications
              </li>
            </Link>
            <li className={active === '/logout' ? 'active' : ''} onClick={handleModalClick}>
              Logout
            </li>
          </ul>
        </menu>

        <Modal
          opened={confirmOpen}
          onClose={handleCancelModalFunction}
          title="Confirm Logout"
          centered
          ff={'"Saira", sans-serif'}
        >
          <Text >Are you sure you want to Logout?</Text>
          <Flex gap={10} justify={'center'} mt={12}>
            <Button color='#32c36c' variant="outline" onClick={handleCancelModalFunction}>Cancel</Button>
            <Button color="red" onClick={handleConfirmModalFunction}>Confirm</Button>
          </Flex>
        </Modal>
      </div>
    </>
  );
}

export default Sidebar;
