import React, { useEffect, useState } from 'react'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { CartPlus } from 'react-bootstrap-icons'
import axios from 'axios'

const Sales = () => {
  const [sales,setSales] = useState([]);
  

  const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0'); // months start at 0
const dd = String(today.getDate()).padStart(2, '0');
const localDate = `${yyyy}-${mm}-${dd}`;
const [date, setDate] = useState(localDate);

  useEffect(()=>{
    const getSales = async()=>{
      try{

        const result = await axios.get('http://localhost:3000/get_all_sales',{withCredentials:true});
        if(result.data.status){
          setSales(result.data.sales);
        }
        
        }catch(err){
          console.log({
            err,
            message:'internal error'
          });
      }
    }
    getSales()
  },[])
const filteredSales = sales.filter((sale) => {
  const localSaleDate = new Date(sale.date).toLocaleDateString('en-CA'); // YYYY-MM-DD format
  return localSaleDate === date;
});



  return (
    <>
      <Navbar />
      <div className='d-flex flex-row' style={{ width: '100%' }}>
        <div className='' style={{ width: '220px' }}>
          <Sidebar />
        </div>
        <div className='p-3' style={{width:'100%'}}>

          <div className=' mx-5 d-flex justify-content-between'style={{width:''}} >
            <input className='border-2 border-primary rounded p-2' type="date" name="date" id="" value={date} onChange={(e)=>setDate(e.target.value)} />
            <div className='p-2 btn btn-primary'>
              <CartPlus className='m-1' size={20}/>
              <span className='text-light text-center'>Add Sale</span>
            </div>
          </div>

          <div className='mt-3'>
            <div className='mt-3' style={{maxHeight:'70vh',overflowY:'auto'}}>

            <table className='table table-secondary table-striped shadow rounded'>
              <thead>
                <tr>
                  <td>Date</td>
                  <td>Name</td>
                  <td>Area</td>
                  <td>Description</td>
                  <td>Sale Amount</td>
                  <td>Credit</td>
                  <td>Remaining</td>
                </tr>
              </thead>
              <tbody>
                {
                  filteredSales.map((sale)=>(
                    <tr key={sale.id ||`${sale.customername}-${sale.customerarea}-${sale.date}`}>
                      <td>{sale.date}</td>
                      <td>{sale.customername}</td>
                      <td>{sale.customerarea}</td>
                      <td>{sale.description}</td>
                      <td>{sale.saleamount}</td>
                      <td>{sale.credit}</td>
                      <td>{sale.saleamount - sale.credit}</td>
                      
                    </tr>
                  ))
                }
              </tbody>

            </table>
                </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Sales