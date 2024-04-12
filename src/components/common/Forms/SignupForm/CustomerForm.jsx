import React, { useState, useRef } from 'react';
import { TextInput, Button, Group, Text, rem } from '@mantine/core';
import toast, { Toaster } from 'react-hot-toast';
import { validateCustomerForm, validateVendorForm } from '../../Validations';
import Input from '../../Input/Input';
import './signupform.css'

function CustomerForm({ prevStep, nextStep }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'BUYER'
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

        try {
            toast.success('Request sent successfully');
            nextStep();
            setFormData({
                email: '',
                password: ''
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
                </div>

                <Group justify="center" mt="xl" mb="xl">
                    <Button color='#32c36c' variant="light" onClick={prevStep}>Back</Button>
                    <Button type='submit' color='#32c36c'>Next</Button>
                </Group>
            </form>
        </div>
    );
}

export default CustomerForm;