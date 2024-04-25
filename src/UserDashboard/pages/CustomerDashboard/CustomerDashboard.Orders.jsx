import React from 'react'
import './customerdashboard.css'
import { Table, ActionIcon, Menu, rem } from '@mantine/core';
import { LuBadgeX } from 'react-icons/lu';
import { GrDeploy } from 'react-icons/gr';
import { GrMoreVertical } from 'react-icons/gr';

function CustomerDashboardOrders() {
  const elements = [
    { id: '1000', bidAmount: 19000000000, auction: 'Couple Wedding Ring Ring', orderDate: '2024-04-10', status: 'PAID' },
    { id: '1001', bidAmount: 799.99, auction: 'Laptop', orderDate: '2024-04-08', status: 'PENDING' },
    { id: '1002', bidAmount: 49.99, auction: 'Software', orderDate: '2024-04-11', status: 'CANCELLED' },
    { id: '1003', bidAmount: 24.50, auction: 'Book', orderDate: '2024-04-09', status: 'PAID' },
    { id: '1004', bidAmount: 1250.00, auction: 'Lab Equipment', orderDate: '2024-04-12', status: 'PENDING' },
    { id: '1005', bidAmount: 349.95, auction: 'Telescope', orderDate: '2024-04-05', status: 'PAID' },
    { id: '1006', bidAmount: 99.50, auction: 'Microscope', orderDate: '2024-04-07', status: 'PENDING' },
    { id: '1007', bidAmount: 15.99, auction: 'Journal', orderDate: '2024-04-04', status: 'CANCELLED' },
    { id: '1008', bidAmount: 29.99, auction: 'Cake', orderDate: '2024-04-06', status: 'PAID' },
    { id: '1009', bidAmount: 12.49, auction: 'Paintbrush', orderDate: '2024-04-03', status: 'PENDING' },
  ];
  
  function formatBidAmount(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case 'PENDING':
        return { color: 'rgb(201, 201, 0)' };
      case 'PAID':
        return { color: 'rgb(0, 124, 0)' };
      case 'CANCELLED':
        return { color: 'rgb(148, 0, 0)' };
      default:
        return {};
    }
  }

  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.orderDate}</Table.Td>
      <Table.Td>{element.auction}</Table.Td>
      <Table.Td>${formatBidAmount(element.bidAmount)}</Table.Td>
      <Table.Td style={getStatusStyle(element.status)}>{element.status}</Table.Td>
      <Table.Td>
        <Menu width={200} position="bottom-end" shadow="md">
          <Menu.Target>
            <ActionIcon size={22} variant='light' color='black'>
              <GrMoreVertical />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Handle Order</Menu.Label>
            <Menu.Item leftSection={<LuBadgeX style={{ width: rem(14), height: rem(14) }} />}>
              Cancel Order
            </Menu.Item>
            <Menu.Item leftSection={<GrDeploy style={{ width: rem(14), height: rem(14) }} />}>
              Pay now
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="customer_orders">
      <Table.ScrollContainer minWidth={500} type="native" >
        <Table verticalSpacing="md" highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Date</Table.Th>
              <Table.Th>Auction</Table.Th>
              <Table.Th>Bid</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}

export default CustomerDashboardOrders