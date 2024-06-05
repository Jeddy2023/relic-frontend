import React, { useState, useEffect } from 'react';
import "./bidcard.css"
import { Button, Skeleton } from '@mantine/core';
import { Link } from 'react-router-dom'

function BidCard({ product }) {
    const [productName, setProductName] = useState(product?.name);
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const shortName = productName.length > 20 ? productName.substr(0, 18) + '...' : productName;

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    function calculateTimeLeft() {
        const auctionEndDateString = product?.biddingTimeLimit || undefined;
        if (!auctionEndDateString) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

        const auctionEndDate = new Date(auctionEndDateString);
        const now = new Date();

        let difference = auctionEndDate - now;
        if (difference < 0) difference = 0;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    }

    function formatBidAmount(amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return (
        <div className="bidcard">
            <Skeleton visible={!product}>
                <div className="content">
                    <div className="top">
                        <div className="main-auction_timer">
                            <span>{timeLeft.days} <p>Days</p></span>
                            <span>{timeLeft.hours} <p>Hours</p></span>
                            <span>{timeLeft.minutes} <p>Minutes</p></span>
                            <span>{timeLeft.seconds} <p>Seconds</p></span>
                        </div>
                        <div className="main-auction_img">
                            <img src={product.productImageUrl} alt="Auction Item" />
                        </div>
                    </div>
                    <div className="bottom">
                        <Link to={`/auctions/${product.id}`}><h2 dangerouslySetInnerHTML={{ __html: shortName }} className="name"></h2></Link>
                        <h4>Current Bid: <span>₦{formatBidAmount(product?.currentBid)}</span></h4>
                        <Link to={`/auctions/${product.id}`}><Button mt={20} size={"md"}>Place a Bid</Button></Link>
                    </div>
                </div>
            </Skeleton>
        </div>
    );
}

export default BidCard;
