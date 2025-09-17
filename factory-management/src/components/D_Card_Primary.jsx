import React from 'react'

const D_Card_Primary = (props) => {
  return (
    <div className='d-flex flex-column shadow ' style={{backgroundColor:props.color, borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)',width:'30%',border:`2px solid ${props.border}`}}>


        <h6 className=' fw-bold text-center' style={{color:props.border}}>{props.name} </h6>
        <h3 className=' fw-bold text-center' style={{color:props.border}}>{props.amount}</h3>
        </div>

  )
}

export default D_Card_Primary