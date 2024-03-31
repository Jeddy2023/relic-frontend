import React, { useRef } from 'react'
import './home.css'
import BidCard from '../../components/common/BidCard/BidCard'
import { Flex, Button, ActionIcon } from '@mantine/core';
import { Link } from 'react-router-dom';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import Banner from '../../assets/images/hero-banner-1.jpg'
import Banner2 from '../../assets/images/hero-banner-2.jpg'
import { IconPhoto, IconDownload, IconArrowRight } from '@tabler/icons-react';
import { MdVerifiedUser } from "react-icons/md";
import Category from '../../components/common/Category/Category';
import ReviewCard from '../../components/common/ReviewCard/ReviewCard';

function Home() {
  return (
    <main>
      <section className="container hero_section">
        <div className="hero_section-left">
          <div className="hero_section-h1-wrap">
            <h1 className=''>Purchase Dream</h1>
            <h1>Product & Try</h1>
          </div>
          <div className="hero_section-p-wrap">
            <p>
              Unleash the thrill of bidding! Discover treasures, seize opportunities, and elevate your collections, all at <span>Relic</span>.
            </p>
          </div>
          <Link to="/register">
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
          </Link>
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
        <div className="hero_section-p-wrap">
          <p>
            Explore on the world's best & largest Bidding marketplace with our beautiful Bidding products. We want to be a part of your smile, success and future growth.
          </p>
        </div>

        <div className="auctions">
          {[...Array(9)].map((_, index) => (
            <BidCard key={index} />
          ))}
        </div>

        <Link to='/'><Button mt={20} color='#32c36c' fw={900} size={"md"}>View All</Button></Link>
      </section>
      <section className='container review_section'>
        <ReviewCard/>
        <ReviewCard/>
        <ReviewCard/>
        <ReviewCard/>
      </section>
    </main>
  )
}

export default Home