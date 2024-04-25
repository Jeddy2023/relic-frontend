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

    if (!formData.firstname.trim()) {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            firstname: 'First Name is required',
        }));
        isValid = false;
    }

    if (!formData.lastname.trim()) {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            lastname: 'Last Name is required',
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

export const validateUpdateUserDetailsForm = (formData, setErrorMessages) => {
    let isValid = true;
    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    // Validate email
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

    // Validate password only if not empty
    if (formData.password.trim()) {
        if (!passwordRegex.test(formData.password)) {
            setErrorMessages((prevErrors) => ({
                ...prevErrors,
                password: 'Please ensure your password contains at least one digit, one lowercase letter, one uppercase letter, and is between 6 to 20 characters long.',
            }));
            isValid = false;
        }

        if (!formData.newpassword.trim() && !formData.confirmnewpassword.trim()) {
            setErrorMessages((prevErrors) => ({
                ...prevErrors,
                newpassword: 'Password is required since you specified your old password',
                confirmnewpassword: 'Password is required since you specified your old password'
            }));
            isValid = false;
        }

        if (!passwordRegex.test(formData.newpassword) || !passwordRegex.test(formData.confirmnewpassword)) {
            setErrorMessages((prevErrors) => ({
                ...prevErrors,
                newpassword: 'Please ensure your password contains at least one digit, one lowercase letter, one uppercase letter, and is between 6 to 20 characters long.',
                confirmnewpassword: 'Please ensure your password contains at least one digit, one lowercase letter, one uppercase letter, and is between 6 to 20 characters long.',
            }));
            isValid = false;
        } else if (formData.newpassword.trim() !== formData.confirmnewpassword.trim()) {
            setErrorMessages((prevErrors) => ({
                ...prevErrors,
                confirmnewpassword: 'Confirm password does not match new password',
            }));
            isValid = false;
        }
    }


    // Validate username if changed
    if (!formData.username.trim()) {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            username: 'Username is required',
        }));
        isValid = false;
    }

    // Validate first name if changed
    if (!formData.firstname.trim()) {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            firstname: 'First Name is required',
        }));
        isValid = false;
    }

    // Validate last name if changed
    if (!formData.lastname.trim()) {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            lastname: 'Last Name is required',
        }));
        isValid = false;
    }


    return isValid;
}

