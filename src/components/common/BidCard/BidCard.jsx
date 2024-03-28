import React, { useState, useEffect } from 'react';
import "./bidcard.css"
import { Button } from '@mantine/core';

function BidCard() {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    function calculateTimeLeft() {
        const auctionEndDateString = localStorage.getItem('auctionEndDate');
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

    return (
        <div className="bidcard">
            <div className="content">
                <div className="top">
                    <div className="auction-timer">
                        <div className="main-auction">
                            <span>{timeLeft.days} <p>Days</p></span>
                            <span>{timeLeft.hours} <p>Hours</p></span>
                            <span>{timeLeft.minutes} <p>Minutes</p></span>
                            <span>{timeLeft.seconds} <p>Seconds</p></span>
                        </div>
                    </div>
                    <img src="https://bidout-wp.b-cdn.net/wp-content/uploads/2022/11/eric-prouzet-WTteoDYo4do-unsplash-1.jpg" alt="Auction Item" />
                </div>
                <div className="bottom">
                    <h2 className="name">Alarm Clock 1990’s</h2>
                    <h4>Current Bid: <span>387.0$</span></h4>
                    <Button mt={20} size={"md"}>Place a Bid</Button>
                </div>
            </div>
        </div>
    );
}

export default BidCard;
