import React from 'react'
import { Blockquote, Rating } from '@mantine/core'
import { MdOutlineReviews } from "react-icons/md";

function ProductReviewCard({ review }) {
    const icon = <MdOutlineReviews />;

    return (
        <Blockquote color="#32c36c" cite={`- ${review.userUsername}`} icon={icon} mt="xl">
            <Rating value={review.rating} readOnly mb={10}/>
            {review.comment}
        </Blockquote>
    )
}

export default ProductReviewCard