import React from 'react'
import './auctions.css'
import BidCard from '../../components/common/BidCard/BidCard'
import { Select, Card, Text, Group, TextInput, rem } from '@mantine/core';
import AuctionsCategoryList from './AuctionsCategoryList';

function Auctions() {
    return (
        <main>
            <div className="container auctions_container">
                <div className="auctions_container-top">
                    <h4>Showing 1–9 of 14 results</h4>
                    <Select
                        data={['Default Sorting', 'Sort by current bid: low to high', 'Sort by current bid: high to low', 'Sort auction by ending soonest', 'Sort auction by recently started', 'Sort auction by most active', 'Sort by highest rating', 'Sort by lowest rating']}
                        defaultValue="Default Sorting"
                        allowDeselect={false}
                        checkIconPosition="right"
                        size='md'
                    />

                </div>
                <div className="auctions_container-bottom">
                    <div className="auctions_container-bottom_auctions">
                        {[...Array(6)].map((_, index) => (
                            <BidCard key={index} />
                        ))}
                    </div>
                    <div className="auctions_container-bottom_sidebar">
                        <Card radius="sm" className='card_search-section' mb={30}>
                            <Card.Section px={20} mb={25}>
                                <h2>Search Products</h2>
                            </Card.Section>

                            <Card.Section px={20}>
                                <TextInput placeholder='Search Products' />
                            </Card.Section>
                        </Card>

                        <Card radius="sm" className='card_category-section'>
                            <Card.Section px={20} mb={25}>
                                <h2>Categories</h2>
                            </Card.Section>

                            <Card.Section px={20}>
                                <ul>
                                    {[...Array(6)].map((_, index) => (
                                        <AuctionsCategoryList name={"Accessories"} number={12} key={index} />
                                    ))}
                                </ul>
                            </Card.Section>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Auctions