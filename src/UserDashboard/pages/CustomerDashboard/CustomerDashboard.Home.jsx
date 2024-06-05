// import React, { useContext, useEffect, useState } from 'react'
// import './customerdashboard.css'
// import { Checkbox, Button, Group, Modal, PinInput, Card, Text, Flex } from "@mantine/core";
// import { Link } from 'react-router-dom';
// import { FaBriefcase, FaShoppingCart } from "react-icons/fa";
// import { UserContext } from '../../../context/userContext';
// import axios from 'axios';
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';


// function CustomerDashboardHome() {
//   const { accessToken, userData } = useContext(UserContext);
//   const [totalCounts, setTotalCounts] = useState(null);
//   const [orderData, setOrderData] = useState(null);

//   var seller;
//   if (userData) {
//     seller = userData?.role == 'SELLER'
//   }

//   const fetchTotalCounts = async () => {
//     try {
//       const url = 'http://localhost:8080/api/v1/auction/totals'
//       const response = await axios.get(url, { headers: { Authorization: `Bearer ${accessToken}` } });
//       setTotalCounts(response?.data);
//     } catch (error) {
//       console.error('Error fetching total counts:', error);
//     }
//   };

//   const fetchOrderAnalytics = async () => {
//     try {
//       const url = 'http://localhost:8080/api/v1/admin/analytics/user-orders'
//       const response = await axios.get(url, { headers: { Authorization: `Bearer ${accessToken}` } });
//       setOrderData(response?.data);
//     } catch (error) {
//       console.error('Error getting analytics:', error);
//     }
//   };

//   useEffect(() => {
//     if (accessToken) {
//       fetchTotalCounts();
//       fetchOrderAnalytics();
//     }
//   }, [accessToken]);

//   console.log(orderData)

//   return (
//     <div className="customer_home">
//       {!seller && <>
//         <h1>Hello <span>jeddy</span></h1>
//         <p>From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
//         <div className="become_vendor">
//           <div className="left-become_vendor">
//             <h4>Become a Vendor</h4>
//             <p>Vendors can sell products and manage a store with a vendor dashboard.</p>
//           </div>
//           <button>Become a Vendor</button>
//         </div>
//       </>}
//       {seller && <Flex w="100%" gap={20}>
//         <Flex direction="column" w="50%">
//           <Card withBorder>
//             <Card.Section withBorder p={10} display={'flex'} style={{ gap: '10px', alignItems: 'center' }}>
//               <FaShoppingCart color='#999' />
//               <Text fw={600} className='bill-header'>Orders</Text>
//             </Card.Section>
//             <Card.Section p={10}>
//               <Text c='#6d6d6d' mb={10} fz={'md'}>Total0</Text>
//               <Text c='#73a724' mb={10} fz={'md'}>Completed10</Text>
//               <Text c='#999' mb={10} fz={'md'}>Pending20</Text>
//               <Text c='#d54e21' mb={10} fz={'md'}>Cancelled10</Text>
//             </Card.Section>
//           </Card>

//           <Card withBorder mt={20}>
//             <Card.Section withBorder p={10} display={'flex'} style={{ gap: '10px', alignItems: 'center' }}>
//               <FaBriefcase color='#999' />
//               <Text fw={600} size="lg" className='bill-header'>Products</Text>
//             </Card.Section>
//             <Card.Section p={10}>
//               <Text c='#6d6d6d' mb={10} fz={'md'}>Total ( {totalCounts?.totalUserProducts} )</Text>
//               <Text c='#6d6d6d' mb={10} fz={'md'}>Live ( {totalCounts?.totalActiveProducts} )</Text>
//               <Text c='#6d6d6d' mb={10} fz={'md'}>Offline ( {totalCounts?.totalOfflineProducts} )</Text>
//               <Text c='#6d6d6d' mb={10} fz={'md'}>Pending Review ( {totalCounts?.totalPendingReviews} )</Text>
//             </Card.Section>
//           </Card>
//         </Flex>

