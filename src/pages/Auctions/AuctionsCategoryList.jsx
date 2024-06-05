import React from 'react'
import './auctionscategorylist.css'

function AuctionsCategoryList({ name, number, onClickCategory }) {
    const handleClick = () => {
        onClickCategory();
    };

    return (
        <li className='auctioncategory-li' onClick={handleClick}>
            <span className='auctioncategory-name'>{name}</span>
            <span>({number})</span>
        </li>
    )
}

export default AuctionsCategoryList