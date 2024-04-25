import React from 'react'
import './customerdashboard.css'
import { Table, ActionIcon, Menu, rem } from '@mantine/core';
import { LuBadgeX } from 'react-icons/lu';
import { GrDeploy } from 'react-icons/gr';
import { GrMoreVertical } from 'react-icons/gr';

function CustomerDashboardAuctionActivity() {
  const elements = [
    { id: '1000', bidAmount: 19000000000, auction: 'Couple Wedding Ring Ring Couple Wedding Ring Ring', orderDate: '2024-04-10', currentBid: 30040 },
    { id: '1001', bidAmount: 799.99, auction: 'Laptop', orderDate: '2024-04-08', currentBid: 48759 },
    { id: '1002', bidAmount: 49.99, auction: 'Software', orderDate: '2024-04-11', currentBid: 83382291 },
    { id: '1003', bidAmount: 24.50, auction: 'Book', orderDate: '2024-04-09', currentBid: 28730277 },
    { id: '1004', bidAmount: 1250.00, auction: 'Lab Equipment', orderDate: '2024-04-12', currentBid: 3783848728 },
    { id: '1005', bidAmount: 349.95, auction: 'Telescope', orderDate: '2024-04-05', currentBid: 28637748 },
    { id: '1006', bidAmount: 99.50, auction: 'Microscope', orderDate: '2024-04-07', currentBid: 3783848728 },
    { id: '1007', bidAmount: 15.99, auction: 'Journal', orderDate: '2024-04-04', currentBid: 3783848728 },
    { id: '1008', bidAmount: 29.99, auction: 'Cake', orderDate: '2024-04-06', currentBid: 3783848728 },
    { id: '1009', bidAmount: 12.49, auction: 'Paintbrush', orderDate: '2024-04-03', currentBid: 3783848728 },
  ];

  function formatBidAmount(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const getCurrentBid = (bid, currentBid) => {
    switch (true) {
      case bid >= currentBid:
        return { color: 'rgb(0, 124, 0)' };
      default:
        return { color: 'rgb(148, 0, 0)' };
    }
  }

  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.orderDate}</Table.Td>
      <Table.Td>{element.auction}</Table.Td>
      <Table.Td>${formatBidAmount(element.bidAmount)}</Table.Td>
      <Table.Td><span style={getCurrentBid(element.bidAmount, element.currentBid)}>Current Bid :</span> ${formatBidAmount(element.currentBid)}</Table.Td>
    </Table.Tr>
  ));
  return (
    <div className="customer_auction-activity">
      <Table.ScrollContainer minWidth={500} type="native" >
        <Table verticalSpacing="md" highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Date</Table.Th>
              <Table.Th>Auction</Table.Th>
              <Table.Th>Bid</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  )
}

export default CustomerDashboardAuctionActivity