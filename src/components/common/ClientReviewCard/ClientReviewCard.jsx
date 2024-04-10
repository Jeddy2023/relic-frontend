import React from 'react'
import './clientreview.css'
import { LuQuote } from "react-icons/lu";
import img from '../../../assets/images/hero-banner-1.jpg'

function ClientReviewCard() {
    return (
        <div className="clientreview-card">
            <div className="quote-icon"><LuQuote /></div>
            <div className="testi-img">
                <img src={img} alt="" />
            </div>
            <div className="testi-content">
                <p className="para">Nullam cursus tempor ex. Nullam nec dui id metus consequat congue ac at est. Pellentesque blandit neque at elit tristique tincidunt.</p>
                <div className="testi-designation">
                    <h5><a>Jamie anderson</a></h5>
                    <p>Manager</p>
                </div>
            </div>
        </div>
    )
}

export default ClientReviewCard