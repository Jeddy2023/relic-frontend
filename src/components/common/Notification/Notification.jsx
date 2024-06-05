// import React, { useContext, useState } from 'react';
// import './notification.css';
// import { IoMdTime } from "react-icons/io";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { UserContext } from '../../../context/userContext';
// import axios from 'axios';

// function Notification({ notification, isDashboard }) {
//     const {accessToken} = useContext(UserContext)
//     const [isHovered, setIsHovered] = useState(false);
//     const [id, setId] = useState(null);

//     const shortName = !isDashboard && notification.message.length > 20
//         ? notification.message.substr(0, 25) + '...'
//         : notification.message;

//     const handleMouseEnter = () => {
//         setIsHovered(true);
//     };

//     const handleMouseLeave = () => {
//         setIsHovered(false);
//     };

//     function formatAuctionEndDate(date) {
//         const auctionEndDateString = date || undefined;
//         if (!auctionEndDateString) return '';

//         const auctionEndDate = new Date(auctionEndDateString);
//         const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
//         return auctionEndDate.toLocaleString('en-US', options);
//     }

//     const deleteNotification = async (id) => {
//         try {
//             await axios.delete(`http://localhost:8080/api/v1/notifications/delete/${id}`, {
//                 headers: { Authorization: `Bearer ${accessToken}` }
//             });
//             toast.success("Notification deleted successfully");
//             setFetchTrigger(true);
//         } catch (error) {
//             console.log(error);
//             toast.error("An error occurred while deleting notification");
//         }
//     };

//     console.log(id)

//     return (
//         <li
//             style={{ borderLeft: `5px solid ${!notification.read ? '#32c36c' : 'red'}` }}
//             className='notification-card-li'
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//         >
//             <span dangerouslySetInnerHTML={{ __html: shortName }} className="notification-message"></span>
//             <span className="notification-date">
//                 <IoMdTime />
//                 {formatAuctionEndDate(notification?.timestamp)}
//                 {isDashboard && isHovered && (
//                     <>
//                         <span className="notification-status">
//                             {notification.read ? 'Read' : 'Unread'}
//                         </span>
//                         <RiDeleteBin6Line color='red' onClick={() => {
//                             setId(notification.id)
//                         }}/>
//                     </>
//                 )}
//             </span>
//         </li>
//     );
// }

// export default Notification;


import React, { useContext, useState } from 'react';
import './notification.css';
import { IoMdTime } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { UserContext } from '../../../context/userContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal, Button, Group, Flex, Text } from '@mantine/core';

function Notification({ notification, isDashboard, getNotifications }) {
    const { accessToken } = useContext(UserContext);
    const [isHovered, setIsHovered] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const shortName = !isDashboard && notification.message.length > 20
        ? notification.message.substr(0, 21) + '...'
        : notification.message;

    const handleMouseEnter = () => {
        setIsHovered(true);
        markAsRead(notification.id)
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    function formatAuctionEndDate(date) {
        const auctionEndDateString = date || undefined;
        if (!auctionEndDateString) return '';

        const auctionEndDate = new Date(auctionEndDateString);
        const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        return auctionEndDate.toLocaleString('en-US', options);
    }

    const deleteNotification = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/notifications/delete/${id}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            toast.success("Notification deleted successfully");
            getNotifications();
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while deleting the notification");
        }
    };

    const markAsRead = async (id) => {
        try {
            await axios.patch(`http://localhost:8080/api/v1/notifications/mark-as-read/${id}`, {}, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            toast.success("Notification marked as read");
            getNotifications();
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while marking notification as read");
        }
    };

    const handleDeleteClick = () => {
        setConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        deleteNotification(notification.id);
        setConfirmOpen(false);
    };

    const handleCancelDelete = () => {
        setConfirmOpen(false);
    };

    return (
        <>
            <li
                style={{ borderLeft: `5px solid ${!notification.read ? '#32c36c' : 'red'}` }}
                className='notification-card-li'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <span dangerouslySetInnerHTML={{ __html: shortName }} className="notification-message"></span>
                <span className="notification-date">
                    <IoMdTime />
                    {formatAuctionEndDate(notification?.timestamp)}
                    {isDashboard && isHovered && (
                        <>
                            <span className="notification-status">
                                {notification.read ? 'Read' : 'Unread'}
                            </span>
                            <RiDeleteBin6Line
                                cursor={'pointer'}
                                color='red'
                                onClick={handleDeleteClick}
                            />
                        </>
                    )}
                </span>
            </li>
            <Modal
                opened={confirmOpen}
                onClose={handleCancelDelete}
                title="Confirm Deletion"
                centered
                ff={'"Saira", sans-serif'}
            >
                <Text >Are you sure you want to delete this notification?</Text>
                <Flex gap={10} justify={'center'} mt={12}>
                    <Button variant="outline" color="gray" onClick={handleCancelDelete}>Cancel</Button>
                    <Button color="red" onClick={handleConfirmDelete}>Delete</Button>
                </Flex>
            </Modal>
        </>
    );
}

export default Notification;
