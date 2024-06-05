import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import './customerdashboard.css'
import BreadCrumb from '../../../components/common/BreadCrumb/BreadCrumb';


function CustomerDashboard() {

    return (
        <>
            <div className='dashboard_withcrumb'>
                <BreadCrumb name={'Dashboard'} />
                <div className="container customer_dashboard">
                    <div className="customer_dashboard-sidebar">
                        <Sidebar />
                    </div>
                    <div className="customer_dashboard-main">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerDashboard