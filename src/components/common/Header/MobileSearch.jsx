import React, { useState } from 'react';
import { Button, Input, Paper, TextInput } from '@mantine/core';
import './mobilesearch.css';
import { IoClose } from "react-icons/io5";

const MobileSearch = ({isOpen, setIsOpen}) => {
    return (
        <div>
            <div className={`mobile-search-container ${isOpen ? "slide" : ''}`}>
                <div className="mobile-search">
                    <div className="mobile-search-input">
                        <TextInput placeholder='Search products...' label="What are you looking for?" />
                    </div>
                    <IoClose onClick={() => setIsOpen(prevState => !prevState)}/>
                </div>
            </div>
        </div>
    );
};

export default MobileSearch;
