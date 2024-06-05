import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import '../../assets/styles/style.css'

function LayoutAdmin() {
    return (
        <div className="dashboard">
            <div className="dashboard-sidebar">
                <Sidebar />
            </div>
            <div className="dashboard-main">
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutAdmin
