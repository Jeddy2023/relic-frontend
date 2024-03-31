import React from 'react'
import { Flex, Button, ActionIcon } from '@mantine/core';
import { IoSearchOutline, IoPersonOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { SiNewrelic } from "react-icons/si";
import { Link } from 'react-router-dom'
import "./header.css"
import Logo from '../../../assets/images/2-removebg-preview.png'

function Header() {
  return (
    <nav className='nav'>
      <Link href="#" className='logo'>
        <img src={Logo} />
        {/* <h1>Relic</h1>
        <SiNewrelic /> */}
      </Link>

      <Flex align={"center"} gap={30}>
        <Link to="/"><h3>Home</h3></Link>
        <Link to="/about"><h3>About Us</h3></Link>
        <Link to="/auctions"><h3>Auctions</h3></Link>
        <Link to="/faq"><h3>Faq</h3></Link>
        <Link to="/contact"><h3>Contact</h3></Link>
      </Flex>

      <Flex align={"center"} gap={20}>
        <Link to="/register"><Button color={"#32c36c"}>Sign up</Button></Link>
        <Link to="/login"><Button color={"#32c36c"} variant={"outline"}>Sign in</Button></Link>
        <ActionIcon bg={'transparent'} mb={5}><IoSearchOutline size={25} color={"gray"} /></ActionIcon>
        <Link to="/wishlist"><CiHeart size={25} color={"gray"} /></Link>
        <Link to="/dashboard"><IoPersonOutline size={25} color={"gray"} /></Link>
      </Flex>
    </nav>
  )
}

export default Header