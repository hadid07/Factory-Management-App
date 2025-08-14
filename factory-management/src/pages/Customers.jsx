import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Search,PersonPlus } from 'react-bootstrap-icons'
import Search_Customers from '../components/Search_Customers'
// import SearchBar_Customers from '../components/SearchBar_Customers'

const Customers = () => {
  return (
    <>
    <Navbar/>
    <div className='d-flex flex-row 'style={{width:'100%',}}>
      <div style={{width: '220px',flexShrink:0}}>
    <Sidebar/> 
      </div>
      <div style={{flexGrow:1,padding:'20px'}}>
    <Search_Customers/>
      <div className='d-flex m-3 flex-row border border-warning'style={{ width: '100%', height: 'auto' }}>
        <div className=' border border-danger mx-1' style={{width:'18%'}} >
          <h5>Select Area</h5>
          
        </div>
        <div className=' border border-danger mx-1' style={{width:'70%'}}></div>
        <div className=' btn border border-primary mx-1 d-flex p-2' style={{minwidth:'12%',height:'10vh'}}>
          <PersonPlus className='text-primary' size={30}/>
         <span className='ms-1 text-primary' style={{fontSize:'0.90em'}}> Add Customer</span>
        </div>
      </div>
      </div>
    </div>

    </>
  )
}

export default Customers