//         <Flex direction="column" w="50%">
//           <Card withBorder>
//             <Card.Section withBorder inheritPadding>
//               <Text fw={600} className='bill-header'>Order Analytics</Text>
//             </Card.Section>
//             <Card.Section mt={10} inheritPadding>
//               <ResponsiveContainer width="100%" height={300}>
//                 <AreaChart data={orderData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis
//                     dataKey="month"
//                     interval={0}
//                     tickFormatter={(value) => value.split(' ')[1]}
//                   />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Area type="monotone" dataKey="value" stroke="#32c36c" fill="#32c36ca0" />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </Card.Section>
//           </Card>
//         </Flex>
//       </Flex>}
//     </div>
//   )
// }

// export default CustomerDashboardHome



// import React, { useContext, useEffect, useState } from 'react';
// import './customerdashboard.css';
// import { Checkbox, Button, Group, Modal, PinInput, Card, Text, Flex } from "@mantine/core";
// import { Link } from 'react-router-dom';
// import { FaBriefcase, FaShoppingCart } from "react-icons/fa";
// import { UserContext } from '../../../context/userContext';
// import axios from 'axios';
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// function CustomerDashboardHome() {
//   const { accessToken, userData } = useContext(UserContext);
//   const [totalCounts, setTotalCounts] = useState(null);
//   const [orderData, setOrderData] = useState(null);

//   const COLORS = [
//     '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
//     '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
//     '#9966FF', '#FF9F40', '#FF6384', '#36A2EB'
//   ];

//   var seller;
//   if (userData) {
//     seller = userData?.role === 'SELLER';
//   }

//   const fetchTotalCounts = async () => {
//     try {
//       const url = 'http://localhost:8080/api/v1/auction/totals';
//       const response = await axios.get(url, { headers: { Authorization: `Bearer ${accessToken}` } });
//       setTotalCounts(response?.data);
//     } catch (error) {
//       console.error('Error fetching total counts:', error);
//     }
//   };

//   const fetchTotalOrderCounts = async () => {
//     try {
//       const url = 'http://localhost:8080/api/v1/orders/total';
//       const response = await axios.get(url, { headers: { Authorization: `Bearer ${accessToken}` } });
//       setTotalCounts(response?.data);
//     } catch (error) {
//       console.error('Error fetching total counts:', error);
//     }
//   };

//   const fetchOrderAnalytics = async () => {
//     try {
//       const url = 'http://localhost:8080/api/v1/admin/analytics/user-orders';
//       const response = await axios.get(url, { headers: { Authorization: `Bearer ${accessToken}` } });
//       setOrderData(response?.data);
//     } catch (error) {
//       console.error('Error getting analytics:', error);
//     }
//   };

//   useEffect(() => {
//     if (accessToken) {
//       fetchTotalCounts();
//       fetchOrderAnalytics();
//     }
//   }, [accessToken]);

//   const pieData = [
//     { name: 'Jul 2023', value: 200 },
//     { name: 'Aug 2023', value: 30 },
//     { name: 'Sept 2023', value: 100 },
//     { name: 'Oct 2023', value: 50 },
//     { name: 'Nov 2023', value: 60 },
//     { name: 'Dec 2023', value: 29 },
//     { name: 'Jan 2024', value: 50 },
//     { name: 'Feb 2024', value: 4 },
//     { name: 'Mar 2024', value: 6 },
//     { name: 'Apr 2024', value: 0 },
//     { name: 'May 2024', value: 200 },
//     { name: 'Jun 2024', value: 300 },
//   ];

//   const transformedPieData = pieData.map(item => ({
//     ...item,
//     name: item.name.split(' ')[0].substring(0, 3)
//   }));

