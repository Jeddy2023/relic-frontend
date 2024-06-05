import React, { useContext, useEffect, useRef, useState } from 'react'
import './customerdashboard.css'
import { Table, ActionIcon, Menu, rem, Button, Flex, Text, Modal, Select, Image, FileInput, Pagination, Textarea, Group, TextInput } from '@mantine/core';
import { LuBadgeX } from 'react-icons/lu';
import { DateTimePicker } from '@mantine/dates';
import toast, { Toaster } from 'react-hot-toast';
import { GrDeploy } from 'react-icons/gr';
import { GrMoreVertical } from 'react-icons/gr';
import NoProducts from '../../../assets/images/empty-animate.svg'
import Loader from '../../../components/ui/Loader/Loader';
import ConfirmationModal from '../../components/ConfirmationModal';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../../context/userContext';
import { useDisclosure } from '@mantine/hooks';
import { format } from 'date-fns';


function CustomerDashboardAuctionActivity() {
  const { accessToken, userData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activity, setActivity] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [fetchTrigger, setFetchTrigger] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState('Date Descending');
  const [createdAtStart, setCreatedAtStart] = useState(null);
  const [createdAtEnd, setCreatedAtEnd] = useState(null);

  const handlePageChange = (newPage) => {
    setPage(newPage - 1);
  };

  const formattedStartDate = createdAtStart ? format(createdAtStart, "yyyy-MM-dd HH:mm:ss.SS") : null;
  const formattedEndDate = createdAtEnd ? format(createdAtEnd, "yyyy-MM-dd HH:mm:ss.SS") : null;

  const buildQueryString = () => {
    const params = {
      keyword: keyword,
      sortBy: sortBy,
      createdAtStart: formattedStartDate,
      createdAtEnd: formattedEndDate,
      page: page,
      size: pageSize,
      userId: userData?.id
    };

    const queryString = Object.entries(params)
      .filter(([key, value]) => value !== null && value !== '')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    return queryString ? `?${queryString}` : '';
  };

  const getActivity = async () => {
    try {
      const url = `http://localhost:8080/api/v1/bid/user${buildQueryString()}`;
      if (accessToken) {
        const response = await axios.get(url, { headers: { Authorization: `Bearer ${accessToken}` } });
        setActivity(response?.data?.content);
        setTotalPages(response?.data?.totalPages);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while getting activity");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (fetchTrigger && accessToken) {
      getActivity();
      setFetchTrigger(false);
    } else {
      setIsLoading(true);
      getActivity();
    }
  }, [page, accessToken, keyword, sortBy, createdAtStart, createdAtEnd, page]);

  function formatBidAmount(amount) {
    return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const getCurrentBid = (bid, currentBid) => {
    switch (true) {
      case bid >= currentBid:
        return { color: 'rgb(0, 124, 0)' };
      default:
        return { color: 'rgb(148, 0, 0)' };
    }
  }

  function formatAuctionEndDate(date) {
    const auctionEndDateString = date || undefined;
    if (!auctionEndDateString) return '';

    const auctionEndDate = new Date(auctionEndDateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return auctionEndDate.toLocaleString('en-US', options);
  }

  const rows = activity?.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.productName}</Table.Td>
      <Table.Td>${formatBidAmount(element.bidAmount)}</Table.Td>
      <Table.Td>$<span style={getCurrentBid(element.bidAmount, element.productCurrentBid)}>{formatBidAmount(element.productCurrentBid)}</span></Table.Td>
      <Table.Td>{formatAuctionEndDate(element.createdAt)}</Table.Td>
      <Table.Td>
        <Menu width={200} position="bottom-end" shadow="md">
          <Menu.Target>
            <ActionIcon size={22} variant='light' color='black'>
              <GrMoreVertical />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Handle Activity</Menu.Label>
            <Menu.Item leftSection={<LuBadgeX style={{ width: rem(14), height: rem(14) }} />} onClick={() => history.push(`auctions/${element.productId}`)} >
              <Link to={`/auctions/${element.productId}`} style={{width: '100%'}}>
                View Auction Details
              </Link>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  return (
    <div className="customer_auction-activity">
      <Flex justify={'space-between'} mb={15} align={'flex-end'}>
        <TextInput
          placeholder='Search Activities'
          size='md'
          color='#32c36c'
          value={keyword || ''}
          onChange={handleKeywordChange}
          display={'block'}
          style={{ width: '240px' }}
        />
        <Flex direction={'column'} gap={10}>
          <Select
            data={['Date Ascending', 'Date Descending', 'Bid Amount Ascending', 'Bid Amount Descending']}
            value={sortBy}
            onChange={handleSortChange}
            allowDeselect={false}
            checkIconPosition="right"
            size='md'
          />
          <Flex justify={'space-between'} gap={10}>
            <DateTimePicker
              placeholder="Pick start date"
              value={createdAtStart}
              onChange={setCreatedAtStart}
              clearable
              size='sm'
            />
            <DateTimePicker
              placeholder="Pick end date"
              value={createdAtEnd}
              onChange={setCreatedAtEnd}
              clearable
            />
          </Flex>
        </Flex>
      </Flex>
      <Table.ScrollContainer minWidth={500} type="native" >
        <Table verticalSpacing="md" highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Auction</Table.Th>
              <Table.Th>Bid</Table.Th>
              <Table.Th>Current Bid</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          {
            isLoading ? (
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td py={rem(20)} colSpan={6} style={{ textAlign: 'center' }}>
                    <Loader />
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            ) : (
              <Table.Tbody>
                {rows.length > 0 ? (
                  rows
                ) : (
                  <Table.Tr>
                    <Table.Td colSpan={7} style={{ textAlign: 'center' }}>
                      <img src={NoProducts} alt="" className='vendordashboard-products-noproductsfound' />
                      No Auctions Found
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            )
          }
        </Table>
      </Table.ScrollContainer>
      <Pagination total={totalPages} mt={30}
        color='#32c36c'
        onChange={handlePageChange}
        value={page + 1} />
    </div>
  )
}

export default CustomerDashboardAuctionActivity
