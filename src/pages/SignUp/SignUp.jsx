import React, { useEffect, useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';
import './signup.css'
import toast, { Toaster } from 'react-hot-toast';
import signupImg from '../../assets/images/hero-banner-1.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import CustomerForm from '../../components/common/Forms/SignupForm/CustomerForm';
import VendorForm from '../../components/common/Forms/SignupForm/VendorForm';
import TermsOfUse from '../../components/common/TermsOfUse/TermsOfUse';
import Confetti from 'react-confetti';

function SignUp() {
    const [userType, setUserType] = useState(null);
    const [transparentButton, setTransparentButton] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const navigate = useNavigate();
    const handleUserTypeSelect = (type) => {
        setUserType(type);
    };

    const handleButtonClick = (buttonName) => {
        if (transparentButton === buttonName) {
            setTransparentButton(null);
        } else {
            setTransparentButton(buttonName);
        }
    };

    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (
        current < 3 ? current + 1 : current
    ));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    useEffect(() => {
        if (active === 3) {
            setShowConfetti(true);
            const timer = setTimeout(() => {
                setShowConfetti(false);
            }, 8000);

            return () => clearTimeout(timer);
        }
    }, [active]);

    return (
        <>
            {showConfetti && <Confetti />}
            <div className="signup_container container">
                <Toaster />
                <div className="signup_container-forms">
                    <Link
                        to={"/"}
                        className="signup-home-link"
                    >
                        <IoIosArrowBack />
                        Back home
                    </Link>
                    <Stepper color='#32c36c' active={active} onStepClick={setActive} allowNextStepsSelect={false}>
                        <Stepper.Step label="First step" description="Select user account">
                            <div>
                                <h2 style={{ marginTop: '20px' }}>What Do You Want To Be</h2>
                                <div className='signup-usertype'>
                                    <Button
                                        color='#32c36c'
                                        className={transparentButton === 'customer' ? 'transparent-button' : ''}
                                        onClick={() => {
                                            handleUserTypeSelect('customer')
                                            handleButtonClick('customer');
                                        }} fullWidth>
                                        A Customer
                                    </Button>
                                    <Button
                                        color='#32c36c'
                                        className={transparentButton === 'vendor' ? 'transparent-button' : ''}
                                        onClick={() => {
                                            handleUserTypeSelect('vendor')
                                            handleButtonClick('vendor');
                                        }} fullWidth>
                                        A Vendor
                                    </Button>
                                </div>
                            </div>
                            <Group justify="center" mt="xl" mb="xl">
                                <Button onClick={() => {
                                    if (userType === null) {
                                        toast.error('Please select the type of user you want to be')
                                        return
                                    }
                                    nextStep()
                                }} color='#32c36c'>Next</Button>
                            </Group>
                        </Stepper.Step>
                        <Stepper.Step label="Second step" description="Create an Account">
                            {userType === 'customer' ? <CustomerForm prevStep={prevStep} nextStep={nextStep} /> : <VendorForm prevStep={prevStep} nextStep={nextStep} />}
                        </Stepper.Step>
                        <Stepper.Step label="Final step" description="Terms of Use">
                            <TermsOfUse prevStep={prevStep} nextStep={nextStep} />
                        </Stepper.Step>
                        <Stepper.Completed>
                            <div className="completion-message">
                                <h2>Congratulations! You've successfully completed the sign-up process.</h2>
                                <p>Please go back to the homepage to log in and start using your account.</p>
                                <Button color='#32c36c' onClick={() => navigate('/')}>Go back to home</Button>
                            </div>
                        </Stepper.Completed>
                    </Stepper>

                    <div className='login-link'>
                        <span>
                            Already have an account ?
                            <Link
                                to={"/login"} style={{ color: '#32c36c', marginLeft: '5px' }}
                            >
                                Sign in
                            </Link>
                        </span>
                    </div>
                </div>
                <div className='signup_container-image'>
                    <img src='https://plus.unsplash.com/premium_photo-1658506826316-f21670ec809e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JlZW4lMjBhdWN0aW9ufGVufDB8fDB8fHww' />
                </div>
            </div>
        </>
    )
}

export default SignUp