//   return (
//     <div className="customer_home">
//       {!seller && <>
//         <h1>Hello <span>jeddy</span></h1>
//         <p>From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
//         <div className="become_vendor">
//           <div className="left-become_vendor">
//             <h4>Become a Vendor</h4>
//             <p>Vendors can sell products and manage a store with a vendor dashboard.</p>
//           </div>
//           <button>Become a Vendor</button>
//         </div>
//       </>}
//       {seller && <Flex w="100%" gap={20}>
//         <Flex direction="column" w="50%">
//           <Card withBorder>
//             <Card.Section withBorder p={10} display={'flex'} style={{ gap: '10px', alignItems: 'center' }}>
//               <FaShoppingCart color='#999' />
//               <Text fw={600} className='bill-header'>Orders</Text>
//             </Card.Section>
//             <Card.Section p={10}>
//               <Text c='#6d6d6d' mb={10} fz={'md'}>Total0</Text>
//               <Text c='#73a724' mb={10} fz={'md'}>Completed10</Text>
//               <Text c='#999' mb={10} fz={'md'}>Pending20</Text>
//               <Text c='#d54e21' mb={10} fz={'md'}>Cancelled10</Text>
//             </Card.Section>
//           </Card>

//           <Card withBorder mt={20}>
//             <Card.Section withBorder p={10} display={'flex'} style={{ gap: '10px', alignItems: 'center' }}>
//               <FaBriefcase color='#999' />
//               <Text fw={600} size="lg" className='bill-header'>Products</Text>
//             </Card.Section>
//             <Card.Section p={10}>
//               <Text c='#6d6d6d' mb={10} fz={'md'}>Total ( {totalCounts?.totalUserProducts} )</Text>
//               <Text c='#6d6d6d' mb={10} fz={'md'}>Live ( {totalCounts?.totalActiveProducts} )</Text>
//               <Text c='#6d6d6d' mb={10} fz={'md'}>Offline ( {totalCounts?.totalOfflineProducts} )</Text>
//               <Text c='#6d6d6d' mb={10} fz={'md'}>Pending Review ( {totalCounts?.totalPendingReviews} )</Text>
//             </Card.Section>
//           </Card>
//         </Flex>

//         <Flex direction="column" w="50%">
//           <Card withBorder h='100%'>
//             <Card.Section withBorder p={10}>
//               <Text fw={600} className='bill-header'>Order Analytics</Text>
//             </Card.Section>
//             <Card.Section mt={10} inheritPadding>
//               <ResponsiveContainer width="100%" height={350}>
//                 <PieChart>
//                   <Pie
//                     data={transformedPieData}
//                     dataKey="value"
//                     cx="50%"
//                     cy="50%"
//                     fill="#8884d8"
//                   >
//                     {(transformedPieData).map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </Card.Section>
//           </Card>
//         </Flex>
//       </Flex>}
//     </div>
//   );
// }

// export default CustomerDashboardHome;












