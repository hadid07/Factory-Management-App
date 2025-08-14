import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import D_Card_Primary from '../components/D_Card_Primary';
import { CartPlus,CashStack } from 'react-bootstrap-icons';

// Chart.js imports and registration
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Bar Chart Data (Sales)
  const salesData = {
    labels: ['Soap', 'Oil', 'Food Items', 'Surf'],
    datasets: [
      {
        label: 'Sales',
        data: [120000, 180000, 25000, 30000],
        backgroundColor: [
          'rgba(49, 10, 105,0.7)',
          'rgba(109, 56, 113,0.7)',
          'rgba(63, 38, 23, 0.7))',
          'rgba(220, 53, 69, 0.7)',
        ],
        borderColor: [
          'rgb(49, 10, 105,1)',
          'rgba(109, 56, 113, 1)',
          'rgba(63, 38, 23, 1)',
          'rgba(220, 53, 69, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const salesOptions = {
    responsive: true,
    maintainAspectRatio: false, // allow custom height
    plugins: {
      legend: {
        labels: { color: '#fff' },
      },
      title: {
        display: true,
        text: 'Sales Overview',
        color: '#fff',
        font: { size: 18 },
      },
    },
    scales: {
      x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
      y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
    },
  };

  // Pie Chart Data (Expenses)
  const expensesData = {
    labels: ['Fuel Expense', 'Food Expense', 'Maintenance', 'Miscellaneous'],
    datasets: [
      {
        label: 'Expenses',
        data: [15000, 8000, 5000, 2000],
        backgroundColor: [
          'rgba(250, 115, 5, 0.7)',
          'rgba(187, 108, 67, 0.7)',
          'rgba(13, 110, 253, 0.7)',
          'rgba(44, 84, 60, 0.7)',
        ],
        borderColor: [
          'rgba(250, 115, 5, 1)',
          'rgba(187, 108, 67, 1)',
          'rgba(13, 110, 253, 1)',
          'rgba(44, 84, 60, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const expensesOptions = {
    responsive: true,
    maintainAspectRatio: false, // allow custom height
    plugins: {
      legend: {
        labels: { color: '#fff' },
      },
      title: {
        display: true,
        text: 'Expenses Breakdown',
        color: '#fff',
        font: { size: 18 },
      },
    },
  };

  return (
    <div className="bg-light" style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <div style={{ width: 'calc(100vw - 220px)' }}>
          {/* Top Cards */}
          {/* <h3 className='text-secondary text-center mt-3'>Dashboard</h3> */}
          {/* <h4 className="text-info m-3">
            {new Date().toLocaleDateString("en-US", { weekday: "long" })}
          </h4> */}
          <div
            className="d-flex flex-row justify-content-around align-items-center flex-wrap"
            style={{ padding: '20px' }}
          >

            <D_Card_Primary
              color="rgba(25, 135, 84, 0.8)"
              name="Sales"
              amount="100000"
            />
            <D_Card_Primary
              color="rgba(220, 53, 69, 0.8)"
              name="Expenses"
              amount="50000"
            />
          </div>

          {/* Charts */}
          <div
            className="d-flex flex-row flex-wrap justify-content-around align-items-start gap-4 p-4"
            style={{ marginTop: '20px' }}
          >
            {/* Bar Chart */}
            <div
              className=" p-3 rounded shadow "
              style={{ width: '38%', height: '260px', backgroundColor: 'rgba(108, 117, 125,0.4)' }} // fixed height
            >
              <Bar data={salesData} options={salesOptions} />
            </div>

            {/* Pie Chart */}
            <div
              className=" p-3 rounded shadow"
              style={{ width: '38%', height: '260px', backgroundColor: 'rgba(108, 117, 125,0.4)' }} // fixed height
            >
              <Pie data={expensesData} options={expensesOptions} />
            </div>
          </div>
          <div className="w-50  d-flex flex-row align-items-center justify-content-around p-3 mt-4 ">
            <button className='btn border border-primary btn-primary shadow bg-opacity-75'>
              <CartPlus size={20} className=" m-2 text-light" />
              <span className="text-light">Add Sales</span>
            </button>
            <button className='btn border border-primary btn-primary shadow bg-opacity-75'>
              <CashStack size={20} className="m-2 text-light" />
              <span className="text-light">Add Expenses</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
