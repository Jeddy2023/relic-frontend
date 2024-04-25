import React, { useContext, useEffect, useRef, useState } from 'react';
import './customerdashboard.css';
import Input from '../../../components/common/Input/Input';
import { Button } from '@mantine/core';
import toast from 'react-hot-toast';
import { validateUpdateUserDetailsForm } from '../../../components/common/Validations';
import { MdOutlineAlternateEmail, MdLockOutline, MdOutlinePerson , MdOutlinePhone} from "react-icons/md";
import { UserContext } from "../../../context/userContext";
import axios from 'axios';

function CustomerDashboardAccountDetails() {
  const { accessToken } = useContext(UserContext);
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    firstname: '',
    lastname: '',
    phonenumber: '',
    newpassword: '',
    confirmnewpassword: ''
  });

  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: '',
    username: '',
    firstname: '',
    phonenumber: '',
    lastname: '',
    newpassword: '',
    confirmnewpassword: ''
  });

  useEffect(() => {
    const getAccountDetails = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:8080/api/v1/auth`, { headers: { Authorization: `Bearer ${accessToken}` } })
        console.log(response)
        const { email, firstname, lastname, username, phonenumber } = response?.data
        setFormData({
          email: email || '',
          firstname: firstname || '',
          lastname: lastname || '',
          username: username || '',
          phonenumber: phonenumber || '',
          password: '',
          newpassword: '',
          confirmnewpassword: ''
        });
        setLoading(false)
      } catch (error) {
        console.log(error)
        toast.error("An error occured while trying to get user details")
      }
    }
    getAccountDetails()
  }, [])

  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateUpdateUserDetailsForm(formData, setErrorMessages)) {
      return;
    }

    setLoading(true)

    try {
      const { confirmnewpassword, ...dataToSend } = formData;
      const response = await axios.patch(`http://localhost:8080/api/v1/auth/update`, dataToSend, { headers: { Authorization: `Bearer ${accessToken}` } })
      toast.success(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error?.response?.data?.message);
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
          Icon={MdOutlinePerson}
        />
        <Input
          label="Last Name"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          error={errorMessages.lastname}
          type="text"
          Icon={MdOutlinePerson}
        />
      </div>
      <h4>NOTE: This will be how your name will be displayed in the account section and in reviews</h4>
      <Input
        label="Display name"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={errorMessages.username}
        type="text"
        Icon={MdOutlinePerson}
      />
      <Input
        label="Email address"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errorMessages.email}
        type="email"
        Icon={MdOutlineAlternateEmail}
      />
      <Input
        label="Phone Number"
        name="phonenumber"
        value={formData.phonenumber}
        onChange={handleChange}
        error={errorMessages.phonenumber}
        type="tel"
        Icon={MdOutlinePhone}
      />
      <h2>PASSWORD CHANGE</h2>
      <Input
        label="Current password (leave blank to leave unchanged)"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errorMessages.password}
        type="password"
        Icon={MdLockOutline}
      />
      <Input
        label="New password (leave blank to leave unchanged)"
        name="newpassword"
        value={formData.newpassword}
        onChange={handleChange}
        error={errorMessages.newpassword}
        type="password"
        Icon={MdLockOutline}
      />
      <Input
        label="Confirm new password"
        name="confirmnewpassword"
        value={formData.confirmnewpassword}
        onChange={handleChange}
        error={errorMessages.confirmnewpassword}
        type="password"
        Icon={MdLockOutline}
      />
      <Button type="submit" size="md" color="#32c36c" mt={10} loading={loading ? true : false}>
        SAVE CHANGES
      </Button>
    </form>
  );
}

export default CustomerDashboardAccountDetails;
