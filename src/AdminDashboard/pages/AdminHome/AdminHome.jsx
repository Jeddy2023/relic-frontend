import React from 'react';
import StatCard from '../../components/common/Card/StatCard';
import { FaRegUser } from "react-icons/fa";
import { RiAuctionLine } from "react-icons/ri";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { GrDeliver } from "react-icons/gr";
import '../../assets/styles/home.css';
import '../../assets/styles/style.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const requestData = [
  { month: '29 Jul 2023', value: 19 },
  { month: '26 Aug 2023', value: 0 },
  { month: '23 Sept 2023', value: 13 },
  { month: '21 Oct 2023', value: 20 },
  { month: '18 Nov 2023', value: 30 },
  { month: '16 Dec 2023', value: 0 },
  { month: '13 Jan 2024', value: 0 },
  { month: '10 Feb 2024', value: 60 },
  { month: '09 Mar 2024', value: 0 },
  { month: '06 Apr 2024', value: 0 },
  { month: '04 May 2024', value: 0 },
  { month: '01 Jun 2024', value: 10 }
];

const modifiedRequestData = requestData.map(item => ({
  month: item.month,
  users: item.value
}));

const productData = [
  { id: 1, name: 'Fashion', productCount: 20 },
  { id: 2, name: 'Building', productCount: 30 },
  { id: 3, name: 'Vehicles', productCount: 49 },
  { id: 3, name: 'Skin Care', productCount: 4 },
  { id: 3, name: 'Antiques', productCount: 66 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28','#8884d8', '#32c36c' ];

function AdminHome() {
  return (
    <div className='home page'>
      <div className="page_bar">
        <h2>Home</h2>
      </div>
      <div className="page_content">
        <div className="top">
          <StatCard color="blue" label="Total Users" amount={0} icon={<FaRegUser />} />
          <StatCard color="orange" label="Total Auctions" amount={0} icon={<MdOutlineProductionQuantityLimits />} />
          <StatCard color="red" label="Total Bids" amount={0} />
          <StatCard color="green" label="Total Orders" amount={0} icon={<GrDeliver />} />
          <StatCard color="green" label="Total Revenue" amount={0} icon={<GrDeliver />} />
          <StatCard color="green" label="Total Revenue" amount={0} icon={<GrDeliver />} />
        </div>

        <div className="chart_container">
          <div className="chart_content">
            <div className="chart_card">
              <p className="title">Users Analytics</p>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={modifiedRequestData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    interval={0}
                    tickFormatter={(value) => value.split(' ')[1]}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="users" stroke="#32c36c" fill="#32c36ca0" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="chart_card">
              <p className="title">Popular Categories</p>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={productData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="productCount"
                    label
                  >
                    {productData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
