// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from "react-router-dom";
// import { Checkbox, Button, Group, Modal, PinInput, Text } from "@mantine/core";
// import './termofuse.css';
// import toast, { Toaster } from 'react-hot-toast';
// import { useDisclosure } from '@mantine/hooks';
// import { IoMailUnreadOutline } from "react-icons/io5";
// import axios from 'axios';
// import Cookies from 'js-cookie';

// function TermsOfUse({ prevStep, nextStep }) {
//     const [isChecked, setIsChecked] = useState(false);
//     const [opened, { open, close }] = useDisclosure(false);
//     const [pin, setPin] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [otpError, setOtpError] = useState('');
//     const [countdown, setCountdown] = useState(1200);
//     const navigate = useNavigate();

//     useEffect(() => {
//         let timer;
//         if (countdown > 0) {
//             timer = setInterval(() => setCountdown(countdown - 1), 1000);
//         }
//         return () => clearInterval(timer);
//     }, [countdown]);

//     const handleCheckboxChange = (event) => {
//         setIsChecked(event.target.checked);
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!pin || pin.length !== 6) {
//             setOtpError('OTP must be 6 characters long.');
//             return;
//         }

//         setLoading(true);

//         try {
//             const verificationToken = Cookies.get('verificationToken');
//             if (!verificationToken) {
//                 throw new Error('Verification token is missing.');
//             }

//             const response = await axios.post(`http://localhost:8080/api/v1/auth/verify-email`, {
//                 otp: pin,
//                 verificationToken
//             });

//             if (response.status === 200) {
//                 toast.success(response.data.message);
//                 setPin('');
//                 nextStep();
//             }
//         } catch (error) {
//             console.error('Error submitting form:', error);
//             toast.error(error.response?.data?.message || 'An error occurred. Please try again later.');
//             setOtpError('Incorrect Otp.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSubmit = () => {
//         nextStep()
//     }

//     const handleResendOtp = async () => {
//         try {
//             const verificationToken = Cookies.get('verificationToken');
//             if (!verificationToken) {
//                 throw new Error('Verification token is missing.');
//             }

//             const response = await axios.post(`http://localhost:8080/api/v1/auth/resend-otp`, verificationToken);
//             if (response.status === 200) {
//                 toast.success('OTP resent successfully.');
//                 setCountdown(1200);
//             }
//         } catch (error) {
//             console.error('Error resending OTP:', error);
//             toast.error(error.response?.data?.message || 'An error occurred. Please try again later.');
//         }
//     };

//     const handlePinChange = (value) => {
//         setPin(value);
//         if (otpError) {
//             setOtpError('');
//         }
//     };

//     const formatTime = (seconds) => {
//         const minutes = Math.floor(seconds / 60);
//         const secs = seconds % 60;
//         return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
//     };

//     return (
//         <div className="termofuse-container">
//             <Toaster />
//             <header className="termofuse-header">
//                 <h1>Terms of use</h1>
//                 <p>Welcome to Relic</p>
//             </header>
//             <article className="termofuse-article">
//                 Please read these{" "}
//                 <Link to={"#"}>Terms</Link>{" "}
//                 carefully before using the Product. By using the Product, you agree to
//                 be bound by these{" "}
//                 <Link to={"#"}>Terms</Link>{" "}
//                 and our{" "}
//                 <Link to={"#"}>Privacy Policy</Link>
//                 , which is incorporated into these Terms by reference. If you do not
//                 agree to these Terms, you may not use the Product.
//             </article>
//             <Checkbox
//                 label="I agree to these terms"
//                 className="termofuse-checkbox"
//                 color="#32c36c"
//                 checked={isChecked}
//                 onChange={handleCheckboxChange}
//             />

//             <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2.5rem' }}>
//                 <Group justify="center" mb="xl">
//                     <Button onClick={prevStep} color='#32c36c' variant="light">Back</Button>
//                     <Button onClick={() => {
//                         if (isChecked) {
//                             open();
//                         } else {
//                             toast.error('You have not accepted our Terms Of Use, Check the Checkbox.');
//                         }
//                     }} color='#32c36c'>Next</Button>
//                 </Group>
//             </div>

//             <Modal opened={opened} onClose={close} centered>
//                 <div className="otp-modal">
//                     <IoMailUnreadOutline color='#32c36c' size={50} />
//                     <p>
//                         Please enter the code sent to{" "}
//                         <span style={{ color: '#32c36c' }}> User's Email</span>
//                     </p>
//                     <form onSubmit={handleSubmit}>
//                         <PinInput
//                             oneTimeCode
//                             length={6}
//                             value={pin}
//                             onChange={handlePinChange}
//                             error={otpError}
//                         />
//                         {otpError && <Text color="red" size="sm">{otpError}</Text>}
//                         <Button type='submit' color='#32c36c' variant="light" mt={10} mb={22} loading={loading}>
//                             Verify Email
//                         </Button>
//                     </form>
//                     {countdown > 0 ? (
//                         <Text size="sm">Resend OTP in {formatTime(countdown)}</Text>
//                     ) : (
//                         <Button color='#32c36c' variant="light" mt={10} mb={22}>
//                             Resend OTP
//                         </Button>
//                     )}
//                 </div>
//             </Modal>
//         </div>
//     );
// }

// export default TermsOfUse;










import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, Button, Group, Modal, PinInput, Text } from "@mantine/core";
import './termofuse.css';
import toast, { Toaster } from 'react-hot-toast';
import { useDisclosure } from '@mantine/hooks';
import { IoMailUnreadOutline } from "react-icons/io5";
import axios from 'axios';
import Cookies from 'js-cookie';

