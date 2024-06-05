const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

export const validateVendorForm = (formData, setErrorMessages, isAdmin) => {
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

    if (!formData.phonenumber.trim() && isAdmin) {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            phonenumber: 'Phone Number is required',
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

    if (!formData.phonenumber.trim()) {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            phonenumber: 'Phone number is required',
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

export const validateReviewForm = (formData, setErrorMessages) => {
    let isValid = true;

    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            rating: 'Rating must be between 1 and 5',
        }));
        isValid = false;
    }

    if (!formData.comment.trim()) {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            comment: 'Comment is required',
        }));
        isValid = false;
    }

    return isValid;
};


export const validateCreateProductForm = (formData, setErrorMessages, isUpdateAuction) => {
    let isValid = true;
    const newErrorMessages = {};

    if (!formData.name.trim()) {
        newErrorMessages.name = 'Product name is required';
        isValid = false;
    }

    if (!formData.shortDescription.trim()) {
        newErrorMessages.shortDescription = 'Short description is required';
        isValid = false;
    }

    if (!formData.description.trim()) {
        newErrorMessages.description = 'Description is required';
        isValid = false;
    }

    if (!formData.categoryId) {
        newErrorMessages.categoryId = 'Category is required';
        isValid = false;
    }

    if (!formData.condition) {
        newErrorMessages.condition = 'Condition is required';
        isValid = false;
    }

    if (!formData.minimumBid.trim()) {
        newErrorMessages.minimumBid = 'Minimum bid price is required';
        isValid = false;
    } else if (Number(formData.minimumBid) < 0) {
        newErrorMessages.minimumBid = 'Minimum bid price cannot be negative';
        isValid = false;
    }

    if (!formData.biddingTimeLimit) {
        newErrorMessages.biddingTimeLimit = 'Bidding time limit is required';
        isValid = false;
    }

    if (!formData.productImage && !isUpdateAuction) {
        newErrorMessages.productImage = 'Product image is required';
        isValid = false;
    }

    setErrorMessages(newErrorMessages);
    return isValid;
};



export const validateUpdateShippingAddressForm = (formData, setErrorMessages) => {
    let isValid = true;

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

    if (!formData.country.trim()) {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            country: 'Country is required',
        }));
        isValid = false;
    }

    if (!formData.state.trim()) {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            state: 'State is required',
        }));
        isValid = false;
    }

    if (!formData.city.trim()) {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            city: 'City is required',
        }));
        isValid = false;
    }

    if (!formData.streetAddress.trim()) {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            streetAddress: 'Street Address is required',
        }));
        isValid = false;
    }

    return isValid;
};