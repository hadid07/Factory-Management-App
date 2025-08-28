import { Button, Form, Modal } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import axios from 'axios'

const ExpenseModal = (props) => {
  const getLocalDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [items, setItems] = useState([]);
  const [date, setDate] = useState(getLocalDateString());
  const [customerName, setCustomerName] = useState('');
  const [customerArea, setCustomerArea] = useState('');
  const [expenseType, setExpenseType] = useState('other');
  const [description, setDescription] = useState('')
  const [expenseAmount, setExpenseAmount] = useState('');
  const [debit, setDebit] = useState('');
  const [itemName,setItemName] = useState('')
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [customerID,setCustomerID] = useState(null);
  // Sync props with state when modal opens
  useEffect(() => {
    setItems(props.items)
    // console.log(props.items);
    if (props.customerName) setCustomerName(props.customerName);
    if (props.customerArea) setCustomerArea(props.customerArea);
    if (props.customerID) setCustomerID(props.customerID);
    // if (props.date) setDate(props.date);
  }, [props.customerName, props.customerArea, props.date, props.items,props.customerID]);

const payload = { 
        customerName :customerName,
        customerArea :customerArea,
        description :description,
        item :itemName,
        totalExpense :expenseAmount,
        debit :debit,
        date :date,
        expensetype: expenseType,
        customerid :customerID
      }

      const SaveExpense = async()=>{
        try{
          const result = await axios.post('http://localhost:3000/add_expense',payload,{withCredentials:true});
          if(result.data.status){
            setMessage('Expense Added Successfully');
            setShowMessage(true);
          }else{
            setMessage('Could not add Expense');
            setShowMessage(true);
          }
          props.hide();
        }catch(err){
          console.log(err);
          setMessage('Internal Server Error');
          setShowMessage(true);
          setCustomerArea('');
          setCustomerName('');
          setDate(getLocalDateString());
          setDescription('');
          setExpenseAmount('');
          setDebit('');
          setItemName('');
          setExpenseType('other');
          props.hide();
          
        }
      }
  const handleHide = () => {
    setCustomerArea('');
    setCustomerName('');
    setDate(getLocalDateString());
    setDescription('');
    setExpenseAmount('');
    setDebit('');
    setItemName('');
    setExpenseType('other');
    props.hide();}
  return (
    <div>
      <Modal show={props.show} onHide={handleHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex gap-3">

              <Form.Group>
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  readOnly={!!props.customerName} // readOnly if prop is passed
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Customer Area</Form.Label>
                <Form.Control
                  type="text"
                  value={customerArea}
                  onChange={(e) => setCustomerArea(e.target.value)}
                  readOnly={!!props.customerArea} // readOnly if prop is passed
                />
              </Form.Group>
            </div>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Select Expense Type</Form.Label>
              <div className="d-flex gap-3">
                <Form.Check
                  type="radio"
                  name="itemexpense"
                  label='Item Expense'
                  value='item'
                  checked={expenseType === 'item'}
                  onChange={(e) => setExpenseType(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  name="othrexpense"
                  label='Other/Company Expense'
                  value='other'
                  checked={expenseType === 'other'}
                  onChange={(e) => setExpenseType(e.target.value)}
                />

              </div>
            </Form.Group>
            {
              expenseType === 'item' ? (
                <div className="d-flex gap-3">
                <Form.Group>
                  <Form.Label>Item Expense Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={expenseAmount || ''}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Select</Form.Label>
                  <Form.Select
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  >
                    <option value=''>Select Item</option>
                    {items.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                    
                </Form.Group>
                    </div>
              ) : (
                <Form.Group>
                  <Form.Label>Other Expense Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={expenseAmount || ''}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                  />
                </Form.Group>
              )
            }

            <Form.Group>
              <Form.Label>Debit</Form.Label>
              <Form.Control
                type="text"
                value={debit}
                onChange={(e) => setDebit(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={SaveExpense}>Save Expense</Button>
          <Button variant="danger" onClick={props.hide}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showMessage} onHide={() => setShowMessage(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Message</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>{message}</p>
              </Modal.Body>
              <Modal.Footer>
                <button className="btn btn-secondary" onClick={() => setShowMessage(false)}>
                  Close
                </button>
              </Modal.Footer>
            </Modal>
    </div>
  );
};

export default ExpenseModal;
