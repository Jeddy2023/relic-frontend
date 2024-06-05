import React, { useState, useRef, useContext, useEffect } from 'react';
import { Flex, Button, ActionIcon, Modal, Popover, Text, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IoSearchOutline, IoPersonOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { SiNewrelic } from "react-icons/si";
import { MdOutlineAlternateEmail, MdLockOutline, MdOutlineDoorbell } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { GoBell } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom'
import "./header.css"
import Logo from '../../../assets/images/logo.png'
import Input from '../Input/Input';
import toast, { Toaster } from 'react-hot-toast';
import { validateCustomerForm } from '../Validations';
import axios from 'axios';
import { UserContext } from "../../../context/userContext";
import MobileSearch from './MobileSearch';
import Notification from '../Notification/Notification';


function Header() {
  const [sortBy, setSortBy] = useState('Date Descending');
  const { accessToken, login, userData } = useContext(UserContext);
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [fetchTrigger, setFetchTrigger] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);

  const [keyword, setKeyword] = useState('');

  const [opened, { open, close }] = useDisclosure(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: ''
  });

  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateCustomerForm(formData, setErrorMessages)) {
      return;
    }

    setLoading(true)

    try {
      const response = await axios.post(`http://localhost:8080/api/v1/auth/login`, formData)
      toast.success(response.data.message);
      setFormData({
        email: '',
        password: ''
      });
      login(response.data)
      setLoading(false)
      close();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error.response.data.message);
      setLoading(false)
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleDashboardRedirect = () => {
    if (!accessToken) {
      toast.error("Please login to access the dashboard");
    }
  };

  const buildQueryString = () => {
    const params = {
      isRead: null,
      sortBy: sortBy,
      page: page,
      size: pageSize
    };

    const queryString = Object.entries(params)
      .filter(([key, value]) => value !== null && value !== '')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    return queryString ? `?${queryString}` : '';
  };

  const getUnreadNotifications = async (size) => {
    setFetchTrigger(true);
    try {
      const url = `http://localhost:8080/api/v1/notifications?size=${size}`;
      const response = await axios.get(url, { headers: { Authorization: `Bearer ${accessToken}` } });
      setUnreadNotifications(response?.data?.content);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while getting notifications");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getNotifications = async () => {
    setFetchTrigger(true);
    try {
      const url = `http://localhost:8080/api/v1/notifications${buildQueryString()}`;
      const response = await axios.get(url, { headers: { Authorization: `Bearer ${accessToken}` } });
      setNotifications(response?.data?.content);
      getUnreadNotifications(response?.data?.totalElements > 0 ?  response?.data?.totalElements : 1);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while getting notifications");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken && fetchTrigger) {
      getNotifications();
      setFetchTrigger(false);
    } else {
      setNotifications([]);
      setIsLoading(false);
    }

  }, [page, accessToken]);

  const handleSearch = (searchValue) => {
    setKeyword(searchValue);
    window.location.href = `/auctions?search=${encodeURIComponent(searchValue)}`;
  };

  const markAllAsRead = async () => {
    try {
      await axios.patch(`http://localhost:8080/api/v1/notifications/mark-all-as-read`, {}, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      toast.success("All notifications marked as read");
      getNotifications();
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while marking all notifications as read");
    }
  };

  const handleDeleteClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    markAllAsRead();
    setConfirmOpen(false);
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
  };

  const TotalUnReadNotifications = unreadNotifications.reduce((acc, notification) => {
    if (!notification.read) {
      acc.push(notification);
    }
    return acc;
  }, []);

  return (
    <>
      <nav className='header-navbar-con container'>
        <Toaster />
        <Link href="/" className='logo'>
          <img src={Logo} />
        </Link>

        <Flex align={"center"} gap={30}>
          <Link to="/"><h3>Home</h3></Link>
          <Link to="/about"><h3>About Us</h3></Link>
          <Link to="/auctions"><h3>Auctions</h3></Link>
          <Link to="/faq"><h3>Faq</h3></Link>
          <Link to="/contact"><h3>Contact</h3></Link>
        </Flex>

        <Flex align={"center"} gap={20}>
          {accessToken ? (
            <div></div>
          ) : (
            <>
              <Link to="/register">
                <Button color={"#32c36c"}>Sign up</Button>
              </Link>
              <Button onClick={open} color={"#32c36c"} variant={"outline"}>
                Sign in
              </Button>
            </>
          )}
          <ActionIcon bg={'transparent'} mb={5} onClick={() => setIsOpen(prevState => !prevState)}><IoSearchOutline size={25} color={"gray"} /></ActionIcon>
          <Link to={accessToken ? `/wishlist` : `/`}><CiHeart size={25} color={"gray"} /></Link>
          <div className="notification_container">
            <Popover position="bottom" withArrow shadow="md">
              <Popover.Target>
                <div className="notification_signifier">
                  <GoBell size={23} color={"gray"} />
                  {accessToken && TotalUnReadNotifications?.length >= 1 ? <span>{TotalUnReadNotifications?.length || 0}</span> : <div></div>}
                </div>
              </Popover.Target>
              {accessToken ?
                <Popover.Dropdown mr={200} maw={400} p={10}>
                  {notifications.length >= 1 ?
                    <>
                      <ul className="notification-list">
                        {notifications.map((notification) => <Notification key={notification.id} notification={notification} isDashboard={false} />)}
                      </ul>

                      <Flex gap={20} justify={'space-between'} align={'center'} mt={15}>
                        <Text color={"#32c36c"} size='sm' fz={'h6'} ff={'"Saira", sans-serif'} className='notification-list_maskall' onClick={handleDeleteClick}>Mark all as read</Text>
                        <Link to={accessToken ? (userData.role === 'ADMIN' ? '/admin/notifications' : '/dashboard/notifications') : '/'}><Button color={"#32c36c"} variant={'light'} size='compact-sm' fz={'sm'} fw={400}>View all Notifications</Button></Link>
                      </Flex>
                    </> :
                    <Text color={"#32c36c"} size='sm' fz={'h5'} ff={'"Saira", sans-serif'}> You have no Notifications Yet</Text>
                  }
                </Popover.Dropdown> :
                <div></div>
              }
            </Popover>
          </div>
          <Link to={accessToken ? (userData.role === 'ADMIN' ? '/admin' : '/dashboard') : '/'} onClick={handleDashboardRedirect}><IoPersonOutline size={25} color={"gray"} /></Link>
        </Flex>

        <Modal opened={opened} onClose={close} title={
          (
            <Link href="/" className='modal-logo'>
              <img src={Logo} />
            </Link>
          )
        } centered>
          <div className='login-form'>
            <h1>Welcome Back</h1>
            <p className='missed-text'>
              We've missed you so much
            </p>
            <form ref={formRef} onSubmit={handleSubmit} >
              <Input
                label="Email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errorMessages.email}
                type='email'
                Icon={MdOutlineAlternateEmail}
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errorMessages.password}
                type="password"
                Icon={MdLockOutline}
              />

              <Button
                type='submit'
                color='#32c36c'
                mt={20}
                size='md'
                loading={loading ? true : false}
              >Sign In</Button>

              <div className='signup-link'>
                <span>
                  Already have an account ?
                  <Link
                    to={"/register"} style={{ color: '#32c36c', marginLeft: '5px' }}
                  >
                    Sign Up
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </Modal>
      </nav>

      <MobileSearch isOpen={isOpen} setIsOpen={setIsOpen} onSearch={handleSearch} />
      <Modal
        opened={confirmOpen}
        onClose={handleCancelDelete}
        title="Mark all as read"
        centered
        ff={'"Saira", sans-serif'}
      >
        <Text >Are you sure you want to mark all notifications as read?</Text>
        <Flex gap={10} justify={'center'} mt={12}>
          <Button variant="outline" color="#32c36c" onClick={handleCancelDelete}>No</Button>
          <Button color="#32c36c" onClick={handleConfirmDelete}>Yes</Button>
        </Flex>
      </Modal>
    </>
  )
}

export default Header
