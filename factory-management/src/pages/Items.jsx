import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { PlusCircle, PlusCircleFill } from 'react-bootstrap-icons'
import { Form, Modal } from 'react-bootstrap'
import axios from 'axios'
import { useEffect } from 'react'

const Items = () => {
  const [showAddItem, setShowAddItem] = useState(false);
  const [itemName, setItemName] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [items,setItems] = useState([{}]);

  useEffect(()=>{
    const getItems = async()=>{
      try{
        const result = await axios.get('http://localhost:3000/get_items');
        setItems(result.data.items);
      }catch(err){
        console.log(err);
      }
    }
    getItems();
  },[])

  const handleSaveItem = async()=>{
    if (!itemName) {
      setMessage('Item name is required');
      setShowMessage(true);
      return;
    }
    
    try {
      const data = await axios.post('http://localhost:3000/add_item', { name: itemName },{withCredentials: true});

      
      if (data.status) {
        setMessage('Item added successfully');
        setShowMessage(true);
        setItemName('');
      } else {
        setMessage(data.message || 'Failed to add item');
        setShowMessage(true);
      }
    } catch (error) {
      console.error('Error adding item:', error);
      setMessage('Internal server error');
      setShowMessage(true);
    }
    setShowAddItem(false);
  }
  return (
    <>
    <Navbar/>
    <div className='d-flex flex'>
    <div className='' style={{width: '220px',flexShrink: '0'}}>
    <Sidebar/>
    </div>
    <div className='d-flex flex-row' style={{flexGrow: '1', padding: '20px',width:'100%'}}>
     <div style={{width:'83%'}}>
      <h3 className='text-secondary'>Items</h3>
      <table className='table table-secondary table-striped rounded shadow'>
        <thead className=''>
            <tr>
              <td>Item ID</td>
              <td>Item Name</td>
            </tr>
        </thead>
      <tbody>

      {items.map((item,index)=>(
        <tr>
          <td>{item.id}</td>
          <td>{item.name}</td>
        </tr>
      ))}
      </tbody>
      </table>
     </div>
     <div onClick={()=>setShowAddItem(true)} className='btn btn-primary' style={{width:'17%',height:'7vh'}}>
      <div className=''><PlusCircle className='mx-1' size={25}/> <span className=''>Add Item</span> </div>
      </div> 
    </div>

    </div>
    <Modal show={showAddItem} onHide={() => setShowAddItem(false)} centered>
      <Modal.Header closeButton>  
        <Modal.Title>Add Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formItemName">
            <Form.Label>Item Name</Form.Label>
            <Form.Control type="text" placeholder="Enter item name" 
            onChange={(e) => setItemName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-secondary' onClick={() => setShowAddItem(false)}>Close</button>
        <button onClick={handleSaveItem} className='btn btn-primary'>Save</button>
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
          <button className='btn btn-secondary' onClick={() => setShowMessage(false)}>Close</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Items