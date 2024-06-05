import React, { useContext, useEffect, useRef, useState } from 'react'
import '../CustomerDashboard/customerdashboard.css'
import { Table, ActionIcon, Menu, rem, Button, Flex, Text, Modal, Select, Image, FileInput, Pagination, Textarea, Group, TextInput } from '@mantine/core';
import { LuBadgeX } from 'react-icons/lu';
import { GrMoreVertical, GrUpdate, GrDeploy } from 'react-icons/gr';
import { FaAward, FaLockOpen, FaSearch } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits, MdDeleteOutline } from "react-icons/md";
import { useDisclosure } from '@mantine/hooks';
import Input from '../../../components/common/Input/Input';
import 'react-quill/dist/quill.snow.css'
import { DateTimePicker } from '@mantine/dates';
import axios from 'axios';
import { UserContext } from '../../../context/userContext';
import { validateCreateProductForm } from '../../../components/common/Validations';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../../components/ui/Loader/Loader';
import NoProducts from '../../../assets/images/empty-animate.svg'
import ConfirmationModal from '../../components/ConfirmationModal';
import { useNavigate, Link } from 'react-router-dom';

function VendorDashboardProducts() {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(true);
  const [categories, setCategories] = useState([]);
  const { accessToken } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingReviews, setPendingReviews] = useState(false);
  const [activeProducts, setActiveProducts] = useState(false);
  const [offlineBid, setOfflineBid] = useState(false);
  const [totalCounts, setTotalCounts] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [modalTitle, setModalTitle] = useState("New Product");
  const [productId, setProductId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [isAuctionEndpoint, setIsAuctionEndpoint] = useState(false);
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    description: '',
    categoryId: '',
    condition: 'NEW',
    minimumBid: '',
    biddingTimeLimit: '',
    productImage: null,
  });

  const [errorMessages, setErrorMessages] = useState({
    name: '',
    shortDescription: '',
    description: '',
    categoryId: '',
    condition: '',
    minimumBid: '',
    biddingTimeLimit: '',
    productImage: null,
  });

  const handlePageChange = (newPage) => {
    setPage(newPage - 1);
  };

  const buildQueryString = () => {
    const params = {
      pendingReviews: pendingReviews,
      activeProducts: activeProducts,
      offlineBid: offlineBid,
      keyword: keyword,
      page: page,
      size: pageSize,
      userId: null
    };

    const queryString = Object.entries(params)
      .filter(([key, value]) => value !== null && value !== '')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    return queryString ? `?${queryString}` : '';
  };

  const getProducts = async () => {
    try {
      const url = `http://localhost:8080/api/v1/auction/user${buildQueryString()}`;
      if (accessToken) {
        const response = await axios.get(url, { headers: { Authorization: `Bearer ${accessToken}` } });
        setProducts(response?.data?.content);
        setTotalPages(response?.data?.totalPages);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while getting auctions");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (fetchTrigger && accessToken) {
      getProducts();
      setFetchTrigger(false);
    } else {
      setIsLoading(true);
      getProducts();
    }
  }, [page, accessToken, offlineBid, activeProducts, pendingReviews, keyword]);

  const fetchTotalCounts = async () => {
    try {
      const url = 'http://localhost:8080/api/v1/auction/totals'
      const response = await axios.get(url, { headers: { Authorization: `Bearer ${accessToken}` } });
      setTotalCounts(response?.data);
    } catch (error) {
      console.error('Error fetching total counts:', error);
    }
  };

  useEffect(() => {
    if (accessToken && fetchTrigger) {
      fetchTotalCounts();
    }

    if (accessToken) {
      fetchTotalCounts();
    }
  }, [accessToken]);

  const handleCategoryChange = (value) => {
    setFormData({ ...formData, categoryId: value });
  };

  function formatBidAmount(amount) {
    return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const handleFileChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
    setFormData({ ...formData, productImage: file });
    setErrorMessages({ ...errorMessages, productImage: null });
  };

  const handleUpdateProduct = async (productId) => {
    try {
      const url = `http://localhost:8080/api/v1/auction/${productId}`;
      const response = await axios.get(url, { headers: { Authorization: `Bearer ${accessToken}` } });
      const productDetails = response?.data;

      setFormData({
        name: productDetails.name,
        shortDescription: productDetails.shortDescription,
        description: productDetails.description,
        categoryId: productDetails.categoryId.toString(),
        condition: productDetails.condition,
        minimumBid: productDetails.minimumBid.toString(),
        biddingTimeLimit: productDetails.biddingTimeLimit,
        productImage: '',
      });

      setSelectedImage(productDetails.productImageUrl)

      const biddingTime = new Date(productDetails.biddingTimeLimit);
      setFormData((prevFormData) => ({
        ...prevFormData,
        biddingTimeLimit: biddingTime,
      }));

      setProductId(productId);
      setModalTitle("Update Product");
      open();
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast.error("An error occurred while fetching product details");
    }
  };

  const handleUpdateProductSubmit = async (event) => {
    event.preventDefault();

    const formattedBiddingTimeLimit = formData.biddingTimeLimit ? new Date(formData.biddingTimeLimit).toISOString().replace('T', ' ').split('.')[0] : '';

    const isUpdateAuction = true

    if (!validateCreateProductForm({ ...formData, biddingTimeLimit: formattedBiddingTimeLimit }, setErrorMessages, isUpdateAuction)) {
      return;
    }

    setLoading(true);

    try {
      const { productImage, ...formDataWithoutImage } = formData;

      const formDataWithImage = productImage ? { ...formDataWithoutImage, productImage } : formDataWithoutImage;

      const response = await axios.put(
        `http://localhost:8080/api/v1/auction/${productId}`,
        { ...formDataWithImage, biddingTimeLimit: formattedBiddingTimeLimit },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast.success(response.data);
      getProducts()
      setLoading(false);
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error occured while update product. Try agian later');
      setLoading(false);
    }
  };

  const handleConfirmAction = async () => {
    const API_BASE_URL = isAuctionEndpoint ? 'http://localhost:8080/api/v1/auction' : 'http://localhost:8080/api/v1/bid';

    const api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (confirmAction && productId) {
      try {
        let response;
        switch (confirmAction) {
          case 'Delete':
            response = await api.delete(`/${productId}`);
            break;
          case 'Declare Winner':
            response = await api.patch(`/declarewinner/${productId}`);
            break;
          case 'Close':
            response = await api.patch(`/close/${productId}`);
            break;
          case 'Reopen':
            response = await api.patch(`/reopen/${productId}`);
            break;
          default:
            break;
        }
        toast.success(response?.data);
        fetchTotalCounts();
        getProducts();
        setFetchTrigger(true);
      } catch (error) {
        console.error(`Error during ${confirmAction}:`, error);
        toast.error(error?.response?.data?.message);
      } finally {
        setConfirmOpen(false);
      }
    }
  };

  const handleMenuItemClick = (action, productId, isAuction) => {
    setProductId(productId);
    setConfirmAction(action);
    setIsAuctionEndpoint(isAuction)
    setConfirmOpen(true);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const rows = products.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td className='auctions-product-img'><img src={element.productImageUrl} alt={element.name} /></Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.totalReviews}</Table.Td>
      <Table.Td>{element.totalBids}</Table.Td>
      <Table.Td>₦{formatBidAmount(element.currentBid)}</Table.Td>
      <Table.Td>{element.updatedAt}</Table.Td>
      <Table.Td>
        <Menu width={200} position="bottom-end" shadow="md">
          <Menu.Target>
            <ActionIcon size={22} variant='light' color='black'>
              <GrMoreVertical />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Handle Auction</Menu.Label>
            <Menu.Item leftSection={<MdDeleteOutline style={{ width: rem(14), height: rem(14) }} />} onClick={() => handleMenuItemClick('Delete', element.id, true)}>
              Delete Auction
            </Menu.Item>
            <Menu.Item leftSection={<GrUpdate style={{ width: rem(14), height: rem(14) }} />} onClick={() => {
              handleUpdateProduct(element.id)
              setProductId(element.id)
            }}>
              Update Auction
            </Menu.Item>
            <Menu.Item leftSection={<FaAward style={{ width: rem(14), height: rem(14) }} />} onClick={() => handleMenuItemClick('Declare Winner', element.id, false)}>
              Declare winner
            </Menu.Item>
            <Menu.Item leftSection={<LuBadgeX style={{ width: rem(14), height: rem(14) }} />} onClick={() => handleMenuItemClick('Close', element.id, false)}>
              Close Auction
            </Menu.Item>
            <Menu.Item leftSection={<FaLockOpen style={{ width: rem(14), height: rem(14) }} />} onClick={() => handleMenuItemClick('Reopen', element.id, false)}>
              Reopen Auction
            </Menu.Item>
            <Menu.Item leftSection={<FaSearch style={{ width: rem(14), height: rem(14) }} />} onClick={() => history.push(`auctions/${element.id}`)} >
              <Link to={`/auctions/${element.id}`} style={{width: '100%'}}>
                View Auction Details
              </Link>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));

  const handleModalClick = () => {
    setConfirmOpen(true);
  };

  const handleCloseModal = () => {
    close();
    setModalTitle("New Product");
    setSelectedImage(null)
    setFormData({
      name: "",
      shortDescription: "",
      description: "",
      categoryId: "",
      condition: "NEW",
      minimumBid: "",
      biddingTimeLimit: "",
      productImage: null,
    });
    setProductId(null);
  };

  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedBiddingTimeLimit = formData.biddingTimeLimit ? new Date(formData.biddingTimeLimit).toISOString().replace('T', ' ').split('.')[0] : '';

    const isUpdateAuction = false

    if (!validateCreateProductForm({ ...formData, biddingTimeLimit: formattedBiddingTimeLimit }, setErrorMessages, isUpdateAuction)) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/auction`,
        { ...formData, biddingTimeLimit: formattedBiddingTimeLimit },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      toast.success(response.data);
      setLoading(false);
      handleCloseModal();
      getProducts();
      fetchTotalCounts();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error occured while creating product. Try agian later');
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const url = `http://localhost:8080/api/v1/categories`;
        const response = await axios.get(url);
        const categoriesData = response?.data || [];
        setCategories(categoriesData);

        if (categoriesData.length > 0 && !formData.categoryId) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            categoryId: categoriesData[0].id.toString(),
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (fetchTrigger) {
      getCategories();
      setFetchTrigger(false);
    }
  }, [fetchTrigger, formData.categoryId]);

  return (
    <div className="customer_orders">
      <Toaster />
      <Flex justify={'space-between'}>
        <Flex direction={'column'} justify={'flex-start'}>
          <Flex gap={15}>
            <Text color="red" size="sm" style={{ cursor: 'pointer' }} onClick={() => {
              setOfflineBid(false)
              setActiveProducts(false)
              setPendingReviews(false)
              setFetchTrigger(true)
            }}>All ( {totalCounts?.totalUserProducts} )</Text>
            <Text color="#32c36c" size="sm" style={{ cursor: 'pointer' }} onClick={() => {
              setOfflineBid(false)
              setActiveProducts(false)
              setPendingReviews(true)
              setFetchTrigger(true)
            }}>Pending Reviews ( {totalCounts?.totalPendingReviews} )</Text>
            <Text color="orange" size="sm" style={{ cursor: 'pointer' }} onClick={() => {
              setOfflineBid(false)
              setActiveProducts(true)
              setPendingReviews(false)
              setFetchTrigger(true)
            }}>Active ( {totalCounts?.totalActiveProducts} )</Text>
            <Text color="red" size="sm" style={{ cursor: 'pointer' }} onClick={() => {
              setOfflineBid(true)
              setActiveProducts(false)
              setPendingReviews(false)
              setFetchTrigger(true)
            }}>Offline ( {totalCounts?.totalOfflineProducts} )</Text>
          </Flex>
          <TextInput
            placeholder='Search Products'
            size='md'
            color='#32c36c'
            value={keyword || ''}
            onChange={handleKeywordChange}
            mb={20}
            mt={20}
            display={'block'}
            style={{ width: '230px' }}
          />
        </Flex>
        <Button color='#32c36c97' size='sm' leftSection={<MdOutlineProductionQuantityLimits />} ff={'"Saira", sans-serif'} mb={20} onClick={open} className='vendor_products-createproduct-button'>Create a Product</Button>
      </Flex>
      <Table.ScrollContainer minWidth={500} type="native" >
        <Table verticalSpacing="md" highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Image</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Reviews</Table.Th>
              <Table.Th>Bids</Table.Th>
              <Table.Th>Current</Table.Th>
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

      <Modal opened={opened} onClose={handleCloseModal} title={modalTitle} centered ff={'"Saira", sans-serif'}>
        <form onSubmit={modalTitle == 'New Product' ? handleSubmit : handleUpdateProductSubmit} ref={formRef}>
          <Flex gap={10} direction={'column'}>
            <Input
              label="Name"
              name="name"
              placeholder="Product name"
              type={"text"}
              value={formData.name}
              error={errorMessages.name}
              onChange={handleChange}
            />
            <Input
              label="Short Description"
              placeholder="Short Description"
              name="shortDescription"
              type={"text"}
              value={formData.shortDescription}
              error={errorMessages.shortDescription}
              onChange={handleChange}
            />
            <Textarea
              placeholder='Long Description'
              value={formData.description}
              onChange={handleChange}
              error={errorMessages.description}
              name="description"
              label="Description"
            />
            <Select
              label="Category"
              data={categories.map(category => ({ value: category.id.toString(), label: category.name }))}
              value={formData.categoryId}
              onChange={handleCategoryChange}
              name='categoryId'
              error={errorMessages.categoryId}
            />
            <Select
              label="Condition"
              data={['USED', 'NEW']}
              value={formData.condition}
              name='condition'
              onChange={(value) => setFormData({ ...formData, condition: value })}
              error={errorMessages.condition}
            />
            <Input
              label="Minimum Bid Price"
              name="minimumBid"
              type="number"
              value={formData.minimumBid}
              error={errorMessages.minimumBid}
              onChange={handleChange}
            />
            <DateTimePicker
              label="Auction Time Limit"
              error={errorMessages.biddingTimeLimit}
              value={formData.biddingTimeLimit}
              onChange={(value) => handleChange({ target: { name: 'biddingTimeLimit', value } })}
            />
            <Image
              radius="md"
              src={selectedImage}
              h={200}
              mah={250}
              fallbackSrc="https://placehold.co/600x400?text=Placeholder"
            />
            <FileInput
              label="Product Image"
              accept="image/*"
              name='productImage'
              onChange={(files) => handleFileChange(files)}
              value={formData.productImage}
              error={errorMessages.productImage}
            />
            <Button type="submit" size="md" color="#32c36c" mt={10} loading={loading}>
              {modalTitle == 'New Product' ? 'CREATE' : 'UPDATE'}
            </Button>
          </Flex>
        </form>
      </Modal>
      <ConfirmationModal
        opened={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmAction}
        title="Confirm Action"
        message={`Are you sure you want to ${confirmAction} this auction?`}
      />
    </div>
  );
}

export default VendorDashboardProducts;
