import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useState } from 'react';
import { CashStack } from 'react-bootstrap-icons';
import { Table } from 'react-bootstrap';
import ExpenseModal from '../components/ExpenseModal';
import { useEffect } from 'react';
import axios from 'axios';


const Expenses = () => {
    const getLocalDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };
  const [date,setDate] = useState(getLocalDateString());
  const [showExpenseModal,setShowExpenseModal] = useState(false);
  const [items,setItems] = useState([]);
  const [expenses,setExpenses] = useState([]);

  useEffect(()=>{
    const getItems = async () => {
      const res = await axios.get("http://localhost:3000/get_items", {
        withCredentials: true,
      });
      if (res.data.status) {
        // console.log(res.data.items)
        setItems(res.data.items);
      }
    };
    const get_expenses = async()=>{
      try{
        const result = await axios.get('http://localhost:3000/get_all_expenses',{withCredentials:true});
        if(result.data.status){
          setExpenses(result.data.expenses);
          console.log(result.data.expenses);
        }
      }catch(err){
        console.log(err);}
      }

    getItems();
    get_expenses();
  },[])
const hide = ()=>{
  setShowExpenseModal(false);
  setDate(getLocalDateString());
}
// const handleAddExpense = ()=>{
//   setShowExpenseModal(true);
// }
  const filteredExpenses = expenses.filter((sale) => {
    const localSaleDate = new Date(sale.date).toLocaleDateString('en-CA'); // YYYY-MM-DD format
    return localSaleDate === date;
  });
  return (
    <>
    <Navbar/>
    <div className='d-flex flex-row'>
      <div className='flex-grow-0 ' style={{width:'220px'}}>
    <Sidebar/>
      </div>
      <div className='flex-grow-1 p-4' style={{backgroundColor:'',height:''}}>
        <div className='d-flex flex-row mx-5 justify-content-between'>
        <input type="date" name="date" className='border-2 border-primary rounded p-2' id="" value={date} onChange={(e)=>setDate(e.target.value)} />
        <div className='btn btn-primary' onClick={()=>setShowExpenseModal(true)}> <CashStack/> <span>Add Expense</span> </div>
        </div>
        <div>
          <Table className='table table-secondary table-striped shadow rounded mt-3'>
            <thead>
              <tr>
                <td>Date</td>
                <td>Customer Name</td>
                <td>Customer Area</td>
                <td>Deccription</td>
                <td>Type</td>
                <td>Expense Amount</td>
                <td>Debit</td>
                <td>Remaining</td>
              </tr>
            </thead>
            <tbody>
              {
                filteredExpenses.map((expense)=>(
                  <tr key={expense.id}>
                    <td>{new Date(expense.date).toLocaleDateString('en-CA')}</td>
                    <td>{expense.customername}</td>
                    <td>{expense.customerarea}</td>
                    <td>{expense.description}</td>
                    <td>{expense.expensetype}</td>
                    <td>{expense.expenseamount}</td>
                    <td>{expense.debit}</td>
                    <td>{Number(expense.expenseamount) - Number(expense.debit)}</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
      </div>

    </div>
    <ExpenseModal show={showExpenseModal} 
      hide={hide} date={date} items = {items}/>
   
    </>
  )
}

export default Expenses