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


const categories = [
    { icon: <PiFlowerLotusBold />, name: 'Antiques' },
    { icon: <TbCarSuv />, name: 'Vehicles' },
    { icon: <BsWatch />, name: 'Watches' },
    { icon: <LiaRingSolid />, name: 'Accessories' },
    { icon: <FiMusic />, name: 'Music' },
    { icon: <PiDressBold />, name: 'Fashion' },
    { icon: <MdOutlinePhonelink />, name: 'Electronics' },
];

function Category() {

    return (
        <Carousel
            slideSize={{ base: '100%', sm: '50%', md: '16%' }}
            slideGap={{ base: 0, sm: 16, md: 15 }}
            align="start"
            controlSize={40}
            controlsOffset={10}
            loop
        >
            {categories.map((category, index) => (
                <Carousel.Slide key={index}>
                    <BidCategoryCard icon={category.icon} name={category.name} />
                </Carousel.Slide>
            ))}
        </Carousel>
    )
}

export default Category