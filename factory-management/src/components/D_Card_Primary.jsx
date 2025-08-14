import React from 'react'

const D_Card_Primary = (props) => {
  return (
    <div className='d-flex flex-column ' style={{backgroundColor:props.color, borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)',width:'30%'}}>
        <h6 className='text-light text-center'>{props.name}</h6>
        <h3 className='text-light text-center' style={{color:"#343a40"}}>{props.amount}</h3>
    </div>
  )
}

export default D_Card_Primary