import React from 'react'
import './auctionscategorylist.css'

function AuctionsCategoryList({ name, number }) {
    return (
        <li className='auctioncategory-li'>
            <span className='auctioncategory-name'>{name}</span>
            <span>({number})</span>
        </li>
    )
}

export default AuctionsCategoryList