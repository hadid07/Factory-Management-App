import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Button, Table } from 'react-bootstrap'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { PlusCircle, PlusCircleFill } from 'react-bootstrap-icons'
import ReportsModal from '../components/ReportsModal'

const Reports = () => {
  const [dailymonthlyToggle, setDailyMonthlyToggle] = useState(true);
  const [dailySale, setDailysale] = useState(0);
  const [dailyExpense, setDailyExpense] = useState(0);
  const [dailyDebit, setDailyDebit] = useState(0);
  const [dailyCredit, setDailyCredit] = useState(0);
  const [dailyItemsSE, setDailyItemsSE] = useState([]);
  const [showReportModal,setShowReportModal] = useState(false);

  const today = new Date();
  const currentMonth = today.toISOString().slice(0, 7); 

  const [monthDate, setMonthDate] = useState(currentMonth);

  const getLocalDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // months start at 0
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };
  const [dailydate, setDailydate] = useState(getLocalDateString());

  useEffect(() => {
    const getDailyReports = async () => {
      const result = await axios.get('http://localhost:3000/getDailyReports', { params: { date: dailydate }, withCredentials: true })
      if (result.data.status) {

        setDailysale(result.data.Sale);
        setDailyExpense(result.data.Expense);
        setDailyCredit(result.data.Credit);
        setDailyDebit(result.data.Debit);
        setDailyItemsSE(result.data.ItemsSaleExpense);
      }

    }

    getDailyReports()
  }, [dailydate])

  const onHideReport = ()=>{
    setShowReportModal(false)
  }

  return (
    <>
      <Navbar />
      <div className='d-flex flex-row'>
        <div style={{ width: "220px", flexShrink: 0 }}>
          <Sidebar />
        </div>
        <div className='' style={{ flexGrow: 1 }}>
          <div className='d-flex flex-row gap-3 m-3'>
            <Button variant='primary' className='shadow' onClick={() => setDailyMonthlyToggle(true)}>Daily</Button>
            <Button variant='primary' className='shadow' onClick={() => setDailyMonthlyToggle(false)}>Monthly</Button>
          </div>

          <div >
            {dailymonthlyToggle ? (
              <div >
                <div className='d-flex justify-content-between align-items-center mx-5'>
                  <h3 className='text-secondary my-3 text-center fw-bold'>Daily Analysis</h3>
                  <input className='mx-3 border-2 border-primary rounded p-2' type="date" name="dailydate" value={dailydate} onChange={(e) => setDailydate(e.target.value)} id="" />
                </div>
                <div className=' d-flex flex-wrap justify-content-center align-items-center my-3 mx-5 text-secondary'>
                  <div className='mx-5'>
                    <h5>Total Sale : {dailySale}</h5>
                    <span></span>
                  </div>
                  <div className='mx-5'>
                    <h5>Total Expense : {dailyExpense}</h5>
                    <span></span>
                  </div>
                  <div className='mx-5'>
                    <h5>Credit : {dailyCredit}</h5>
                    <span></span>
                  </div>
                  <div className='mx-5'>
                    <h5>Debit : {dailyDebit}</h5>
                    <span></span>
                  </div>

                </div>
                <div style={{ width: '60vw', margin: 'auto' }}>
                  <Table className='table table-secondary shadow table-striped'>
                    <thead className='fw-bold'>
                      <tr>
                        <td>Item</td>
                        <td>Expense</td>
                        <td>Sale</td>
                      </tr>
                    </thead>
                    <tbody>
                      {dailyItemsSE.map((SE) => (
                        <tr>
                          <td>{SE.Name}</td>
                          <td>{SE.Expense}</td>
                          <td>{SE.Sale}</td>

                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>

              </div>
            )
              : (
                <div className='d-flex flex-column '>
                  <div className='d-flex justify-content-between align-items-center mx-5'>
                    <h3 className='text-secondary my-3 text-center fw-bold'>Monthly Reports</h3>
                     </div>
                     <div className=' d-flex align-items-center justify-content-center mt-5' style={{width:'100%', height:'100%'}} >
                      <div onClick={()=>setShowReportModal(true)} className=' p-2 d-flex align-items-center justify-content-center shadow btn btn-primary'>
                      <PlusCircle size={25} color='white' />
                      <div className='ms-2' >Generate Report</div>
                      </div>
                     </div>
                </div>
              )

            }
          </div>

        </div>

      </div>
      <ReportsModal show = {showReportModal} hide = {onHideReport} />
    </>
  )
}

export default Reports