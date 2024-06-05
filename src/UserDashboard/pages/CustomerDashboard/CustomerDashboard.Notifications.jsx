import React, { useContext, useEffect, useState } from 'react'
import './customerdashboard.css'
import NoAuctions from '../../../assets/images/empty-animate.svg'
import Notification from '../../../components/common/Notification/Notification';
import { Pagination, Select, Button, Flex, Text, Group, Modal } from '@mantine/core';
import { UserContext } from '../../../context/userContext';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Loader from '../../../components/ui/Loader/Loader';
import { DateTimePicker } from '@mantine/dates';
import { format } from 'date-fns';

function CustomerDashboardNotifications() {
    const [sortBy, setSortBy] = useState('Date Descending');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isRead, setIsRead] = useState(null);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const { accessToken } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [notifications, setNotifications] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [fetchTrigger, setFetchTrigger] = useState(true);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [modalValue, setModalValue] = useState('');

    const formattedStartDate = startDate ? format(startDate, "yyyy-MM-dd HH:mm:ss.SS") : null;
    const formattedEndDate = endDate ? format(endDate, "yyyy-MM-dd HH:mm:ss.SS") : null;

    const buildQueryString = () => {
        const params = {
            isRead: isRead,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            sortBy: sortBy,
            page: page,
            size: pageSize
        };

        const queryString = Object.entries(params)
            .filter(([key, value]) => value !== null && value !== '')
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        return queryString ? `?${queryString}` : '';
    };

    const getNotifications = async () => {
        try {
            const url = `http://localhost:8080/api/v1/notifications${buildQueryString()}`;
            if (accessToken) {
                const response = await axios.get(url, { headers: { Authorization: `Bearer ${accessToken}` } });
                setNotifications(response?.data?.content);
                setTotalPages(response?.data?.totalPages);
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while getting auctions");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (fetchTrigger && accessToken) {
            getNotifications();
            setFetchTrigger(false);
        } else {
            setIsLoading(true);
            getNotifications();
        }
    }, [isRead, startDate, endDate, sortBy, page, accessToken]);

    const handleSortChange = (value) => {
        setSortBy(value);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage - 1);
    };

    if (isLoading) {
        return <Loader />
    }

    const markAllAsRead = async () => {
        try {
            await axios.patch(`http://localhost:8080/api/v1/notifications/mark-all-as-read`, {}, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            toast.success("All notifications marked as read");
            setFetchTrigger(true);
            getNotifications();
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while marking all notifications as read");
        }
    };

    const deleteAllNotifications = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/notifications/delete-all`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            toast.success("All notifications deleted successfully");
            setFetchTrigger(true);
            getNotifications();
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while deleting all notifications");
        }
    };

    const clearFunction = () => {
        setSortBy('Date Descending');
        setStartDate(null);
        setEndDate(null);
        setIsRead(null);
    };

    const handleModalClick = () => {
        setConfirmOpen(true);
    };

    const handleConfirmModalFunction = () => {
        if (modalValue == 'delete') {
            deleteAllNotifications();
            setConfirmOpen(false);
        } else {
            markAllAsRead();
            setConfirmOpen(false);
        }
    };

    const handleCancelModalFunction = () => {
        setConfirmOpen(false);
    };

    return (
        <div className="customer_notifications">
            <Toaster />
            <div className="customer_notifications-top">
                <Flex gap={10} className='customer_notifications-top-functions' miw='60%'>
                    <Text color="blue" size="sm" onClick={() => {
                        setModalValue('mark');
                        handleModalClick()
                    }}>(Mark All as Read)</Text>
                    <Text color="red" size="sm" onClick={() => {
                        setModalValue('delete');
                        handleModalClick()
                    }}>(Delete All)</Text>
                    <Text color="#32c36c" size="sm" onClick={() => {
                        setIsRead(true)
                        fetchTrigger(true)
                    }
                    }>(Read)</Text>
                    <Text color="red" size="sm" onClick={() => {
                        setIsRead(false)
                        fetchTrigger(true)
                    }
                    }>(Unread)</Text>
                    <Button onClick={clearFunction} color="#32c36c" size='compact-sm' variant='light'>Clear</Button>
                </Flex>

                <div >
                    <Select
                        data={['Date Ascending', 'Date Descending']}
                        value={sortBy}
                        onChange={handleSortChange}
                        allowDeselect={false}
                        checkIconPosition="right"
                        size='md'
                    />
                    <Flex justify={'space-between'} gap={10}>
                        <DateTimePicker
                            label="Start Date"
                            placeholder="Pick start date"
                            value={startDate}
                            onChange={setStartDate}
                            clearable
                            size='sm'
                        />
                        <DateTimePicker
                            label="End Date"
                            placeholder="Pick end date"
                            value={endDate}
                            onChange={setEndDate}
                            clearable
                        />
                    </Flex>
                </div>
            </div>
            <div className="customer_notifications-bottom">
                {notifications.length >= 1 ?
                    <>
                        <ul className="notification-list">
                            {notifications.map((notification) => <Notification key={notification.id} notification={notification} isDashboard={true} getNotifications={getNotifications} />)}
                        </ul>
                        <Pagination total={totalPages} mt={30}
                            color='#32c36c'
                            onChange={handlePageChange}
                            value={page + 1} />
                    </> :
                    <div className='no-notifications-card'>
                        <img src={NoAuctions} alt="" style={{ width: "300px" }} />
                        <h1>No Notifications Yet</h1>
                    </div>
                }
            </div>

            <Modal
                opened={confirmOpen}
                onClose={handleModalClick}
                title="Mark all as read"
                centered
                ff={'"Saira", sans-serif'}
            >
                <Text >Are you sure you want to {modalValue == 'delete' ? 'delete all notifications' : 'mark all notifications as read'}?</Text>
                <Flex gap={10} justify={'center'} mt={12}>
                    <Button variant="outline" color="#32c36c" onClick={handleCancelModalFunction}>No</Button>
                    <Button color="#32c36c" onClick={handleConfirmModalFunction}>Yes</Button>
                </Flex>
            </Modal>
        </div>
    )
}

export default CustomerDashboardNotifications
