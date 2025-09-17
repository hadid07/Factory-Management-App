import axios, { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap'
import Report from './Report';

const ReportsModal = (props) => {
    const [items,setItems] = useState([]);
    const [remainingStock,setRemainingStock] = useState([]);
    const [fromDate,setFromDate] = useState('');
    const [toDate,setToDate] = useState('');
    const [data,setData] = useState({});
    const [reportModal,setReportModal] = useState(false);

    useEffect(()=>{
        const getItems = async()=>{
            const result = await axios.get('http://localhost:3000/get_items',{withCredentials:true});
            if(result.data.status){
                // console.log(result.data.items)
                setItems(result.data.items)
            }
        }
        getItems();
    },[])

    const handleRSchange = (name, value) => {
    const numericval = Number(value);
    setRemainingStock((prev) => {

      const exists = prev.find(i => i.name === name);

      if (exists) {
        return prev.map(i =>
          i.name === name ? { ...i, amount: numericval } : i
        );
      } else {
        return [...prev, { name, amount: numericval }];
      }
    });
  };

  const GenerateReport = async()=>{
    const payload = {
        fromDate : fromDate,
        toDate : toDate,
        remainingStock : remainingStock
    }
    // console.log(payload)
    const result = await axios.post('http://localhost:3000/generateMonthlyReport',payload,{withCredentials:true});
    console.log(result.data);
    setData(result.data);
    setReportModal(true)
    handlehide();
    
  }
  const handlehide = ()=>{
    setFromDate('');
    setToDate('');
    setRemainingStock([]);
    props.hide();

  }

  return (
    <div>
      <Modal show={props.show} onHide={handlehide} centered>
        <ModalHeader closeButton>
          <ModalTitle>Generate Report</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <form>
            <div>
              <label htmlFor="fromdate">From : </label>
              <input type="date" name="fromdate" className='mx-1 p-1' value={fromDate} onChange={(e)=>setFromDate(e.target.value)} />
              <label htmlFor="todate">To : </label>
              <input type="date" name="todate" className='mx-1 p-1' value={toDate} onChange={(e)=>setToDate(e.target.value)} />
            </div>
            <h5 className='text-secondary my-2 ' >Enter Remaining Stock</h5>
            <div className='border-2 border-danger' style={{maxHeight:'30vh',overflowY:'auto'}}>
            {

                items.map((item)=>(

                    <div className='d-flex flex-row align-items-center justify-content-center my-1 ' >
                    <label htmlFor={item.name}>{item.name}</label>
                    <input type="number" name={item.name} id="" value={remainingStock.find(i => i.name === item.name)?.amount || ''} className='mx-2' onChange={(e)=>handleRSchange(item.name,e.target.value)} />
                    <br />
                    </div>
                )
                )

            }
                </div>

          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={GenerateReport} >Generate</Button>
          <Button variant="danger" onClick={handlehide}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Report show={reportModal} hide={()=>setReportModal(false)} data = {data} />
    </div>
  )
}

export default ReportsModal
