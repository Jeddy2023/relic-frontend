import React from 'react'
import './customerdashboard.css'
import { Card, Group, Text, Menu, ActionIcon, Image, SimpleGrid, rem, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

function CustomerDashboardAddresses() {
  return (
    <div className="customer_addresses">
      <div className="billing_card">
        <Card withBorder shadow="sm" radius="sm" p={30} maw={350}>
          <Card.Section withBorder inheritPadding>
            <Group display={'flex'} py={5} justify='space-between' className='card_header-section'>
              <Text fw={600} size="lg" className='bill-header'>Billing Address</Text>
              <Link><Text fw={500} size="sm">Edit</Text></Link>
            </Group>
          </Card.Section>

          <Card.Section mt={10} inheritPadding>
            <Text size="lg">
              You have not set up this type of address yet.
            </Text>
            {/* <Text size="lg">
              Jedidiah Ken Osuh
            </Text>
            <Text size="lg">
              10
            </Text>
            <Text size="lg">
              Port Harcourt
            </Text>
            <Text size="lg">
              Rivers
            </Text>
            <Text size="lg">
              Nigeria
            </Text> */}
          </Card.Section>
        </Card>
      </div>
      <div className="shipping_card">
        <Card withBorder shadow="sm" radius="sm" p={30} maw={350}>
          <Card.Section withBorder inheritPadding>
            <Group display={'flex'} justify='space-between' gap={100} py={5} className='card_header-section'>
              <Text fw={600} size="lg" className='bill-header'>Shipping Address</Text>
              <Link to='/dashboard/update-shipping-address'><Text fw={500} size="sm">Edit</Text></Link>
            </Group>
          </Card.Section>

          <Card.Section mt={10} inheritPadding>
            <Text size="lg">
              Jedidiah Ken Osuh
            </Text>
            <Text size="lg">
              10
            </Text>
            <Text size="lg">
              Port Harcourt
            </Text>
            <Text size="lg">
              Rivers
            </Text>
            <Text size="lg">
              Nigeria
            </Text>
          </Card.Section>
        </Card>
      </div>
    </div>
  )
}

export default CustomerDashboardAddresses