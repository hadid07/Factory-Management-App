import { Button, Form, Modal } from "react-bootstrap";

import React, { useState } from 'react'

const ExpenseModal = (props) => {
    const getLocalDateString = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // months start at 0
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};
    const [date,setDate] = useState(getLocalDateString());
    const [customerName,setCustomerName] = useState('');
    const [customerArea,setCustomerArea] = useState('');

  return (
    <div>
        <Modal show={props.show} onHide={props.hide} centered>
            <Modal.Header closeButton >
                <Modal.Title>Add Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control 
                            type="date"
                            value={date}
                            onChange={(e)=>setDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Customer Name</Form.Label>
                        {
                            props.customerName ? ()=>{setCustomerName(props.customerName);
                                 return(
                                <Form.Control 
                                type="text"
                                value={props.customerName}
                                readOnly />
                            ) }
                            : (<Form.Control
                                type="text"
                                value={customerName}
                                onChange={(e)=>setCustomerName(e.target.value)}
                                
                            />)
                        }
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Customer Area</Form.Label>
                        {
                            props.customerArea ? ()=>{
                                setCustomerArea(props.customerArea)
                                return(

                                    <Form.Control
                                    type="text"
                                    value={customerArea}
                                    readOnly
                                    />
                                )
                            }
                            :(
                                <Form.Control
                                type="text"
                                value={customerArea}
                                onChange={(e)=>setCustomerArea(e.target.value)}
                                />

                            )
                        }
                        
                    </Form.Group>
                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary">Save Expense</Button>
                <Button variant="danger" onClick={props.hide}>Close</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default ExpenseModal