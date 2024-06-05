import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { GrCart, GrHomeRounded, GrHistory, GrSettingsOption, GrProjects, GrAdd, GrSearch } from 'react-icons/gr'
import { GiDeliveryDrone } from "react-icons/gi";
import { TbDrone } from "react-icons/tb";
import { AiFillAppstore } from "react-icons/ai";
import { FaTruckLoading } from "react-icons/fa";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { ActionIcon, Flex, Avatar, Text, Input, TextInput, Image, Button } from '@mantine/core';
import '../../assets/styles/sidebar.css';
import LogoImg from '../../../assets/images/logo.png'
import { UserContext } from '../../../context/userContext'

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <a href="/admin">
          <Image src={LogoImg} radius={10} w={50} height={50} />
          Relic
        </a>
      </div>
      <Button size='compact-sm' color='#32c36c' fz={'sm'}>Go Back to Home</Button>
      <menu>
        <ul>
          <li>
            <h5>Dashboard</h5>
            <Link to="/admin">
              <ActionIcon size={28} variant='light' color="red"><GrHomeRounded /></ActionIcon>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <h5>User Management</h5>
            <Link to="/admin/users">
              <ActionIcon size={28} variant='light' color="orange"><TbDrone fontSize={10} /></ActionIcon>
              <span>Users</span>
            </Link>
            {/* <Link to="/registerdevice">
              <ActionIcon size={28} variant='light' color="orange"><TbDrone fontSize={10} /></ActionIcon>
              <span>Permissions</span>
            </Link> */}
          </li>
          <li>
            <h5>Notifications</h5>
            <Link to="/admin/notifications">
              <ActionIcon size={28} variant='light' color="orange"><TbDrone fontSize={10} /></ActionIcon>
              <span>Notifications</span>
            </Link>
            {/* <Link to="/registerdevice">
              <ActionIcon size={28} variant='light' color="orange"><TbDrone fontSize={10} /></ActionIcon>
              <span>Alerts</span>
            </Link> */}
          </li>
          <li>
            <h5>Category</h5>
            <Link to="/registerdevice">
              <ActionIcon size={28} variant='light' color="orange"><TbDrone fontSize={10} /></ActionIcon>
              <span>Categories</span>
            </Link>
          </li>
          <li>
            <h5>Auction Management</h5>
            <Link to="/admin/auctions">
              <ActionIcon size={28} variant='light' color="cyan"><GrHistory /></ActionIcon>
              <span>Auctions</span>
            </Link>
            {/* <Link to="/history">
              <ActionIcon size={28} variant='light' color="cyan"><GrHistory /></ActionIcon>
              <span>Create Auction</span>
            </Link> */}
            <Link to="/history">
              <ActionIcon size={28} variant='light' color="cyan"><GrHistory /></ActionIcon>
              <span>Bidding History</span>
            </Link>
          </li>
          <li>
            <h5>Orders</h5>
            <Link to="/history">
              <ActionIcon size={28} variant='light' color="cyan"><GrHistory /></ActionIcon>
              <span>Orders</span>
            </Link>
            <Link to="/history">
              <ActionIcon size={28} variant='light' color="cyan"><GrHistory /></ActionIcon>
              <span>Transactions</span>
            </Link>
            {/* <Link to="/history">
              <ActionIcon size={28} variant='light' color="cyan"><GrHistory /></ActionIcon>
              <span>Commission</span>
            </Link> */}
            {/* <Link to="/history">
              <ActionIcon size={28} variant='light' color="cyan"><GrHistory /></ActionIcon>
              <span>Dispute Resolution</span>
            </Link> */}
          </li>
          <li>
            <h5>FeedBack & Review</h5>
            <Link to="/history">
              <ActionIcon size={28} variant='light' color="cyan"><GrHistory /></ActionIcon>
              <span>Reviews</span>
            </Link>
          </li>
          <li>
            <h5>Analytics</h5>
            <Link to="/history">
              <ActionIcon size={28} variant='light' color="cyan"><GrHistory /></ActionIcon>
              <span>User Analytics</span>
            </Link>
            <Link to="/settings">
              <ActionIcon size={28} variant='light' color='red'><GrSettingsOption /></ActionIcon>
              <span>Auction Analytics</span>
            </Link>
            <Link to="/settings">
              <ActionIcon size={28} variant='light' color='red'><GrSettingsOption /></ActionIcon>
              <span>Order Analytics</span>
            </Link>
          </li>
        </ul>
      </menu>
    </div>
  )
}

export default Sidebar