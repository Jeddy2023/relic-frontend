import React, { useState, useRef } from 'react';
import { TextInput, Button, Group, Text, rem } from '@mantine/core';
import toast, { Toaster } from 'react-hot-toast';
import { validateCustomerForm, validateVendorForm } from '../../Validations';
import Input from '../../Input/Input';
import './signupform.css'
import { MdOutlineAlternateEmail, MdLockOutline } from "react-icons/md";
import axios from 'axios';
import Cookies from 'js-cookie';

function CustomerForm({ prevStep, nextStep }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'BUYER'
    });

    const [loading, setLoading] = useState(false);
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

        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/auth/register/customer`, formData);
            const message = response.data.message; // Extract the message
            const verificationToken = response.data.verificationToken;
            Cookies.set('verificationToken', verificationToken);

            if (response.status === 200) {
                toast.success(message); // Display the message

                nextStep();
                setFormData({
                    email: '',
                    password: ''
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
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
                <h2>Create a Customer account</h2>
                <p>Welcome to <span style={{ color: '#32c36c' }}>Relic</span></p>
            </header>
            <form ref={formRef} onSubmit={handleSubmit} className='customerform'>
                <div className="signupform-form customerform-form">
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errorMessages.email}
                        Icon={MdOutlineAlternateEmail}
                        type='email'
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
                </div>

                <Group justify="center" mt="xl" mb="xl">
                    <Button color='#32c36c' variant="light" onClick={prevStep}>Back</Button>
                    <Button type='submit' color='#32c36c' loading={loading}>Next</Button>
                </Group>
            </form>
        </div>
    );
}

export default CustomerForm;
