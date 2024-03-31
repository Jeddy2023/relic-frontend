import React from 'react'
import { PiSmileyWink } from "react-icons/pi";
import { Link } from 'react-router-dom';


function ReviewCard() {
    return (
        <div className="review-card">
            <PiSmileyWink />
            <Link to={`/category/${name.toLowerCase()}`}><h3>{name}</h3></Link>
        </div>
    )
}

export default ReviewCard