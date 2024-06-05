import React, { useState } from 'react';
import { Button, Input, Paper, TextInput } from '@mantine/core';
import './mobilesearch.css';
import { IoClose } from "react-icons/io5";

const MobileSearch = ({ isOpen, setIsOpen, onSearch  }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSearch(searchValue);
        }
    };

    return (
        <div>
            <div className={`mobile-search-container ${isOpen ? "slide" : ''}`}>
                <div className="mobile-search">
                    <div className="mobile-search-input">
                        <TextInput placeholder='Search products...' label="What are you looking for?" value={searchValue}
                            onChange={(event) => setSearchValue(event.target.value)}
                            onKeyDown={handleKeyDown} />
                    </div>
                    <IoClose onClick={() => setIsOpen(prevState => !prevState)} />
                </div>
            </div>
        </div>
    );
};

export default MobileSearch;
