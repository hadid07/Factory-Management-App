import React from 'react'

const D_Card_Secondary = (props) => {
  return (
    <div className='d-flex flex-column my-3 bg-secondary' style={{ borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '30%'}}>
        <h6 className='text-center text-light'>{props.name}</h6>
        <h3 className='text-center text-light'>{props.amount}</h3>
    </div>
  )
}

export default D_Card_Secondary