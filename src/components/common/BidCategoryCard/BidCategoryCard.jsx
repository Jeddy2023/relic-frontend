import React from 'react'
import './bidcategorycard.css'
import { Link } from 'react-router-dom';

function BidCategoryCard({ icon, name }) {
  return (
    <div className="bidcategory-card">
      {icon}
      <Link to={`/category/${name.toLowerCase()}`}><h3>{name}</h3></Link>
    </div>
  )
}

export default BidCategoryCard
