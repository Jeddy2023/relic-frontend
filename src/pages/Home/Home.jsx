import React, { useContext, useEffect, useRef, useState } from 'react'
import './home.css'
import BidCard from '../../components/common/BidCard/BidCard'
import { Flex, Button, ActionIcon, Skeleton } from '@mantine/core';
import { Link } from 'react-router-dom';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import Banner from '../../assets/images/hero-banner-1.jpg'
import Banner2 from '../../assets/images/hero-banner-2.jpg'
import { IconPhoto, IconDownload, IconArrowRight } from '@tabler/icons-react';
import { MdVerifiedUser } from "react-icons/md";
import Category from '../../components/common/Category/Category';
import ReviewCard from '../../components/common/ReviewCard/ReviewCard';
import ClientReviewCard from '../../components/common/ClientReviewCard/ClientReviewCard';
import clientcircle from '../../assets/images/clent-circle1.png'
import clientcircle2 from '../../assets/images/clent-circle2.png'
import rightLayout from '../../assets/images/client-right.png'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { UserContext } from '../../context/userContext';

function Home() {
  const { accessToken, userData } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(null);
  const [condition, setCondition] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [sliderValues, setSliderValues] = useState([0, 10000000]);
  const [minimumBid, setMinimumBid] = useState(null);
  const [rating, setRating] = useState(null);
  const [sortBy, setSortBy] = useState('Default Sorting');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [fetchTrigger, setFetchTrigger] = useState(true);

  const buildQueryString = () => {
    const params = {
      categoryId: categoryId,
      condition: condition,
      keyword: keyword,
      minBid: sliderValues[0],
      maxBid: sliderValues[1],
      minimumBid: minimumBid,
      rating: rating,
      sortBy: sortBy,
      page: page,
      size: pageSize
    };

    const queryString = Object.entries(params)
      .filter(([key, value]) => value !== null && value !== '')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    return queryString ? `?${queryString}` : '';
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const url = `http://localhost:8080/api/v1/auction/all${buildQueryString()}`;
        const response = await axios.get(url);
        setProducts(response?.data?.content);
        setTotalPages(response?.data?.totalPages);
        setTotalResults(response?.data?.totalElements);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (fetchTrigger) {
      getProducts();
      setFetchTrigger(false);
    } else {
      setIsLoading(true);
      getProducts();
    }
  }, [categoryId, condition, keyword, sliderValues, minimumBid, rating, sortBy, page]);

  return (
    <main>
      <section className="container hero_section">
        <div className="hero_section-left">
          <div className="hero_section-h1-wrap">
            <h1 className=''>Purchase your Dream Product & Try it</h1>
          </div>
          <div className="hero_section-p-wrap">
            <p>
              Unleash the thrill of bidding! Discover treasures, seize opportunities, and elevate your collections, all at <span>Relic</span>.
            </p>
          </div>
          {!accessToken && <Link to="/register">
            <Button
              pt={10}
              pb={10}
              color={"#32c36c"} size='sm'
              variant="light"
              leftSection={<MdVerifiedUser size={16} />}
              rightSection={<IconArrowRight size={16} />}
            >
              Get Started
            </Button>
          </Link>}
        </div>
        <div className="hero_section-right">
          <div className="img-holder one">
            <img src={Banner} alt="" />
          </div>

          <div className="img-holder two">
            <img src={Banner2} alt="" />
          </div>
        </div>
      </section>
      <section className="container category_section">
        <Category />
      </section>
      <section className="container auction_section">
        <h1>Live Auction</h1>
        <div className="auction_section-p-wrap">
          <p>
            Explore on the world's best & largest Bidding marketplace with our beautiful Bidding products. We want to be a part of your smile, success and future growth.
          </p>
        </div>

        <div className="auctions">
          {products.map(product => (
            <BidCard key={product.id} product={product} />
          ))}
        </div>

        <Link to='/auctions'><Button mt={20} color='#32c36c' fw={900} size={"md"} mb={20}>View All</Button></Link>
      </section>
      <section className="container client-review_section">
        <h1>What Client Say</h1>
        <div className="client-review_section-p-wrap">
          <p>
            Explore on the world's best & largest Bidding marketplace with our beautiful Bidding products. We want to be a part of your smile, success and future growth.
          </p>
        </div>

        <div className="clientreviews">
          <ClientReviewCard />
          <ClientReviewCard />
          <ClientReviewCard />
        </div>

        <img src={rightLayout} className='client-right-vector' />
        <img src={clientcircle} className='client-circle1' />
        <img src={clientcircle2} className='client-circle2' />
      </section>

      <section className='container review_section'>
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </section>
    </main>
  )
}

export default Home