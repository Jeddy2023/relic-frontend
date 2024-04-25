import React from 'react'
import './customerdashboard.css'
import BidCard from '../../../components/common/BidCard/BidCard'

function CustomerDashboardWonAuction() {
  return (
    <div className="customer_active-auctions">
      {[...Array(6)].map((_, index) => (
        <BidCard key={index} />
      ))}
    </div>
  )
}

export default CustomerDashboardWonAuction