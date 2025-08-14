import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const Areas = () => {
  return (
    <div>
        <Navbar/>
        <div className='d-flex flex-row'>
          <div style={{width:'220px'}}>
        <Sidebar/>
          </div>
          <div>

          </div>
        </div>
    </div>
  )
}

export default Areas