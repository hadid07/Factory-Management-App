import React from 'react'

const Search_Customers = () => {
  return (
    <div className='d-flex flex-row align-items-center justify-content-center mx-auto ' style={{ width: '50%',height:'7vh' }}>
        <input type="text" placeholder="Search Customers" className="border border-secondary m-auto form-control" />
        <button className="btn btn-primary mx-2 my-auto">Search</button>
    </div>
  )
}

export default Search_Customers