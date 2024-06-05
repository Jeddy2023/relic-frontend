import react from 'react';
import { Carousel } from '@mantine/carousel';
import BidCategoryCard from '../BidCategoryCard/BidCategoryCard';
import { PiFlowerLotusThin, PiFlowerLotusBold, PiDressBold } from "react-icons/pi";
import { TbCarSuv } from "react-icons/tb";
import { BsWatch } from "react-icons/bs";
import { LiaRingSolid } from "react-icons/lia";
import { FiMusic } from "react-icons/fi";
import { MdOutlinePhonelink } from "react-icons/md";
import './category.css'
import { Flex } from '@mantine/core';


const categories = [
    { icon: <PiFlowerLotusBold />, name: 'Antiques' },
    { icon: <TbCarSuv />, name: 'Vehicles' },
    { icon: <BsWatch />, name: 'Watches' },
    { icon: <LiaRingSolid />, name: 'Accessories' },
    { icon: <PiDressBold />, name: 'Fashion' },
];

function Category() {

    return (
        <Flex justify={'space-between'} mb={20}>
            {categories.map((category, index) => (
                    <BidCategoryCard icon={category.icon} name={category.name}/>
            ))}
        </Flex>
    )
}

export default Category