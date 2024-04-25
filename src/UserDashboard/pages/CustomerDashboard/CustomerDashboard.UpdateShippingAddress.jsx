import React, { useRef, useState, useEffect } from 'react';
import './customerdashboard.css';
import { Button, Autocomplete } from '@mantine/core';
import toast from 'react-hot-toast';
import { Country, State, City } from 'country-state-city';
import Input from '../../../components/common/Input/Input';

const defaultValues = {
    street: '10 King Esanwo',
    town: '',
    state: '',
    country: '',
    firstname: 'jedidiah',
    lastname: 'Ken Osuh'
};

function CustomerDashboardUpdateShippingAddress() {
    const [country, setCountry] = useState(defaultValues.country);
    const [state, setState] = useState(defaultValues.state);
    const [city, setCity] = useState(defaultValues.town);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const countries = Country.getAllCountries().map((country) => country.name);
    const allStates = states.map((state) => state.name);
    const allCities = cities.map((city) => city.name);

    useEffect(() => {
        setStates(
            State.getStatesOfCountry(
                Country.getAllCountries().find((item) => item.name === country)?.isoCode
            )
        );
    }, [country]);

    useEffect(() => {
        const selectedCountry = countries.find((c) => c.name === country);
        const selectedState = states.find((s) => s.name === state);
        if (selectedState) {
            setCities(
                City.getCitiesOfState(selectedCountry?.isoCode,selectedState?.isoCode).map((city) => city.name)
            );
        }
    }, [state, states]);

    const [formData, setFormData] = useState(defaultValues);
    const [errorMessages, setErrorMessages] = useState({
        street: '',
        town: '',
        state: '',
        country: '',
        firstname: '',
        lastname: ''
    });

    const formRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log('Form data to send:', formData);
            toast.success('Request sent successfully');
            setFormData(defaultValues);
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
        <form ref={formRef} onSubmit={handleSubmit} className="customer_accountdatails-form">
            <Autocomplete
                label="Country / Region"
                placeholder="Select Country"
                data={countries}
                value={country}
                onChange={(country) => {
                    setCountry(country);
                }}
            />
            <Autocomplete
                label="State"
                placeholder="Select State"
                data={allStates}
                value={state}
                onChange={(state) => {
                    setState(state);
                }}
            />
            <Autocomplete
                label="Town / City"
                placeholder="Select City"
                data={allCities}
                value={city}
                onChange={(city) => {
                    setCity(city);
                }}
            />

            <Button type="submit" size="md" color="#32c36c">
                SAVE ADDRESS
            </Button>
        </form>
    );
}

export default CustomerDashboardUpdateShippingAddress;