function TermsOfUse({ prevStep, nextStep }) {
    const [isChecked, setIsChecked] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const [pin, setPin] = useState('');
    const [loading, setLoading] = useState(false);
    const [otpError, setOtpError] = useState('');
    const [countdown, setCountdown] = useState(0);
    const navigate = useNavigate();
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);

    const startCountdown = () => {
        setCountdown(30);
    };

    const handleResendOtp = async () => {
        setResendLoading(true);
        try {
            const verificationToken = Cookies.get('verificationToken');
            if (!verificationToken) {
                throw new Error('Verification token is missing.');
            }

            const response = await axios.post(`http://localhost:8080/api/v1/auth/resend-otp`, verificationToken);
            if (response.status === 200) {
                toast.success('OTP resent successfully.');
                startCountdown();
            }
        } catch (error) {
            console.error('Error resending OTP:', error);
            toast.error('Failed to resend OTP.');
        } finally {
            setResendLoading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!pin || pin.length !== 6) {
            setOtpError('OTP must be 6 characters long.');
            return;
        }

        setVerifyLoading(true);

        try {
            const verificationToken = Cookies.get('verificationToken');
            if (!verificationToken) {
                throw new Error('Verification token is missing.');
            }

            const response = await axios.post(`http://localhost:8080/api/v1/auth/verify-email`, {
                otp: pin,
                verificationToken
            });

            if (response.status === 200) {
                setPin('');
                Cookies.remove('verificationToken');
                nextStep();
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An error occurred. Please try again later.');
            setOtpError('Incorrect Otp.');
        } finally {
            setVerifyLoading(false);
        }
    };

    useEffect(() => {
        if (opened && countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown, opened]);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handlePinChange = (value) => {
        setPin(value);
        if (otpError) {
            setOtpError('');
        }
    };

    return (
        <div className="termofuse-container">
            <Toaster />
            <header className="termofuse-header">
                <h1>Terms of use</h1>
                <p>Welcome to Relic</p>
            </header>
            <article className="termofuse-article">
                Please read these{" "}
                <Link to={"#"}>Terms</Link>{" "}
                carefully before using the Product. By using the Product, you agree to
                be bound by these{" "}
                <Link to={"#"}>Terms</Link>{" "}
                and our{" "}
                <Link to={"#"}>Privacy Policy</Link>
                , which is incorporated into these Terms by reference. If you do not
                agree to these Terms, you may not use the Product.
            </article>
            <Checkbox
                label="I agree to these terms"
                className="termofuse-checkbox"
                color="#32c36c"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2.5rem' }}>
                <Group justify="center" mb="xl">
                    <Button onClick={prevStep} color='#32c36c' variant="light">Back</Button>
                    <Button loading={verifyLoading} onClick={() => {
                        if (isChecked) {
                            open();
                            startCountdown();
                        } else {
                            toast.error('You have not accepted our Terms Of Use, Check the Checkbox.');
                        }
                    }} color='#32c36c'>Next</Button>
                </Group>
            </div>

            <Modal opened={opened} onClose={close} centered title="Enter OTP">
                <div className="otp-modal">
                    <IoMailUnreadOutline color='#32c36c' size={50} />
                    <p>
                        Please enter the code sent to your email
                        <span style={{ color: '#32c36c' }}> User's Email</span>
                    </p>
                    <form onSubmit={handleSubmit}>
                        <PinInput
                            oneTimeCode
                            length={6}
                            value={pin}
                            onChange={handlePinChange}
                            error={otpError}
                        />
                        {otpError && <Text color="red" size="sm">{otpError}</Text>}
                        <Button type='submit' color='#32c36c' variant="light" mt={10} mb={5} loading={loading}>
                            Verify Email
                        </Button>
                    </form>
                    {countdown > 0 ? (
                        <Text size="sm">Resend OTP {countdown > 0 && `(${countdown}s)`}</Text>
                    ) : (
                        <Button color='#32c36c' variant="light" mt={5} mb={22} size='compact-sm' onClick={handleResendOtp} loading={resendLoading}>
                            Resend OTP
                        </Button>
                    )}
                </div>
            </Modal>
        </div>
    );
}

export default TermsOfUse;

