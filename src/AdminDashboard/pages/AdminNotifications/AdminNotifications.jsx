import { Button, Flex, Select, TextInput, px, Text, Group, Pagination } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates';
import React from 'react'
import { GrSearch } from 'react-icons/gr'
import NoAuctions from '../../../assets/images/empty-animate.svg'
import Notification from '../../../components/common/Notification/Notification';

const notifications = [
    {
        id: 1,
        message: "Notification 1",
        isRead: false,
        timestamp: new Date("2024-06-02T08:00:00.000Z")
    },
    {
        id: 2,
        message: "Notification 2",
        isRead: true,
        timestamp: new Date("2024-06-01T10:15:00.000Z")
    },
    {
        id: 3,
        message: "Notification 3",
        isRead: false,
        timestamp: new Date("2024-05-31T14:30:00.000Z")
    },
    {
        id: 4,
        message: "Notification 4",
        isRead: true,
        timestamp: new Date("2024-05-30T16:45:00.000Z")
    },
    {
        id: 5,
        message: "Notification 5",
        isRead: false,
        timestamp: new Date("2024-05-29T11:00:00.000Z")
    },
    {
        id: 6,
        message: "Notification 6",
        isRead: false,
        timestamp: new Date("2024-05-28T09:20:00.000Z")
    },
    {
        id: 7,
        message: "Notification 7",
        isRead: true,
        timestamp: new Date("2024-05-27T07:30:00.000Z")
    },
    {
        id: 8,
        message: "Notification 8",
        isRead: false,
        timestamp: new Date("2024-05-26T05:45:00.000Z")
    },
    {
        id: 9,
        message: "Notification 9",
        isRead: true,
        timestamp: new Date("2024-05-25T03:00:00.000Z")
    },
    {
        id: 10,
        message: "Notification 10",
        isRead: false,
        timestamp: new Date("2024-05-24T01:10:00.000Z")
    }
];


function AdminNotifications() {
    return (
        <div className='admindashboard-users page'>
            <div className="page_bar">
                <h2>Users</h2>
                <div className="right">
                    <TextInput
                        leftSection={<GrSearch />}
                        size="md"
                        placeholder="Find Notification"
                        style={{ width: px(500) }}
                    />
                </div>
            </div>
            <div className="page_content">
                <Flex gap={10} justify={'flex-end'}>
                    <Text color="blue" size="sm">(Mark All as Read)</Text>
                    <Text color="red" size="sm">(Delete All)</Text>
                    <Text color="#32c36c" size="sm">(Read)</Text>
                    <Text color="red" size="sm">(Unread)</Text>
                    <Button color="#32c36c" size='compact-sm' variant='light'>Clear</Button>
                    <Flex direction={'column'}>
                        <Select
                            data={['Date Ascending', 'Date Descending']}
                            allowDeselect={false}
                            checkIconPosition="right"
                            size='md'
                        />
                        <Flex justify={'space-between'} gap={10} mt={15}>
                            <DateTimePicker
                                placeholder="Notification Date Range"
                                clearable
                                size='md'
                            />
                            <DateTimePicker
                                placeholder="Pick end date"
                                clearable
                                size='md'
                            />
                        </Flex>
                    </Flex>
                </Flex>
            </div>
            <div className="page_content">
                {notifications.length >= 1 ?
                    <>
                        <ul className="notification-list">
                            {notifications.map((notification) => <Notification key={notification.id} notification={notification} isDashboard={true} />)}
                        </ul>
                        <Pagination mt={30}
                            color='#32c36c'
                        />
                    </> :
                    <div className='no-notifications-card'>
                        <img src={NoAuctions} alt="" style={{ width: "300px" }} />
                        <h1>No Notifications Yet</h1>
                    </div>
                }
            </div>
        </div>
    )
}

export default AdminNotifications