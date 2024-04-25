import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import './customerdashboard.css'


function CustomerDashboard() {

    return (
        <>
            <div className="container customer_dashboard">
                <div className="customer_dashboard-sidebar">
                    <Sidebar />
                </div>
                <div className="customer_dashboard-main">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default CustomerDashboard