import { useState } from 'react';
import { Link } from "react-router-dom";
import { Checkbox, Button, Group, Modal, PinInput } from "@mantine/core";
import './termofuse.css'
import toast, { Toaster } from 'react-hot-toast';
import { useDisclosure } from '@mantine/hooks';
import { IoMailUnreadOutline } from "react-icons/io5";


function TermsOfUse({ prevStep, nextStep }) {
    const [isChecked, setIsChecked] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const [pin, setPin] = useState('');

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            toast.success('Request sent successfully');
            setPin('');
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An error occurred. Please try again later.');
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
                    <Button onClick={() => {
                        if (isChecked) {
                            open()
                        } else {
                            toast.error('You have not accepted our Terms Of Use, Check the Checkbox.')
                        }
                    }} color='#32c36c'>Next</Button>
                </Group>
            </div>

            <Modal opened={opened} onClose={close} centered>
                <div className="otp-modal">
                    <IoMailUnreadOutline color='#32c36c' size={50} />
                    <p>
                        Please enter the code sent to{" "}
                        <span style={{ color: '#32c36c' }}> Users Email</span>
                    </p>
                    <form onSubmit={handleSubmit}>
                        <PinInput
                            oneTimeCode
                            length={6}
                            value={pin}
                            onChange={(value) => setPin(value)}
                        />
                        <Button type='submit' color='#32c36c' variant="light" mt={10}>Verify Email</Button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default TermsOfUse;
