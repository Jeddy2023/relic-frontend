import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/dashboard',
        element: <CustomerDashboard/>,
        children: [
          { index: true, element: <CustomerDashboardHome/>},
          { path: "won-auction", element: <CustomerDashboardWonAuction />},
          { path: "active-auction", element: <CustomerDashboardActiveAuction />},
          { path: "addresses", element: <CustomerDashboardAddresses />},
          { path: "auction-activity", element: <CustomerDashboardAuctionActivity />},
          { path: "auction-orders", element: <CustomerDashboardOrders/>},
          { path: "won-auction", element: <CustomerDashboardWonAuction />}
        ]
      }
    ],
  },
  { path: "register", element: <SignUp /> },
  {
    path: '/admin',
    element: <LayoutAdmin />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <AdminHome /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
      <RouterProvider router={router}/>
    </MantineProvider>
  </React.StrictMode>,
)
