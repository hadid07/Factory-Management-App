import React, { useEffect, useState } from 'react'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { CartPlus, TrashFill } from 'react-bootstrap-icons'
import axios, { Axios } from 'axios'
import { Modal, Form, Button } from 'react-bootstrap';


const Sales = () => {
   const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
  const [sales, setSales] = useState([]);
  const [addSale, setAddSale] = useState(false);
  const [items, setItems] = useState([]);
  const [customerName, setCustomerName] = useState("CashCustomer");
  const [customerArea, setCustomerArea] = useState("");
  const [description, setDescription] = useState("Regular");
  const [saleAmounts, setSaleAmounts] = useState([]);
  const [totalSale, setTotalSale] = useState(0);
  const [credit, setCredit] = useState('');

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // months start at 0
  const dd = String(today.getDate()).padStart(2, '0');
  const localDate = `${yyyy}-${mm}-${dd}`;
  const [date, setDate] = useState(localDate);
  const [showDeleteModal,setShowDeleteModal] = useState(false);
  const [deleteSale,setDeleteSale] = useState(null);

  useEffect(() => {
    const getSales = async () => {
      try {

        const result = await axios.get('http://localhost:3000/get_all_sales', { withCredentials: true });
        if (result.data.status) {
          setSales(result.data.sales);
        }

      } catch (err) {
        console.log({
          err,
          message: 'internal error'
        });
      }
    }

    const getItems = async () => {
      const res = await axios.get("http://localhost:3000/get_items", {
        withCredentials: true,
      });
      if (res.data.status) {
        // console.log(res.data.items)
        setItems(res.data.items);
      }
    };

    getSales();
    getItems();
  }, [])

  useEffect(() => {
  const total = saleAmounts.reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
  setTotalSale(total);
}, [saleAmounts]);


  const getLocalDateString = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // months start at 0
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

  const handleSaleClose = () => {
    setAddSale(false);          // close modal
    setDate(getLocalDateString());                // reset date
    setDescription("");         // reset description
    setSaleAmounts([]);         // reset sale amounts
    setCredit(0);              // reset credit
    setTotalSale(0);


  }

  
const handleSaleAmountChange = (name, value) => {
  const numericval = Number(value);
  setSaleAmounts((prev) => {
    
    const exists = prev.find(i => i.name === name);

    if (exists) { 
      return prev.map(i =>
        i.name === name ? { ...i, amount: numericval } : i
      );
    } else {
      return [...prev, { name, amount: numericval }];
    }
  });
};


const AddSale = async () => {
    try {
     const numericSales = saleAmounts.map((i)=>({name:i.name, amount:Number(i.amount) || 0}));

       const payload = {
      customerName,
      customerArea,
      description,
      sales: numericSales,       
      totalSale: Number(totalSale) || 0,
      credit: Number(credit) || 0,
      date,
      type: "sale",
    };
      console.log(payload);
      const res = await axios.post("http://localhost:3000/add_sale", payload, {
        withCredentials: true,
      });
      setMessage(res.data.message);
    } catch {
      setMessage("Error adding sale");
    }
    setAddSale(false);
    setShowMessage(true);
    // setTotalSale('');
    setSaleAmounts([])
    setDate(getLocalDateString());
    setCredit('');
  };
  const filteredSales = sales.filter((sale) => {
    const localSaleDate = new Date(sale.date).toLocaleDateString('en-CA'); // YYYY-MM-DD format
    return localSaleDate === date;
  }
);


const handleDelSale = (sale) => {
  setDeleteSale(sale);
  setShowDeleteModal(true);
  
} 

const confirmDelete = async () => {
  try {
    const result = await axios.post(  
      'http://localhost:3000/delete_sale',
      deleteSale,
      { withCredentials: true }
    )
    if (result.data.status) {
      setMessage(result.data.message)
      setShowMessage(true)

      // refresh list
      const res = await axios.get('http://localhost:3000/get_all_sales', {
        withCredentials: true,
      })
      if (res.data.status) {
        setSales(res.data.sales)
      }
    } else {
      setMessage('Could not delete Sale')
      setShowMessage(true)
    }
  } catch (err) {
    console.log(err)
    setMessage('Error deleting sale')
    setShowMessage(true)
  }
  setShowDeleteModal(false)
  setDeleteSale(null)
}

  
  return (
    <>
      <Navbar />
      <div className='d-flex flex-row' style={{ width: '100%' }}>
        <div className='' style={{ width: '220px' }}>
          <Sidebar />
        </div>
        <div className='p-3' style={{ width: '100%' }}>

          <div className=' mx-5 d-flex justify-content-between' style={{ width: '' }} >
            <input className='border-2 border-primary rounded p-2' type="date" name="date" id="" value={date} onChange={(e) => setDate(e.target.value)} />
            <div className='p-2 btn btn-primary' onClick={()=>setAddSale(true)}>
              <CartPlus className='m-1' size={20} />
              <span className='text-light text-center'>Add Sale</span>
            </div>
          </div>

          <div className='mt-3'>
            <div className='mt-3' style={{ maxHeight: '70vh', overflowY: 'auto' }}>

              <table className='table table-secondary table-striped shadow rounded'>
                <thead>
                  <tr>
                    <td>Date</td>
                    <td>Name</td>
                    <td>Area</td>
                    <td>Description</td>
                    <td>Sale Amount</td>
                    <td>Credit</td>
                    <td>Remaining</td>
                    <td>Delete</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    filteredSales.map((sale) => (
                      <tr key={sale.id || `${sale.customername}-${sale.customerarea}-${sale.date}`}>
                        <td>{sale.date}</td>
                        <td>{sale.customername}</td>
                        <td>{sale.customerarea}</td>
                        <td>{sale.description}</td>
                        <td>{sale.saleamount}</td>
                        <td>{sale.credit}</td>
                        <td>{sale.saleamount - sale.credit}</td>
                        <td onClick={()=>handleDelSale(sale)}><TrashFill/></td>

                      </tr>
                    ))
                  }
                </tbody>

              </table>
            </div>
          </div>
        </div>

      </div>
      {/* Add Sale Modal */}
      <Modal show={addSale} onHide={handleSaleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Sale</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex">
              <Form.Group className="mb-3 me-2" style={{ flex: 1 }}>
                <Form.Label>Customer Name</Form.Label>
                <Form.Control type="text" value={customerName} readOnly />
              </Form.Group>
              <Form.Group className="mb-3" style={{ flex: 1 }}>
                <Form.Label>Customer Area</Form.Label>
                <Form.Control type="text" value={customerArea} onChange={(e) => setCustomerArea(e.target.value)} />
              </Form.Group>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            {items.map((item) => (
              <Form.Group className="mb-3" key={item.id}>
                <Form.Label>{`${item.name} Sale Amount`}</Form.Label>
                <Form.Control
                  type="number"
                  value={saleAmounts.find(i => i.name === item.name)?.amount || ''}
                  onChange={(e) => handleSaleAmountChange(item.name, e.target.value)
                  }
                />
              </Form.Group>
            ))}

            <Form.Group className="mb-3">
              <Form.Label>
                <strong>Total Sale Amount</strong>
              </Form.Label>
              <Form.Control type="number" value={totalSale} readOnly />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Credit</Form.Label>
              <Form.Control
                type="number"
                value={credit}
                onChange={(e) => setCredit(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAddSale(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={AddSale}>
            Save Sale
          </Button>
        </Modal.Footer>
      </Modal>

       {/* Message Modal */}
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

            {/* Delete Confirm Modal */}
                  <Modal
                    show={showDeleteModal}
                    onHide={() => setShowDeleteModal(false)}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Are you sure you want to delete this expense?
                    </Modal.Body>
                    <Modal.Footer>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setShowDeleteModal(false)}
                      >
                        Cancel
                      </button>
                      <button className="btn btn-danger" onClick={confirmDelete}>
                        Delete
                      </button>
                    </Modal.Footer>
                  </Modal>
    </>
  )
}

export default Sales