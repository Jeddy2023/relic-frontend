import React, { useState, useRef } from 'react';
import { Button, Group } from '@mantine/core';
import toast, { Toaster } from 'react-hot-toast';
import { validateVendorForm } from '../../Validations';
import Input from '../../Input/Input';
import './signupform.css'

function VendorForm({ prevStep, nextStep }) {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        fullname: '',
        shopname: '',
        phonenumber: ''
    });

    const [errorMessages, setErrorMessages] = useState({
        email: '',
        password: '',
        username: '',
        fullname: '',
        shopname: '',
        phonenumber: ''
    });

    const formRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateVendorForm(formData, setErrorMessages)) {
            return;
        }

        try {
            toast.success('Request sent successfully');
            nextStep();
            setFormData({
                email: '',
                password: '',
                username: '',
                fullname: '',
                shopname: '',
                phonenumber: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An error occurred. Please try again later.');
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
                        type={"text"}
                    />
                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errorMessages.password}
                        type="password"
                    />
                    <Input
                        label="Username"
                        placeholder="Enter your username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        error={errorMessages.username}
                        type={"text"}
                    />
                    <Input
                        label="Full Name"
                        placeholder="Enter your fullname"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        error={errorMessages.fullname}
                        type={"text"}
                    />
                    <Input
                        label="Phone Number"
                        placeholder="Enter your Phone Number"
                        name="phonenumber"
                        value={formData.phonenumber}
                        onChange={handleChange}
                        error={errorMessages.phonenumber}
                        type={"text"}
                    />
                    <Input
                        label="Shop Name"
                        placeholder="Enter your shopname"
                        name="shopname"
                        value={formData.shopname}
                        onChange={handleChange}
                        error={errorMessages.shopname}
                        type={"text"}
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