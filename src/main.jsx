import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'
import '@mantine/carousel/styles.css'
import ErrorPage from './components/ui/ErrorPage/ErrorPage';
import AdminHome from './AdminDashboard/pages/AdminHome/AdminHome';
import LayoutAdmin from './AdminDashboard/components/ui/LayoutAdmin';
import Layout from './components/ui/Layout';
import Home from './pages/Home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> }
    ]
  },
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
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>,
)
