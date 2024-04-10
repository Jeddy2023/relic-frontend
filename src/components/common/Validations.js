const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

export const validateVendorForm = (formData, setErrorMessages) => {
    let isValid = true;

    if (!formData.email.trim()) {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            email: 'Email is required',
        }));
        isValid = false;
    } else if (!emailRegex.test(formData.email)) {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            email: 'Invalid email format',
        }));
        isValid = false;
    }

    if (!formData.password.trim()) {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            password: 'Password is required',
        }));
        isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            password: 'Please ensure your password contains at least one digit, one lowercase letter, one uppercase letter, and is between 6 to 20 characters long.',
        }));
        isValid = false;
    }

    if (!formData.username.trim()) {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            username: 'Username is required',
        }));
        isValid = false;
    }

    if (!formData.fullname.trim()) {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            fullname: 'Full Name is required',
        }));
        isValid = false;
    }

    if (!formData.shopname.trim()) {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            shopname: 'Shopname is required',
        }));
        isValid = false;
    }

    if (!formData.phonenumber.trim()) {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            phonenumber: 'Phonenumber is required',
        }));
        isValid = false;
    }

    return isValid;
};

export const validateCustomerForm = (formData, setErrorMessages) => {
    let isValid = true;

    if (!formData.email.trim()) {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            email: 'Email is required',
        }));
        isValid = false;
    } else if (!emailRegex.test(formData.email)) {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            email: 'Invalid email format',
        }));
        isValid = false;
    }

    if (!formData.password.trim()) {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            password: 'Password is required',
        }));
        isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            password: 'Please ensure your password contains at least one digit, one lowercase letter, one uppercase letter, and is between 6 to 20 characters long.',
        }));
        isValid = false;
    }

    return isValid;
};