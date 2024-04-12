import React from 'react'
import './customerdashboard.css'
import { Checkbox, Button, Group, Modal, PinInput } from "@mantine/core";


function CustomerDashboardHome() {
  return (
    <div className="customer_home">
      <h1>Hello <span>jeddy</span></h1>
      <p>From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
      <div className="become_vendor">
        <div className="left-become_vendor">
          <h4>Become a Vendor</h4>
          <p>Vendors can sell products and manage a store with a vendor dashboard.</p>
        </div>
        <button>Become a Vendor</button>
      </div>
    </div>
  )
}

export default CustomerDashboardHome