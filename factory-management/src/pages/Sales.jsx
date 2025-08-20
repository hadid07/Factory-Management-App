import React from 'react'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { CartPlus } from 'react-bootstrap-icons'

const Sales = () => {
  return (
    <>
      <Navbar />
      <div className='d-flex flex-row' style={{ width: '100%' }}>
        <div className='' style={{ width: '220px' }}>
          <Sidebar />
        </div>
        <div className='p-3' style={{width:'100%'}}>

          <div className=' mx-5 d-flex justify-content-between'style={{width:''}} >
            <input className='border-2 border-primary rounded p-2' type="date" name="date" id="" />
            <div className='p-2 btn btn-primary'>
              <CartPlus className='m-1' size={20}/>
              <span className='text-light text-center'>Add Sale</span>
            </div>
          </div>

          <div className='mt-3'>
            <table className='table table-secondary'>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Area</td>
                  <td>Description</td>
                  <td>Sale Amount</td>
                  <td>Credit</td>
                  <td>Credit Type</td>
                  <td>Remaining</td>
                </tr>
              </thead>

            </table>
          </div>
        </div>

      </div>
    </>
  )
}

export default Sales