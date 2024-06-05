import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './auctions.css';
import BidCard from '../../components/common/BidCard/BidCard';
import { Select, Card, Text, Group, TextInput, rem, RangeSlider, Accordion, Pagination } from '@mantine/core';
import AuctionsCategoryList from './AuctionsCategoryList';
import NoAuctions from '../../assets/images/empty-animate.svg';
import Loader from '../../components/ui/Loader/Loader';
import { TbCurrencyNaira } from "react-icons/tb";
import toast, { Toaster } from 'react-hot-toast';
import { FaStar } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import BreadCrumb from '../../components/common/BreadCrumb/BreadCrumb';

function Auctions() {
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

    const location = useLocation();

    // useEffect(() => {
    //     const searchParams = new URLSearchParams(location.search);
    //     const searchQuery = searchParams.get('search');
    //     setKeyword(searchQuery);
    // }, [location.search]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchQuery = searchParams.get('search');
        const category = searchParams.get('category');

        setKeyword(searchQuery);

        if (category) {
            const selectedCategory = categories.find(cat => cat.name.toLowerCase() === category.toLowerCase());
            setCategoryId(selectedCategory ? selectedCategory.id : null);
        } else {
            setCategoryId(null);
        }
    }, [location.search, categories, location.category]);


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
                toast.error("An error occurred while getting auctions");
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

    useEffect(() => {
        const getCategories = async () => {
            try {
                const url = `http://localhost:8080/api/v1/categories`;
                const response = await axios.get(url);
                setCategories(response?.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (fetchTrigger) {
            getCategories();
            setFetchTrigger(false);
        }
    }, []);

    const handleSortChange = (value) => {
        setSortBy(value);
    };

    const handleCategoryClick = (categoryId) => {
        setCategoryId(categoryId);
    };

    const handleKeywordChange = (event) => {
        setKeyword(event.target.value);
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.delete('search', event.target.value)
    };

    const handleSliderChange = (value) => {
        setSliderValues(value);
    };

    function formatBidAmount(amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const clearFunction = (value) => {
        switch (value) {
            case "search":
                setKeyword('');
                break;
            case "categories":
                setCategoryId(null);
                break;
            case "price":
                setSliderValues([0, 10000000]);
                break;
            case "rating":
                setRating(null);
                break;
            default:
                setSortBy('Default Sorting');
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage - 1);
    };

    const startIndex = page * pageSize + 1;
    const endIndex = Math.min(startIndex + pageSize - 1, totalResults);

    return (
        <main>
            <Toaster />
            <div className="container auctions_container">
                <BreadCrumb name={'Auctions'}/>
                <div className="auctions_container-top">
                    <h4>Showing {startIndex}–{endIndex} of {totalResults} results</h4>
                    <Select
                        data={['Default Sorting', 'Sort by current bid: low to high', 'Sort by current bid: high to low', 'Sort auction by ending soonest', 'Sort auction by recently started', 'Sort auction by most active']}
                        value={sortBy}
                        onChange={handleSortChange}
                        allowDeselect={false}
                        checkIconPosition="right"
                        size='md'
                    />
                </div>
                <div className="auctions_container-bottom">
                    {isLoading ?
                        <Loader /> :
                        <div className="auctions_container-bottom_left">
                            {products && products.length > 0 ?
                                <div>
                                    <div className="auctions_container-bottom_auctions">
                                        {products.map(product => (
                                            <BidCard key={product.id} product={product} />
                                        ))}
                                    </div>
                                    <Pagination
                                        mt={30}
                                        color='#32c36c'
                                        total={totalPages}
                                        value={page + 1}
                                        onChange={handlePageChange}
                                    />
                                </div>
                                :
                                <div className='no-auction-card'>
                                    <img src={NoAuctions} alt="" style={{ width: "300px" }} />
                                    <h1>No Auctions Found</h1>
                                </div>
                            }
                        </div>
                    }
                    <div className="auctions_container-bottom_sidebar">
                        <Accordion p={0} className='card_section-functionality-accordion' defaultValue="search">
                            <Accordion.Item value="search" className='card_section-functionality-accordion-item'>
                                <Card radius="sm" className='card_section-functionality card_search-section' mb={20}>
                                    <Accordion.Control className='card_section-functionality-accordion-control'>
                                        <Card.Section px={20} mb={25}>
                                            <h2>Search Products</h2>
                                        </Card.Section>
                                    </Accordion.Control>
                                    <Accordion.Panel className='card_section-functionality-accordion-panel'>
                                        <Card.Section>
                                            <TextInput
                                                placeholder='Search Products'
                                                value={keyword || ''}
                                                onChange={handleKeywordChange}
                                            />
                                        </Card.Section>
                                        <button className='clearfilter' onClick={() => clearFunction("search")}>clear</button>
                                    </Accordion.Panel>
                                </Card>
                            </Accordion.Item>
                            <Accordion.Item value="categories" className='card_section-functionality-accordion-item'>
                                <Card radius="sm" className='card_section-functionality card_category-section' mb={20}>
                                    <Accordion.Control className='card_section-functionality-accordion-control'>
                                        <Card.Section px={20} mb={25}>
                                            <h2>Categories</h2>
                                        </Card.Section>
                                    </Accordion.Control>
                                    <Accordion.Panel className='card_section-functionality-accordion-panel'>
                                        <Card.Section>
                                            <ul>
                                                {categories.map(category => (
                                                    <AuctionsCategoryList name={category.name} number={category.productCount} key={category.id} onClickCategory={() => handleCategoryClick(category.id)} />
                                                ))}
                                            </ul>
                                        </Card.Section>
                                        <button className='clearfilter' onClick={() => clearFunction("categories")}>clear</button>
                                    </Accordion.Panel>
                                </Card>
                            </Accordion.Item>
                            <Accordion.Item value="price" className='card_section-functionality-accordion-item'>
                                <Card radius="sm" className='card_section-functionality card_price-section' mb={20}>
                                    <Accordion.Control className='card_section-functionality-accordion-control'>
                                        <Card.Section px={20} mb={25}>
                                            <h2>Price</h2>
                                        </Card.Section>
                                    </Accordion.Control>
                                    <Accordion.Panel className='card_section-functionality-accordion-panel'>
                                        <Card.Section>
                                            <RangeSlider
                                                mt={'sm'}
                                                mb={'sm'}
                                                styles={{ thumb: { borderWidth: rem(2), padding: rem(3) } }}
                                                color="#32c36c"
                                                label={null}
                                                value={sliderValues}
                                                onChange={handleSliderChange}
                                                min={0}
                                                max={10000000}
                                                step={200000}
                                                thumbSize={25}
                                                thumbChildren={[<TbCurrencyNaira size="1rem" key="1" />, <TbCurrencyNaira size="1rem" key="2" />]}
                                            />
                                            <p>₦{formatBidAmount(sliderValues[0])} - ₦{formatBidAmount(sliderValues[1])}</p>
                                        </Card.Section>
                                        <button className='clearfilter' onClick={() => clearFunction("price")}>clear</button>
                                    </Accordion.Panel>
                                </Card>
                            </Accordion.Item>
                            <Accordion.Item value="ratings" className='card_section-functionality-accordion-item'>
                                <Card radius="sm" className='card_section-functionality card_rating-section' mb={20}>
                                    <Accordion.Control className='card_section-functionality-accordion-control'>
                                        <Card.Section px={20} mb={25}>
                                            <h2>Ratings</h2>
                                        </Card.Section>
                                    </Accordion.Control>
                                    <Accordion.Panel className='card_section-functionality-accordion-panel'>
                                        <Card.Section>
                                            <ul>
                                                <li onClick={() => handleRatingChange(5)}>
                                                    5
                                                    <span>
                                                        {[...Array(5)].map((_, index) => (
                                                            <FaStar key={index} />
                                                        ))}
                                                    </span>
                                                </li>
                                                <li onClick={() => handleRatingChange(4)}>
                                                    4
                                                    <span>
                                                        {[...Array(4)].map((_, index) => (
                                                            <FaStar key={index} />
                                                        ))}
                                                    </span>
                                                </li>
                                                <li onClick={() => handleRatingChange(3)}>
                                                    3
                                                    <span>
                                                        {[...Array(3)].map((_, index) => (
                                                            <FaStar key={index} />
                                                        ))}
                                                    </span>
                                                </li>
                                                <li onClick={() => handleRatingChange(2)}>
                                                    2
                                                    <span>
                                                        {[...Array(2)].map((_, index) => (
                                                            <FaStar key={index} />
                                                        ))}
                                                    </span>
                                                </li>
                                                <li onClick={() => handleRatingChange(1)}>
                                                    1
                                                    <span>
                                                        {[...Array(1)].map((_, index) => (
                                                            <FaStar key={index} />
                                                        ))}
                                                    </span>
                                                </li>
                                            </ul>
                                        </Card.Section>
                                        <button className='clearfilter' onClick={() => clearFunction("rating")}>clear</button>
                                    </Accordion.Panel>
                                </Card>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Auctions;
