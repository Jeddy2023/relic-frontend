import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { ActionIcon, Table, Flex, Menu, Pagination, rem, px, TextInput, Select, Button, Modal, Textarea } from "@mantine/core";
import { GrMoreVertical, GrSearch } from "react-icons/gr";
import { LuBadgeX, LuBadgeCheck } from "react-icons/lu";
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../../components/ui/Loader/Loader';
import { DateTimePicker } from '@mantine/dates';
import { format } from 'date-fns';
import { useDisclosure } from '@mantine/hooks';
import { validateVendorForm } from '../../../components/common/Validations';
import { MdOutlineAlternateEmail, MdLockOutline, MdOutlinePerson, MdOutlinePhone } from "react-icons/md";
import { FcShop } from "react-icons/fc";
import Input from '../../../components/common/Input/Input';
import ConfirmationModal from '../../../UserDashboard/components/ConfirmationModal';
import { UserContext } from '../../../context/userContext';

function AdminUsers() {
    const [opened, { open, close }] = useDisclosure(false);
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState(null);
    const [status, setStatus] = useState('Default');
    const [isVerified, setIsVerified] = useState(null)
    const [isBlocked, setIsBlocked] = useState(null)
    const [role, setRole] = useState('Default');
    const [keyword, setKeyword] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [fetchTrigger, setFetchTrigger] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [suspendModalOpen, setSuspendModalOpen] = useState(false);
    const [suspendModalEndDate, setSuspendModalEndDate] = useState('');
    const [suspendModalEndDateError, setSuspendModalEndDateError] = useState('');
    const [messageModalOpen, setMessageModalOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const { accessToken } = useContext(UserContext);

    const [registrationFormData, setRegistrationFormData] = useState({
        email: '',
        password: '',
        username: '',
        firstname: '',
        lastname: '',
        shopname: '',
        phonenumber: '',
        role: 'SELLER'
    });
    const [errorMessages, setErrorMessages] = useState({
        email: '',
        password: '',
        username: '',
        firstname: '',
        lastname: '',
        shopname: '',
        phonenumber: ''
    });

    const formRef = useRef(null);

    const formattedStartDate = startDate ? format(startDate, "yyyy-MM-dd HH:mm:ss.SS") : null;
    const formattedEndDate = endDate ? format(endDate, "yyyy-MM-dd HH:mm:ss.SS") : null;

    const buildQueryString = () => {
        const params = {
            isVerified: isVerified,
            isBlocked: isBlocked,
            role: role === 'Default' ? null : role,
            keyword,
            startDateStr: formattedStartDate,
            endDateStr: formattedEndDate,
            page,
            size
        };

        const filteredParams = Object.fromEntries(
            Object.entries(params).filter(([key, value]) => value !== null)
        );

        const queryString = Object.entries(filteredParams)
            .filter(([key, value]) => value !== '')
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        return queryString ? `?${queryString}` : '';
    };

    const getUsers = async () => {
        setLoading(true);
        try {
            const url = `http://localhost:8080/api/v1/admin/users${buildQueryString()}`;
            console.log(url)
            const response = await axios.get(url);
            setUsers(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while fetching users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (fetchTrigger) {
            getUsers();
            setFetchTrigger(false);
        } else {
            getUsers();
        }
    }, [status, role, keyword, startDate, endDate, page, size, fetchTrigger]);

    const handlePageChange = (newPage) => {
        setPage(newPage - 1);
    };

    const getStatusStyle = (verified, blocked) => {
        if (blocked) {
            return { color: 'rgb(148, 0, 0)', fontWeight: "bold", fontSize: '12px' };
        } else if (verified) {
            return { color: 'rgb(0, 124, 0)', fontWeight: "bold", fontSize: '12px' };
        } else {
            return { color: 'rgb(201, 201, 0)', fontWeight: "bold", fontSize: '12px' };
        }
    };

    const handleMenuItemClick = (action, userId) => {
        setUserId(userId);
        setConfirmAction(action);
        setConfirmOpen(true);
    };

    const rows = users.map(({ id, firstname, lastname, email, username, shopname, phonenumber, role, createdAt, verified, blocked }) => (
        <Table.Tr key={id}>
            <Table.Td className='name'>{`${firstname} ${lastname}`}</Table.Td>
            <Table.Td className='email'>{email}</Table.Td>
            <Table.Td className='username'>{username}</Table.Td>
            <Table.Td className='shopname'>{shopname}</Table.Td>
            <Table.Td className='phone'>{phonenumber || 'N/A'}</Table.Td>
            <Table.Td className='role'>{role}</Table.Td>
            <Table.Td className='createdAt'>{new Date(createdAt).toLocaleDateString()}</Table.Td>
            <Table.Td className='status' style={getStatusStyle(verified, blocked)}>
                {blocked ? 'Blocked' : verified ? 'Verified' : 'Pending'}
            </Table.Td>
            <Table.Td>
                <Menu width={200} position="bottom-end" shadow="md">
                    <Menu.Target>
                        <ActionIcon size={22} variant='light' color='black'>
                            <GrMoreVertical />
                        </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Label>Manage User</Menu.Label>
                        <Menu.Item leftSection={<LuBadgeX style={{ width: rem(14), height: rem(14) }} />} onClick={() => handleMenuItemClick(blocked ? 'UnBlock' : 'Block', id)}>
                            {blocked ? 'UnBlock' : 'Block'}
                        </Menu.Item>
                        {!blocked && <Menu.Item leftSection={<LuBadgeX style={{ width: rem(14), height: rem(14) }} />} onClick={() => {
                            setSuspendModalOpen(true)
                            setUserId(id)
                        }}>
                            Suspend User
                        </Menu.Item>}
                        {role != 'ADMIN' && <Menu.Item leftSection={<LuBadgeX style={{ width: rem(14), height: rem(14) }} />} onClick={() => handleMenuItemClick('Make Admin', id)}>
                            Make an Admin
                        </Menu.Item>}
                        {role != 'ADMIN' && <Menu.Item leftSection={<LuBadgeX style={{ width: rem(14), height: rem(14) }} />} onClick={() => {
                            setMessageModalOpen(true);
                            setUserId(id);
                        }}>
                            Send Message
                        </Menu.Item>}
                        <Menu.Item leftSection={<LuBadgeX style={{ width: rem(14), height: rem(14) }} />}>
                            User Activities
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Table.Td>
        </Table.Tr>
    ));

    const handleSortChange = (value) => {
        setRole(value);
        if (value == 'Default') {
            setRole(null)
        }
    };

    const handleCloseModal = () => {
        close();
        setErrorMessages({
            email: '',
            password: '',
            username: '',
            firstname: '',
            lastname: '',
            shopname: '',
            phonenumber: '',
            role: 'SELLER'
        });
        setRegistrationFormData({
            email: '',
            password: '',
            username: '',
            firstname: '',
            lastname: '',
            shopname: '',
            phonenumber: ''
        });
    };

    const handleRegisterUser = async (event) => {
        event.preventDefault();

        if (!validateVendorForm(registrationFormData, setErrorMessages, true)) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/register/vendor', registrationFormData);
            toast.success('User registered successfully');
            setFetchTrigger(true);
            getUsers();
            handleCloseModal();
        } catch (error) {
            console.log(error);
            toast.error('An error occurred while registering the user');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRegistrationFormData((prevRegistrationFormData) => ({
            ...prevRegistrationFormData,
            [name]: value,
        }));
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const handleConfirmUserSuspension = () => {
        if (!suspendModalEndDate) {
            setSuspendModalEndDateError('Time Limit is needed')
        } else {
            setSuspendModalOpen(false)
            handleMenuItemClick('Suspend', userId)
        }
    };

    const handleConfirmAction = async () => {
        const API_BASE_URL = 'http://localhost:8080/api/v1/admin';

        const api = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (confirmAction && userId) {
            try {
                let response;
                switch (confirmAction) {
                    case 'Suspend':
                        const formattedSuspendEndDate = new Date(suspendModalEndDate).toISOString().replace('T', ' ').split('.')[0];
                        response = await api.post(`/users/suspend`, { userId, endDate: formattedSuspendEndDate });
                        break;
                    case 'Block':
                        response = await api.put(`/users/${userId}/block`);
                        break;
                    case 'UnBlock':
                        response = await api.put(`/users/${userId}/unblock`);
                        break;
                    case 'Make Admin':
                        console.log('admin')
                        response = await api.put(`/users/${userId}/make-admin`);
                        break;
                    default:
                        break;
                }
                toast.success(response?.data);
                getUsers();
                setFetchTrigger(true);
            } catch (error) {
                console.error(`Error during ${confirmAction}:`, error);
                toast.error(error?.response?.data?.message);
            } finally {
                setConfirmOpen(false);
            }
        }
    };

    const sendNotification = async () => {
        if (!message.trim()) {
            return;
        }
        setIsSendingMessage(true);
        try {
            const url = `http://localhost:8080/api/v1/notifications/send`;
            await axios.post(url, { userId,message }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            toast.success("Message sent successfully");
            setMessageModalOpen(false);
            setMessage('');
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while sending the message");
        } finally {
            setIsSendingMessage(false);
        }
    };

    const handleCloseMessageModal = () => {
        setMessage('');
        setMessageModalOpen(false);
    };

    return (
        <div className='admindashboard-users page'>
            <Toaster />
            <div className="page_bar">
                <h2>Users</h2>
                <div className="right">
                    <TextInput
                        leftSection={<GrSearch />}
                        size="md"
                        placeholder="Full name, username, email or store name"
                        style={{ width: px(500) }}
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
            </div>
            {loading ? <Loader /> : <>
                <div className="page_content" style={{ alignItems: 'center' }}>
                    <Flex align="center" justify={'flex-end'} gap={20}>
                        <Select
                            data={['Default', 'Verified', 'Pending', 'Blocked']}
                            value={status}
                            onChange={(value) => {
                                setStatus(value)
                                if (value == 'Default') {
                                    setIsBlocked(null)
                                    setIsVerified(null)
                                }
                                if (value == 'Verified') {
                                    setIsVerified(true)
                                }

                                if (value == 'Pending') {
                                    setIsVerified(false)
                                }

                                if (value == 'Blocked') {
                                    setIsVerified(true)
                                }
                            }}
                            placeholder="Filter by Status"
                            style={{ width: rem(180) }}
                        />
                        <Select
                            data={['Default', 'ADMIN', 'SELLER', 'BUYER']}
                            value={role}
                            onChange={handleSortChange}
                            allowDeselect={false}
                            checkIconPosition="right"
                            style={{ width: rem(180) }}
                        />
                        <DateTimePicker
                            placeholder="Start Date"
                            value={startDate}
                            onChange={(date) => setStartDate(date)}
                            clearable
                            style={{ width: rem(180) }}
                        />
                        <DateTimePicker
                            placeholder="End Date"
                            value={endDate}
                            onChange={(date) => setEndDate(date)}
                            clearable
                            style={{ width: rem(180) }}
                        />
                        <Button color='#32c36c97' size='compact-sm' ff={'"Saira", sans-serif'} onClick={open}>Register New User</Button>
                    </Flex>
                </div>
                <div className="page_content">
                    <div className="table-content">
                        {loading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                                <Loader />
                            </div>
                        ) : users.length === 0 ? (
                            <p style={{ textAlign: 'center', marginTop: '30px', marginBottom: '30px' }}>No Users Found</p>
                        ) : (
                            <>
                                <Table className='mantine-table' horizontalSpacing={'xl'}>
                                    <Table.Tr>
                                        <Table.Th>Full Name</Table.Th>
                                        <Table.Th>Email</Table.Th>
                                        <Table.Th>Username</Table.Th>
                                        <Table.Th>Shop Name</Table.Th>
                                        <Table.Th>Phone</Table.Th>
                                        <Table.Th>Role</Table.Th>
                                        <Table.Th>Registration</Table.Th>
                                        <Table.Th>Status</Table.Th>
                                        <Table.Th></Table.Th>
                                    </Table.Tr>
                                    <Table.Tbody>{rows}</Table.Tbody>
                                </Table>
                                <Pagination
                                    radius={3}
                                    color="#32c36c"
                                    size={"xs"}
                                    total={totalPages}
                                    value={page + 1}
                                    onChange={handlePageChange}
                                />
                            </>
                        )}
                    </div>
                </div>
                <Modal opened={opened} onClose={handleCloseModal} title={'Register User'} centered ff={'"Saira", sans-serif'}>
                    <form ref={formRef} onSubmit={handleRegisterUser}>
                        <Flex gap={10} direction={'column'}>
                            <Input
                                label="Email"
                                placeholder="Enter your email"
                                name="email"
                                value={registrationFormData.email}
                                onChange={handleChange}
                                error={errorMessages.email}
                                type={"email"}
                                Icon={MdOutlineAlternateEmail}
                            />
                            <Input
                                label="Password"
                                placeholder="Enter your password"
                                name="password"
                                value={registrationFormData.password}
                                onChange={handleChange}
                                error={errorMessages.password}
                                type="password"
                                Icon={MdLockOutline}
                            />
                            <Input
                                label="Username"
                                placeholder="Enter your username"
                                name="username"
                                value={registrationFormData.username}
                                onChange={handleChange}
                                error={errorMessages.username}
                                type={"text"}
                                Icon={MdOutlinePerson}
                            />
                            <Input
                                label="First Name"
                                placeholder="Enter your firstname"
                                name="firstname"
                                value={registrationFormData.firstname}
                                onChange={handleChange}
                                error={errorMessages.firstname}
                                type={"text"}
                                Icon={MdOutlinePerson}
                            />
                            <Input
                                label="Last Name"
                                placeholder="Enter your lastname"
                                name="lastname"
                                value={registrationFormData.lastname}
                                onChange={handleChange}
                                error={errorMessages.lastname}
                                type={"text"}
                                Icon={MdOutlinePerson}
                            />
                            <Input
                                label="Shop Name"
                                placeholder="Enter your shopname"
                                name="shopname"
                                value={registrationFormData.shopname}
                                onChange={handleChange}
                                error={errorMessages.shopname}
                                type={"text"}
                                Icon={FcShop}
                            />

                            <Input
                                label="Phonenumber"
                                placeholder="Enter your phone number"
                                name="phonenumber"
                                value={registrationFormData.phonenumber}
                                onChange={handleChange}
                                error={errorMessages.phonenumber}
                                type={"phone"}
                                Icon={MdOutlinePhone}
                            />

                            <Button type="submit" size="md" color="#32c36c" mt={10} loading={isLoading}>
                                Register
                            </Button>
                        </Flex>
                    </form>
                </Modal>
                <Modal opened={suspendModalOpen} onClose={() => setSuspendModalOpen(false)} title={'Suspend User'} centered ff={'"Saira", sans-serif'}>
                    <DateTimePicker
                        label="Suspension Time Limit"
                        error={suspendModalEndDateError}
                        value={suspendModalEndDate}
                        onChange={(value) => setSuspendModalEndDate(value)}
                    />
                    <Button size="md" color="#32c36c" mt={10} onClick={handleConfirmUserSuspension}>Suspend</Button>
                </Modal>
                <Modal
                    opened={messageModalOpen}
                    onClose={handleCloseMessageModal}
                    title="Send Message"
                    centered
                >
                    <Textarea
                        placeholder="Type your message here"
                        label="Message"
                        value={message}
                        onChange={(event) => setMessage(event.currentTarget.value)}
                        error={!message.trim() && "Please input a message"}
                    />
                    <Button fullWidth mt="md" onClick={sendNotification} loading={isSendingMessage} color="#32c36c">
                        Send
                    </Button>
                </Modal>
                <ConfirmationModal
                    opened={confirmOpen}
                    onClose={() => setConfirmOpen(false)}
                    title="Confirm Action"
                    onConfirm={handleConfirmAction}
                    message={`Are you sure you want to ${confirmAction} this user?`}
                />
            </>}
        </div>
    );
}

export default AdminUsers;
