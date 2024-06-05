import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, NumberInput, Button, Tabs, rem, Table, Rating, Textarea, Blockquote, Spoiler } from '@mantine/core';
import './auctiondetails.css';
import Loader from '../../components/ui/Loader/Loader';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import NoAuctions from '../../assets/images/empty-animate.svg'
import { validateReviewForm } from '../../components/common/Validations';
import ProductReviewCard from '../../components/common/ProductReviewCard/ProductReviewCard';
import toast, { Toaster } from 'react-hot-toast';
import { GoBlocked } from "react-icons/go";
import Unauthorized from '../../assets/images/unauthorized.svg'
import Winner from '../../assets/images/winner.svg'
import BreadCrumb from '../../components/common/BreadCrumb/BreadCrumb';

function AuctionDetails() {
    const { id } = useParams();
    const [auctionData, setAuctionData] = useState(null);
    const [winningBidderData, setWinningBidderData] = useState(null);
    const [biddingHistory, setBiddingHistory] = useState([]);
    const [productReviews, setProductReviews] = useState([]);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [bidAmount, setBidAmount] = useState(0);
    const { accessToken, userData } = useContext(UserContext);
    const [isloading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        rating: 1,
        comment: ''
    });

    const [errorMessages, setErrorMessages] = useState({
        rating: '',
        comment: ''
    });

    const formRef = useRef(null);

    useEffect(() => {
        const fetchAuctionData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/auction/${id}`);
                setAuctionData(response?.data);
                setBidAmount(response?.data?.currentBid + 10);
            } catch (error) {
                console.error('Error fetching auction details:', error);
            }
        };

        fetchAuctionData()
    }, [id]);

    useEffect(() => {
        const fetchWinningBidder = async () => {
            try {
                if (accessToken) {
                    const response = await axios.get(`http://localhost:8080/api/v1/bid/winning-bid/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } })
                    setWinningBidderData(response?.data);
                }
            } catch (error) {
                console.error('Error fetching winning bidder details:', error);
            }
        };

        fetchWinningBidder()
    }, [id, bidAmount, accessToken]);

    useEffect(() => {
        const fetchBiddingHistory = async () => {
            try {
                if (accessToken) {
                    const response = await axios.get(`http://localhost:8080/api/v1/bid/list/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } })
                    setBiddingHistory(response?.data);
                }
            } catch (error) {
                console.error('Error fetching bidding history details:', error);
            }
        };

        fetchBiddingHistory()
    }, [id, bidAmount, accessToken]);

    const fetchProductReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/reviews/product/${id}`);
            setProductReviews(response?.data);
        } catch (error) {
            console.error('Error fetching product reviews:', error);
        }
    };

    useEffect(() => {
        fetchProductReviews();
    }, [id]);

    useEffect(() => {
        if (auctionData) {
            const timer = setInterval(() => {
                setTimeLeft(calculateTimeLeft(auctionData.biddingTimeLimit));
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [auctionData]);

    function calculateTimeLeft(auctionEndDateString) {
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

    function formatAuctionEndDate() {
        const auctionEndDateString = auctionData?.biddingTimeLimit || undefined;
        if (!auctionEndDateString) return '';

        const auctionEndDate = new Date(auctionEndDateString);
        const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        return auctionEndDate.toLocaleString('en-US', options);
    }

    function formatBidAmount(amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const handleRatingChange = (value) => {
        setFormData((prevFormData) => ({ ...prevFormData, rating: value }));
    };

    const handleReviewSubmit = async (event) => {
        event.preventDefault();

        if (!validateReviewForm(formData, setErrorMessages)) {
            return;
        }

        setIsLoading(true)
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/reviews/product/${id}`, formData, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            fetchProductReviews();
            toast.success(response?.data)
            setFormData({
                rating: 1,
                comment: ''
            });
            setIsLoading(false);
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error(error.response.data.message)
            setIsLoading(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    if (!auctionData) {
        return <Loader />;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true)
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/bid/place/${id}`, { bidAmount: bidAmount }, { headers: { Authorization: `Bearer ${accessToken}` } })
            toast.success(response?.data)

            const newData = await axios.get(`http://localhost:8080/api/v1/auction/${id}`);
            setAuctionData(newData?.data);
            setBidAmount(newData?.data?.currentBid + 10);
            setIsLoading(false)
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(error.response.data.message)
            setIsLoading(false);
        }
    };

    const rows = biddingHistory.map((element) => (
        <Table.Tr key={element.id}>
            <Table.Td>{formatAuctionEndDate(element.updatedAt)}</Table.Td>
            <Table.Td>{element.bidderUsername}</Table.Td>
            <Table.Td>₦{formatBidAmount(element.bidAmount)}</Table.Td>
        </Table.Tr>
    ));

    return (
        <div className="container product-details-container">
            <Toaster />
            <BreadCrumb name={'Product Details'} />
            <div className="product-details-container-top">
                <div className="product-image">
                    <img src={auctionData.productImageUrl} alt={auctionData.name} />
                </div>
                <div className="product-info">
                    <h2 className='product-info-name'>{auctionData.name}</h2>
                    <h4 className='product-info-shortdescription'>{auctionData.shortDescription}</h4>
                    <h4 className='product-info-condition'>ITEM CONDITION: <span>{auctionData.condition}</span></h4>
                    <div className="product-info-timeleftcon">
                        <h4 className='product-info-timeleft'>Time Left</h4>
                        <div className="product-info-timeleft-con">
                            <div className="product-info-timeleft-con-box"><span>{timeLeft.days} <p>Days</p></span></div>
                            <div className="product-info-timeleft-con-box"><span>{timeLeft.hours} <p>Hours</p></span></div>
                            <div className="product-info-timeleft-con-box"><span>{timeLeft.minutes} <p>Minutes</p></span></div>
                            <div className="product-info-timeleft-con-box"><span>{timeLeft.seconds} <p>Seconds</p></span></div>
                        </div>
                    </div>
                    <h4 className='product-info-auctiondate'>Auction ends: <span>{formatAuctionEndDate()}</span></h4>
                    <p className='product-info-currentbid'>{auctionData.winningBidderId != null && auctionData.winningBidderId == userData.id ? 'Winning' : 'Current'} bid: <span>₦{formatBidAmount(auctionData.currentBid)}</span></p>
                    {auctionData.winningBidderId != null && auctionData.winningBidderId !== userData.id && <Flex gap={10}>
                        {auctionData.currentBid >= auctionData.minimumBid && auctionData.numberOfBids >= 1 ? <p className='product-info-reserveprice'>Reserve price has been met</p> : <div></div>}
                        {winningBidderData?.bidderUsername == userData.username && auctionData.numberOfBids >= 1 ? <p className='product-info-reserveprice'>You are currently the highest bid</p> : <div></div>}
                    </Flex>}
                    {userData.verified && !userData.blocked ? (
                        auctionData.winningBidderId != null && auctionData.winningBidderId == userData.id ? (
                            <Flex align={'center'} justify={'center'} gap={20} p={10} bg={'whitesmoke'}>
                                <img src={Winner} style={{ width: '100px' }} alt="Winner" />
                                <h2 style={{ color: '#747474' }}>You are the winner of this Auction</h2>
                            </Flex>
                        ) : (
                            <form className='product-info-form' onSubmit={handleSubmit}>
                                <Flex gap={'sm'}>
                                    <NumberInput
                                        className='product-info-form-input'
                                        value={bidAmount}
                                        onChange={(bidAmount) => setBidAmount(bidAmount)}
                                        min={auctionData.currentBid}
                                        size='lg'
                                        hideControls={false}
                                        thousandSeparator=","
                                        allowDecimal={false}
                                        allowNegative={false}
                                        prefix="₦"
                                    />
                                    <Button type='submit' className='product-info-form-button' size='lg' color='#32c36c' loading={isloading}>
                                        Bid
                                    </Button>
                                </Flex>
                            </form>
                        )
                    ) : (
                        <Flex align={'center'} justify={'center'} gap={20} p={10} bg={'whitesmoke'}>
                            <img src={Unauthorized} style={{ width: '100px' }} alt="Unauthorized" />
                            <h2 style={{ color: '#747474' }}>Cannot Access this Resource</h2>
                        </Flex>
                    )}
                </div>
            </div>
            <div className="product-details-container-bottom">
                <Tabs defaultValue="description">
                    <Tabs.List>
                        <Tabs.Tab value="description">
                            <h3>Description</h3>
                        </Tabs.Tab>
                        <Tabs.Tab value="history">
                            <h3>History</h3>
                        </Tabs.Tab>
                        <Tabs.Tab value="review">
                            <h3>Reviews({productReviews.length})</h3>
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="description">
                        <div className="product-details-container-bottom-tab-detail">
                            <h2>Description</h2>
                            <h4>{auctionData.description}</h4>
                        </div>
                    </Tabs.Panel>

                    <Tabs.Panel value="history">
                        <div className="product-details-container-bottom-tab-detail">
                            <h2>Auction History</h2>
                            <Table.ScrollContainer minWidth={500} type="native" >
                                <Table verticalSpacing="md" highlightOnHover withTableBorder withColumnBorders>
                                    <Table.Thead>
                                        <Table.Tr>
                                            <Table.Th>Date</Table.Th>
                                            <Table.Th>User</Table.Th>
                                            <Table.Th>Bid</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                        {
                                            biddingHistory.length >= 1 ? (
                                                rows
                                            ) : (
                                                <Table.Tr>
                                                    <Table.Td colSpan={3} style={{ textAlign: 'center' }}>
                                                        <img
                                                            src={NoAuctions}
                                                            className="product-details-container-bottom-tab-detail-img"
                                                            alt=""
                                                            style={{ width: "300px" }}
                                                        />
                                                    </Table.Td>
                                                </Table.Tr>
                                            )
                                        }
                                    </Table.Tbody>
                                </Table>
                            </Table.ScrollContainer>
                        </div>
                    </Tabs.Panel>

                    <Tabs.Panel value="review">
                        <div className="product-details-container-bottom-tab-detail">
                            <h2>Reviews</h2>
                            {productReviews.length >= 1 ? productReviews.map((review) => <ProductReviewCard key={review.id} review={review} />) : <h4>There are no reviews yet, be the first to review</h4>}
                            {auctionData.winningBidderId != null && auctionData.winningBidderId == userData.id ? <div className="product-details-container-bottom-tab-detail-reviewrate">
                                <p>Your Rating</p>
                                <form ref={formRef} onSubmit={handleReviewSubmit}>
                                    <Rating value={formData.rating} onChange={handleRatingChange} name='rating' />
                                    <Textarea
                                        placeholder="Your Review"
                                        autosize
                                        minRows={2}
                                        mt={15}
                                        value={formData.comment}
                                        onChange={handleChange}
                                        name='comment'
                                        error={errorMessages.comment}
                                    />
                                    <Button mt={10} color='#32c36c' type='submit' loading={isloading ? true : false}>Submit</Button>
                                </form>
                            </div> :
                                <Flex align={'center'} justify={'center'} gap={20} p={10} bg={'whitesmoke'}>
                                    <img src={Unauthorized} style={{ width: '100px' }} />
                                    <h2 style={{ color: '#747474' }}>Cannot Access this Resource</h2>
                                </Flex>
                            }
                        </div>
                    </Tabs.Panel>
                </Tabs>
            </div>
        </div>
    );
}

export default AuctionDetails;
