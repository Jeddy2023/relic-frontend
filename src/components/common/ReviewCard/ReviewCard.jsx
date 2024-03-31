import React from 'react'
import { PiSmileyWink } from "react-icons/pi";
import { Link } from 'react-router-dom';
import './reviewcard.css'

function ReviewCard() {
    return (
        <div className="review-card">
            <PiSmileyWink />
            <div className="review-card_right">
                <h1>1,250+</h1>
                <p>Good Reviews</p>
            </div>
        </div>
    )
}

export default ReviewCard