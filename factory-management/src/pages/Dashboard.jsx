import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import D_Card_Primary from '../components/D_Card_Primary';
import { ArrowDownCircle, ArrowUpCircle, CartPlus,CashStack } from 'react-bootstrap-icons';

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
import axios from 'axios';

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
  const [totalSales,setTotalSales] = useState(0);
  const [totalExpenses,setTotalExpenses] = useState(0);
  const [totalCredit,setTotalCredit] = useState(0);
  const [totalDebit,setTotalDebit] = useState(0);
  const [itemSales,setItemSales] = useState([]);
  const [itemExpenses,setItemExpenses] = useState(0);
  const [otherExpenses,setOtherExpenses] = useState(0);
  const [items,setItems] = useState([]);
  const [itemLabels,setItemLabels] = useState([]);

useEffect(() => {
  const getData = async () => {
    try {
      const result = await axios.get('http://localhost:3000/get_dashboard_data', { withCredentials: true });
      if (result.data.status) {
        setTotalSales(result.data.totalSales);
        setTotalExpenses(result.data.totalExpenses);
        setTotalCredit(result.data.totalCredit);
        setTotalDebit(result.data.totalDebit);
        setItems(result.data.items);

        const itemLabelsArr = [];
        const itemSalesArr = [];
        const itemExpensesArr = [];

        const itemSE = result.data.itemSE;

        result.data.items.forEach(item => {
          itemLabelsArr.push(item.name);

          const totalSale = itemSE
            .filter(ise => ise.item === item.name && ise.type === 'sale')
            .reduce((sum, ise) => sum + ise.amount, 0);
          itemSalesArr.push(totalSale);

          const totalExpense = itemSE
            .filter(ise => ise.item === item.name && ise.type === 'expense')
            .reduce((sum, ise) => sum + ise.amount, 0);
          itemExpensesArr.push(totalExpense);
        });

        setItemLabels(itemLabelsArr);
        setItemSales(itemSalesArr);

        // Handle "other" and "item" expenses
        let otherExpense = 0;
        let itemExpense = 0;
        result.data.expenses.forEach(expense => {
          if(expense.expensetype === 'other') otherExpense += Number(expense.expenseamount);
          else if(expense.expensetype === 'item') itemExpense += Number(expense.expenseamount);
        });
        setOtherExpenses(otherExpense);
        setItemExpenses(itemExpense);

      }
    } catch (err) {
      console.log(err);
    }
  };

  getData();
}, []);

  // Bar Chart Data (Sales)
  const salesData = {
    labels: itemLabels,
    datasets: [
      {
        label: 'Sales',
        data: itemSales,
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
    labels: ['Item Expenses', 'Other/Factory Expenses'],
    datasets: [
      {
        label: 'Expenses',
        data: [itemExpenses, otherExpenses],
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
              color="rgba(25, 135, 84, 0.1)"
              name="Sales"
              amount={totalSales}
              border="rgb(25,135,84)"
            />
            <D_Card_Primary
              color="rgba(220, 53, 69, 0.1)"
              name="Expenses"
              amount={totalExpenses}
               border="rgb(220,53,69)"
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
            <div className='border border-success rounded shadow p-2 d--flex'>
              <ArrowUpCircle size={30} className="text-success" />
              <span className='text-center text-success mx-1'>
                Total Credit : <span className='fw-bold' >{totalCredit} </span> 
                </span>
            </div>
            {/* <div className="w-50  d-flex flex-row align-items-center justify-content-around p-3 mt-4 "> */}
            <div className='border border-success rounded shadow p-2 d--flex'>
              <ArrowDownCircle size={30} className="text-danger" />
              <span className='text-center text-danger mx-1'>
                Total Debit : <span className='fw-bold'> {totalDebit} </span> 
                </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
