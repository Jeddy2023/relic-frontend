import React from 'react'
import './customerdashboard.css'
import BidCard from '../../../components/common/BidCard/BidCard'

const products = [
  {
    "id": 2,
    "name": "Ferrari F8 Tributo",
    "condition": "NEW",
    "shortDescription": "Ferrari Supercar",
    "currentBid": 2000,
    "biddingTimeLimit": "2024-06-02 10:30:00",
    "vendorShopName": "speedy_auto_deals",
    "productImageUrl": "http://res.cloudinary.com/do6nmsymn/image/upload/v1715403072/relic/unique_public_id.png",
    "minimumBid": 1500
  },
  {
    "id": 4,
    "name": "Tesla Model S",
    "condition": "USED",
    "shortDescription": "Electric Sedan",
    "currentBid": 2000,
    "biddingTimeLimit": "2024-06-01 08:45:00",
    "vendorShopName": "green_energy_motors",
    "productImageUrl": "http://res.cloudinary.com/do6nmsymn/image/upload/v1715402608/relic/unique_public_id.png",
    "minimumBid": 1200
  },
  {
    "id": 5,
    "name": "BMW X5",
    "condition": "USED",
    "shortDescription": "Luxury SUV",
    "currentBid": 2000,
    "biddingTimeLimit": "2024-05-31 15:20:00",
    "vendorShopName": "prestige_auto_sales",
    "productImageUrl": "http://res.cloudinary.com/do6nmsymn/image/upload/v1715402608/relic/unique_public_id.png",
    "minimumBid": 900
  },
  {
    "id": 6,
    "name": "Porsche 911",
    "condition": "USED",
    "shortDescription": "Iconic Sports Car",
    "currentBid": 2000,
    "biddingTimeLimit": "2024-05-30 12:10:00",
    "vendorShopName": "sports_car_gallery",
    "productImageUrl": "http://res.cloudinary.com/do6nmsymn/image/upload/v1715403072/relic/unique_public_id.png",
    "minimumBid": 1000
  },
  {
    "id": 7,
    "name": "Audi Q7",
    "condition": "USED",
    "shortDescription": "Premium Crossover",
    "currentBid": 2000,
    "biddingTimeLimit": "2024-05-29 09:00:00",
    "vendorShopName": "luxury_auto_empire",
    "productImageUrl": "http://res.cloudinary.com/do6nmsymn/image/upload/v1715402608/relic/unique_public_id.png",
    "minimumBid": 800
  },
  {
    "id": 8,
    "name": "Mercedes-Benz E-Class",
    "condition": "USED",
    "shortDescription": "Executive Sedan",
    "currentBid": 2000,
    "biddingTimeLimit": "2024-05-28 18:30:00",
    "vendorShopName": "elite_auto_deals",
    "productImageUrl": "http://res.cloudinary.com/do6nmsymn/image/upload/v1715403072/relic/unique_public_id.png",
    "minimumBid": 1100
  }
]

function CustomerDashboardWonAuction() {
  return (
    <div className="customer_active-auctions">
      {products.map(product => (
        <BidCard key={product.id} product={product} />
      ))
      }
    </div>
  )
}

export default CustomerDashboardWonAuction