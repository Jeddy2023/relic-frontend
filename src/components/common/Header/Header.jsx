import React, { useState, useRef, useContext } from 'react';
import { Flex, Button, ActionIcon, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IoSearchOutline, IoPersonOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { SiNewrelic } from "react-icons/si";
import { MdOutlineAlternateEmail, MdLockOutline } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom'
import "./header.css"
import Logo from '../../../assets/images/logo.png'
import Input from '../Input/Input';
import toast, { Toaster } from 'react-hot-toast';
import { validateCustomerForm } from '../Validations';
import axios from 'axios';
import { UserContext } from "../../../context/userContext";
import MobileSearch from './MobileSearch';


function Header() {
  const { accessToken, login } = useContext(UserContext);
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

  const [opened, { open, close }] = useDisclosure(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate()

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
      if (response.data.user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        close();
      }
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

  return (
    <>
      <nav className='nav'>
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
          <Link to="/wishlist"><CiHeart size={25} color={"gray"} /></Link>
          <Link to={accessToken ? `/dashboard` : `/`} onClick={handleDashboardRedirect}><IoPersonOutline size={25} color={"gray"} /></Link>
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

      <MobileSearch isOpen={isOpen} setIsOpen={setIsOpen}/>
    </>
  )
}

export default Header