import React, { useContext, useEffect, useState } from 'react';
import './customerdashboard.css';
import { Checkbox, Button, Group, Modal, PinInput, Card, Text, Flex } from "@mantine/core";
import { Link } from 'react-router-dom';
import { FaBriefcase, FaShoppingCart } from "react-icons/fa";
import { UserContext } from '../../../context/userContext';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function CustomerDashboardHome() {
  const { accessToken, userData } = useContext(UserContext);
  const [totalCounts, setTotalCounts] = useState(null);
  const [totalOrderCounts, setTotalOrderCounts] = useState(null);
  const [orderData, setOrderData] = useState(null);

  const COLORS = [
    '#FFB6C1', // Light Pink
    '#87CEFA', // Light Sky Blue
    '#98FB98', // Pale Green
    '#FFD700', // Gold
    '#FF69B4', // Hot Pink
    '#00FA9A', // Medium Spring Green
    '#FFDEAD', // Navajo White
    '#AFEEEE', // Pale Turquoise
    '#DB7093', // Pale Violet Red
    '#FFB347', // Light Orange
    '#ADD8E6', // Light Blue
    '#E0FFcF', // Light Cyan
    '#FAFAD2', // Light Goldenrod Yellow
    '#D3FFCE', // Light Green
    '#FFC3A0', // Light Salmon
    '#FFDAB9', // Peach Puff
    '#E6E6FA', // Lavender
    '#FFFACD', // Lemon Chiffon
    '#FFE4E1', // Misty Rose
    '#FFCCCB'  // Light Coral
  ];


  const seller = userData?.role === 'SELLER';

  const fetchTotalCounts = async () => {
    try {
      const url = 'http://localhost:8080/api/v1/auction/totals';
      const response = await axios.get(url, { headers: { Authorization: `Bearer ${accessToken}` } });
      setTotalCounts(response?.data);
    } catch (error) {
      console.error('Error fetching total counts:', error);
    }
  };

  const fetchTotalOrderCounts = async () => {
    try {
      const url = 'http://localhost:8080/api/v1/orders/total';
      const response = await axios.get(url, { headers: { Authorization: `Bearer ${accessToken}` } });
      setTotalOrderCounts(response?.data);
    } catch (error) {
      console.error('Error fetching total order counts:', error);
    }
  };

  const fetchOrderAnalytics = async () => {
    try {
      const url = 'http://localhost:8080/api/v1/admin/analytics/user-orders';
      const response = await axios.get(url, { headers: { Authorization: `Bearer ${accessToken}` } });
      setOrderData(response?.data);
    } catch (error) {
      console.error('Error getting analytics:', error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchTotalCounts();
      fetchOrderAnalytics();
      fetchTotalOrderCounts();
    }
  }, [accessToken]);

  console.log(orderData)

  return (
    <div className="customer_home">
      {!seller && <>
        <h1>Hello <span>jeddy</span></h1>
        <p>From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
        <div className="become_vendor">
          <div className="left-become_vendor">
            <h4>Become a Vendor</h4>
            <p>Vendors can sell products and manage a store with a vendor dashboard.</p>
          </div>
          <button>Become a Vendor</button>
        </div>
      </>}
      {seller && <Flex w="100%" gap={20}>
        <Flex direction="column" w="50%">
          <Card withBorder>
            <Card.Section withBorder p={10} display={'flex'} style={{ gap: '10px', alignItems: 'center' }}>
              <FaShoppingCart color='#999' />
              <Text fw={600} className='bill-header'>Orders</Text>
            </Card.Section>
            <Card.Section p={10}>
              <Text c='#6d6d6d' mb={10} fz={'md'}>Total ( {totalOrderCounts?.totalOrders} )</Text>
              <Text c='#73a724' mb={10} fz={'md'}>Completed ( {totalOrderCounts?.totalCompletedOrders} )</Text>
              <Text c='#999' mb={10} fz={'md'}>Pending ( {totalOrderCounts?.totalPendingOrders} )</Text>
              <Text c='#d54e21' mb={10} fz={'md'}>Cancelled ( {totalOrderCounts?.totalCancelledOrders} )</Text>
            </Card.Section>
          </Card>

          <Card withBorder mt={20}>
            <Card.Section withBorder p={10} display={'flex'} style={{ gap: '10px', alignItems: 'center' }}>
              <FaBriefcase color='#999' />
              <Text fw={600} size="lg" className='bill-header'>Products</Text>
            </Card.Section>
            <Card.Section p={10}>
              <Text c='#6d6d6d' mb={10} fz={'md'}>Total ( {totalCounts?.totalUserProducts} )</Text>
              <Text c='#6d6d6d' mb={10} fz={'md'}>Live ( {totalCounts?.totalActiveProducts} )</Text>
              <Text c='#6d6d6d' mb={10} fz={'md'}>Offline ( {totalCounts?.totalOfflineProducts} )</Text>
              <Text c='#6d6d6d' mb={10} fz={'md'}>Pending Review ( {totalCounts?.totalPendingReviews} )</Text>
            </Card.Section>
          </Card>
        </Flex>

        <Flex direction="column" w="50%">
          <Card withBorder h='100%'>
            <Card.Section withBorder p={10}>
              <Text fw={600} className='bill-header'>Order Analytics</Text>
            </Card.Section>
            <Card.Section mt={10} inheritPadding>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={orderData || []}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    fill="#8884d8"
                    nameKey={(entry) => entry?.month?.split(' ')[0].substring(0, 3)}
                  >
                    {orderData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Section>
          </Card>
        </Flex>
      </Flex>}
    </div>
  );
}

export default CustomerDashboardHome;
