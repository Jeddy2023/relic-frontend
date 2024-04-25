import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter, Route } from 'react-router-dom';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'
import '@mantine/carousel/styles.css'
import ErrorPage from './components/ui/ErrorPage/ErrorPage';
import AdminHome from './AdminDashboard/pages/AdminHome/AdminHome';
import LayoutAdmin from './AdminDashboard/components/ui/LayoutAdmin';
import Layout from './components/ui/Layout';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import CustomerDashboard from './UserDashboard/pages/CustomerDashboard/CustomerDashboard';
import CustomerDashboardHome from './UserDashboard/pages/CustomerDashboard/CustomerDashboard.Home';
import CustomerDashboardWonAuction from './UserDashboard/pages/CustomerDashboard/CustomerDashboard.WonAuction';
import CustomerDashboardOrders from './UserDashboard/pages/CustomerDashboard/CustomerDashboard.Orders';
import CustomerDashboardActiveAuction from './UserDashboard/pages/CustomerDashboard/CustomerDashboard.ActiveAuction';
import CustomerDashboardAuctionActivity from './UserDashboard/pages/CustomerDashboard/CustomerDashboard.AuctionActivity';
import CustomerDashboardAddresses from './UserDashboard/pages/CustomerDashboard/CustomerDashboard.Addresses';
import CustomerDashboardAccountDetails from './UserDashboard/pages/CustomerDashboard/CustomerDashboard.AccountDetails';
import CustomerDashboardUpdateShippingAddress from './UserDashboard/pages/CustomerDashboard/CustomerDashboard.UpdateShippingAddress';
import VendorDashboardProducts from './UserDashboard/pages/VendorDashboard/VendorDashboard.Products';
import VendorDashboardShop from './UserDashboard/pages/VendorDashboard/VendorDashboard.Shop';
import UserProvider from './context/userContext';
import Logout from './UserDashboard/pages/CustomerDashboard/Logout';
import ProtectedRoute from './utils/ProtectedRoute';
import RoleProtectedRoute from './utils/RoleProtectedRoute';
import Auctions from './pages/Auctions/Auctions';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "auctions", element: <Auctions /> },
      {
        path: '/dashboard',
        element: <ProtectedRoute>
          <CustomerDashboard />
        </ProtectedRoute>,
        children: [
          { index: true, element: <CustomerDashboardHome /> },
          { path: "won-auction", element: <CustomerDashboardWonAuction /> },
          { path: "active-auction", element: <CustomerDashboardActiveAuction /> },
          { path: "addresses", element: <CustomerDashboardAddresses /> },
          { path: "auction-activity", element: <CustomerDashboardAuctionActivity /> },
          { path: "auction-orders", element: <CustomerDashboardOrders /> },
          { path: "account-details", element: <CustomerDashboardAccountDetails /> },
          { path: "update-shipping-address", element: <CustomerDashboardUpdateShippingAddress /> },
          { path: "products", element: <VendorDashboardProducts /> },
          { path: "shop", element: <VendorDashboardShop /> }
        ]
      }
    ],
  },
  { path: "register", element: <SignUp /> },
  { path: "logout", element: <Logout /> },
  {
    path: '/admin',
    element: <ProtectedRoute>
    <RoleProtectedRoute role="ADMIN">
      <LayoutAdmin />
    </RoleProtectedRoute>
  </ProtectedRoute>,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <AdminHome /> }
    ]
  }
])

const theme = createTheme({
  fontFamily: "Saira, sans-serif",
  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </MantineProvider>
  </React.StrictMode>,
)
