import React from 'react'
import './customerdashboard.css'
import { Table } from '@mantine/core';

const elements = [
  { id: '1000', bidAmount: 19.99, product: 'Headphones', orderDate: '2024-04-10', status: 'PAID' },
  { id: '1001', bidAmount: 799.99, product: 'Laptop', orderDate: '2024-04-08', status: 'PENDING' },
  { id: '1002', bidAmount: 49.99, product: 'Software', orderDate: '2024-04-11', status: 'CANCELLED' },
  { id: '1003', bidAmount: 24.50, product: 'Book', orderDate: '2024-04-09', status: 'PAID' },
  { id: '1004', bidAmount: 1250.00, product: 'Lab Equipment', orderDate: '2024-04-12', status: 'PENDING' },
  { id: '1005', bidAmount: 349.95, product: 'Telescope', orderDate: '2024-04-05', status: 'PAID' },
  { id: '1006', bidAmount: 99.50, product: 'Microscope', orderDate: '2024-04-07', status: 'PENDING' },
  { id: '1007', bidAmount: 15.99, product: 'Journal', orderDate: '2024-04-04', status: 'CANCELLED' },
  { id: '1008', bidAmount: 29.99, product: 'Cake', orderDate: '2024-04-06', status: 'PAID' },
  { id: '1009', bidAmount: 12.49, product: 'Paintbrush', orderDate: '2024-04-03', status: 'PENDING' },
];

function CustomerDashboardActiveAuction() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>${element.bidAmount}</Table.Td>
      <Table.Td>{element.product}</Table.Td>
      <Table.Td>{element.orderDate}</Table.Td>
      <Table.Td>{element.status}</Table.Td>
    </Table.Tr>
  ));
  return (
    <div className="customer_orders">
      <Table.ScrollContainer minWidth={500} type="native" >
        <Table verticalSpacing="md" highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Bid Amount</Table.Th>
              <Table.Th>Product</Table.Th>
              <Table.Th>Order Date</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  )
}

export default CustomerDashboardActiveAuction