import React, { useState, useRef } from 'react';
import { Button, Group } from '@mantine/core';
import toast, { Toaster } from 'react-hot-toast';
import { validateVendorForm } from '../../Validations';
import Input from '../../Input/Input';
import './signupform.css'
import { MdOutlineAlternateEmail, MdLockOutline, MdOutlinePerson, MdOutlinePhone } from "react-icons/md";
import { FcShop } from "react-icons/fc";
import axios from 'axios';

function VendorForm({ prevStep, nextStep }) {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        firstname: '',
        lastname: '',
        shopname: '',
        role: 'SELLER'
    });

    const [errorMessages, setErrorMessages] = useState({
        email: '',
        password: '',
        username: '',
        firstname: '',
        lastname: '',
        shopname: '',
    });

    const formRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateVendorForm(formData, setErrorMessages)) {
            return;
        }

        console.log(formData)

        try {
            const response = await axios.post(`http://localhost:8080/api/v1/auth/register/vendor`, formData)
            console.log(response)
            toast.success(response.data);
            nextStep();
            setFormData({
                email: '',
                password: '',
                username: '',
                firstname: '',
                lastname: '',
                shopname: '',
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(error.response.data.message);
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

    return (
        <div className="signup-form_container">
            <Toaster />
            <header>
                <h2>Create a Vendor account</h2>
                <p>Welcome to <span style={{ color: '#32c36c' }}>Relic</span></p>
            </header>
            <form ref={formRef} onSubmit={handleSubmit} className='vendorform'>
                <div className="signupform-form">
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errorMessages.email}
                        type={"email"}
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
                    <Input
                        label="Username"
                        placeholder="Enter your username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        error={errorMessages.username}
                        type={"text"}
                        Icon={MdOutlinePerson}
                    />
                    <Input
                        label="First Name"
                        placeholder="Enter your firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        error={errorMessages.firstname}
                        type={"text"}
                        Icon={MdOutlinePerson}
                    />
                    <Input
                        label="Last Name"
                        placeholder="Enter your lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        error={errorMessages.lastname}
                        type={"text"}
                        Icon={MdOutlinePerson}
                    />
                    <Input
                        label="Shop Name"
                        placeholder="Enter your shopname"
                        name="shopname"
                        value={formData.shopname}
                        onChange={handleChange}
                        error={errorMessages.shopname}
                        type={"text"}
                        Icon={FcShop}
                    />
                </div>

                <Group justify="center" mt="xl" mb="xl">
                    <Button color='#32c36c' variant="light" onClick={prevStep}>Back</Button>
                    <Button type='submit' color='#32c36c'>Next</Button>
                </Group>
            </form>
        </div>
    )
}

export default VendorForm