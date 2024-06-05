import React, { useRef, useState, useEffect, useContext } from 'react';
import './customerdashboard.css';
import { Button, Autocomplete } from '@mantine/core';
import { Country, State, City } from 'country-state-city';
import Input from '../../../components/common/Input/Input';
import { UserContext } from '../../../context/userContext';
import toast, { Toaster } from 'react-hot-toast';
import { validateUpdateShippingAddressForm } from '../../../components/common/Validations';
import axios from 'axios';

function CustomerDashboardUpdateShippingAddress() {
    const { accessToken } = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [fetchTrigger, setFetchTrigger] = useState(true);

    const [formData, setFormData] = useState({
        streetAddress: '',
        city: '',
        state: '',
        country: '',
        firstname: '',
        lastname: ''
    });
    const [errorMessages, setErrorMessages] = useState({
        streetAddress: '',
        city: '',
        state: '',
        country: '',
        firstname: '',
        lastname: ''
    });

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const countries = Country.getAllCountries().map((country) => country.name);
    const allStates = states.map((state) => state.name);
    const allCities = cities.map((city) => city.name);

    useEffect(() => {
        setStates(
            State.getStatesOfCountry(
                Country.getAllCountries().find((item) => item.name === formData.country)?.isoCode
            )
        );
    }, [formData.country]);

    useEffect(() => {
        const selectedCountry = Country.getAllCountries().find((c) => c.name === formData.country);
        const selectedState = states.find((s) => s.name === formData.state);
        if (selectedCountry && selectedState) {
            setCities(
                City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode)
            );
        }
    }, [formData.state, states, formData.country]);

    const getShippingAddress = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`http://localhost:8080/api/v1/shippingaddress`, { headers: { Authorization: `Bearer ${accessToken}` } })
            console.log(response)
            const { streetAddress, city, state, country, firstname, lastname } = response?.data
            setFormData({
                streetAddress: streetAddress || '',
                city: city || '',
                state: state || '',
                country: country || '',
                firstname: firstname || '',
                lastname: lastname || ''
            });
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error("An error occured while trying to get address")
        }
    }

    useEffect(() => {
        if (fetchTrigger && accessToken) {
          getShippingAddress();
          setFetchTrigger(false);
        }
      }, [accessToken]);

    const formRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateUpdateShippingAddressForm(formData, setErrorMessages)) {
            return;
        }

        setLoading(true)

        try {
            const response = await axios.post(`http://localhost:8080/api/v1/shippingaddress`, formData, { headers: { Authorization: `Bearer ${accessToken}` } })
            toast.success(response?.data)
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
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

    const setFormValue = (name, value) => {
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
            <div className="customer_accountdatails-form-names">
                <Input
                    label="First Name"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    error={errorMessages.firstname}
                    type="text"
                />
                <Input
                    label="Last Name"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    error={errorMessages.lastname}
                    type="text"
                />
            </div>
            <Autocomplete
                label="Country / Region"
                placeholder="Select Country"
                data={countries}
                value={formData.country}
                error={errorMessages.country}
                onChange={(country) => {
                    setFormValue('country', country);
                }}
            />
            <Autocomplete
                label="State"
                placeholder="Select State"
                data={allStates}
                error={errorMessages.state}
                value={formData.state}
                onChange={(state) => {
                    setFormValue('state', state);
                }}
                disabled={!formData.country}
            />
            <Autocomplete
                label="Town / City"
                placeholder="Select City"
                data={allCities}
                value={formData.city}
                error={errorMessages.city}
                onChange={(city) => {
                    setFormValue('city', city);
                }}
                disabled={!formData.state}
            />
            <Input
                label="Street"
                placeholder="Input Street"
                name="streetAddress"
                type={"text"}
                value={formData.streetAddress}
                error={errorMessages.streetAddress}
                onChange={handleChange}
            />

            <Button type="submit" size="md" color="#32c36c">
                SAVE ADDRESS
            </Button>
        </form>
    );
}

export default CustomerDashboardUpdateShippingAddress;
