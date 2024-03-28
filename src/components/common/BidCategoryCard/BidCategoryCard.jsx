import React from 'react'
import './bidcategorycard.css'
import { PiFlowerLotusThin } from "react-icons/pi";
import { Link } from 'react-router-dom';


function BidCategoryCard() {
  return (
    <div className="bidcategory-card">
        <PiFlowerLotusThin/>
        <Link><h3>Antiques</h3></Link>
    </div>
  )
}

export default BidCategoryCard