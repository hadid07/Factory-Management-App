import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { CartPlusFill, CashStack, EyeFill, EyeSlashFill, InfoCircleFill, PersonPlus, TrashFill, ViewList } from 'react-bootstrap-icons';
import { Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const Customers = () => {
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showdeleteCustomer, setShowDeleteCustomer] = useState(false);
  const [deleteCustomerName, setDeleteCustomerName] = useState('');
  const [deleteCustomerArea, setDeleteCustomerArea] = useState('');
  const [message, setMessage] = useState('');
  const [areas, setAreas] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 state for search bar

  // Form state for adding a customer
  const [customerData, setCustomerData] = useState({
    name: "",
    area: ""
  });

  // Fetch areas and all customers on mount
  useEffect(() => {
    const getAreas = async () => {
      try {
        const result = await axios.get('http://localhost:3000/get_areas', { withCredentials: true });
        setAreas(result.data.areas);
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    const getCustomers = async () => {
      try {
        const result = await axios.get('http://localhost:3000/get_all_customers', { withCredentials: true });
        setCustomers(result.data.customers);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    }

    getAreas();
    getCustomers();
  }, []);

  // Fetch customers by selected area
  useEffect(() => {
    const getCustomersByArea = async () => {
      try {
        if (selectedArea) {
          const result = await axios.get(`http://localhost:3000/get_customers_by_area/${selectedArea}`, { withCredentials: true });
          if (result.data.status) {
            setCustomers(result.data.customers);
          } else {
            const response = await axios.get('http://localhost:3000/get_all_customers', { withCredentials: true });
            setCustomers(response.data.customers);
          }
        } else {
          // View All
          const response = await axios.get('http://localhost:3000/get_all_customers', { withCredentials: true });
          setCustomers(response.data.customers);
        }
      } catch (error) {
        console.error('Error fetching customers by area:', error);
      }
    }
    getCustomersByArea();
  }, [selectedArea]);

  // Handle form input changes
  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  // Handle area radio change (for filtering)
  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  };

  // Handle add customer form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post("http://localhost:3000/add_customer", customerData, { withCredentials: true });
      const newCustomer = result.data.customer;
      setShowAddCustomer(false);
      setMessage(result.data.message);
      setCustomerData({ name: "", area: "" });
      setCustomers([...customers, newCustomer]);
    } catch (error) {
      console.error("Error adding customer:", error);
      setMessage("Failed to add customer. Please try again.");
    }
    setShowMessage(true);
  };

  const ShowdeleteCustomer = async (name, area) => {
    setDeleteCustomerName(name);
    setDeleteCustomerArea(area);
    setShowDeleteCustomer(true);
  }

  const handleDeleteCustomer = async () => {
    try {
      const result = await axios.post("http://localhost:3000/delete_customer", { name: deleteCustomerName, area: deleteCustomerArea }, { withCredentials: true });
      if (result.data.status) {
        setMessage(result.data.message);
        setCustomers(customers.filter(customer => !(customer.name === deleteCustomerName && customer.area === deleteCustomerArea)));
      } else {
        setMessage(result.data.message);
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
      setMessage("Failed to delete customer. Please try again.");
    }
    setShowDeleteCustomer(false);
    setShowMessage(true);
  }

  // 🔍 Filtered customers by search term
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className='d-flex flex-row' style={{ width: '100%' }}>
        <div style={{ width: '220px', flexShrink: 0 }}>
          <Sidebar />
        </div>
        <div style={{ flexGrow: 1, padding: '20px' }}>
          {/* Search bar */}
          <div className='d-flex flex-row align-items-center justify-content-center mx-auto ' style={{ width: '50%', height: '7vh' }}>
            <input
              type="text"
              placeholder="Search Customers"
              className="border border-secondary m-auto form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className='d-flex m-3 flex-row ' style={{ width: '100%', height: 'auto' }}>
            
            {/* Area Filter */}
            <div className='m-2 border border-secondary bg-secondary text-light rounded shadow p-2 mx-1' style={{ width: '18%' ,height:'70vh',overflowY:'auto' }}>
              <h5 className='text-center text-light'>Select Area</h5>
              <div className="mb-3">
                <label className="form-label">Areas</label>
                <Form.Check
                  type="radio"
                  label="View All"
                  name="area"
                  value=""
                  checked={selectedArea === ''}
                  onChange={handleAreaChange}
                />
                {areas.map((area) => (
                  <Form.Check
                    type="radio"
                    label={area.name}
                    key={area._id}
                    name="area"
                    value={area.name}
                    checked={selectedArea === area.name}
                    onChange={handleAreaChange}
                  />
                ))}
              </div>
            </div>

            {/* Customer Table */}
            <div className='m-2' style={{ width: '70%', maxHeight: '70vh', overflowY: 'auto' }}>
              <table className='table table-secondary rounded shadow table-striped'>
                <thead className='bg-primary text-white'>
                  <tr>
                    <td>Customer Name</td>
                    <td>Area</td>
                    <td>Give/Take</td>
                    <td>+Sale</td>
                    <td>+Expense</td>
                    <td>Details</td>
                    <td>Delete</td>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer, index) => (
                    <tr key={index}>
                      <td className='' >{customer.name}</td>
                      <td className='' >{customer.area}</td>
                      <td className='text-center' >{customer.money}</td>
                      <td className='text-center' ><CartPlusFill/> </td>
                      <td className='text-center' ><CashStack/></td>
                      <td className='text-center' ><EyeFill /></td>
                      <td onClick={() => ShowdeleteCustomer(customer.name, customer.area)}><TrashFill /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Customer Button */}
            <div
              onClick={() => setShowAddCustomer(true)}
              className='btn btn-primary m-2 d-flex align-items-center p-2'
              style={{ minWidth: '12%', height: '10vh' }}
            >
              <PersonPlus className='text-light' size={30} />
              <span className='ms-1 text-light' style={{ fontSize: '0.90em' }}>Add Customer</span>
            </div>

          </div>
        </div>
      </div>

      {/* Add Customer Modal */}
      <Modal show={showAddCustomer} onHide={() => setShowAddCustomer(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Customer Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={customerData.name}
                onChange={handleChange}
                placeholder="Enter customer name"
                required
              />
            </div>

            <div className="mb-3" style={{ maxHeight: '25vh', overflowY: 'auto' }}>
              <label className="form-label">Select Area</label>
              {areas.map((area) => (
                <Form.Check
                  type="radio"
                  label={area.name}
                  key={area._id}
                  name="area"
                  value={area.name}   // send area name or _id to backend
                  checked={customerData.area === area.name}
                  onChange={handleChange}
                  required
                />
              ))}
            </div>

            <button type="submit" className="btn btn-primary w-100">Add Customer</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={() => setShowAddCustomer(false)}>Close</button>
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
          <button className="btn btn-secondary" onClick={() => setShowMessage(false)}>Close</button>
        </Modal.Footer>
      </Modal>
      <Modal show={showdeleteCustomer} onHide={() => setShowDeleteCustomer(false)} centered>
        <Modal.Header closeButton>  
          <Modal.Title>Delete Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete customer <strong className='text-danger'>{deleteCustomerName}</strong> from area <strong className='text-danger'>{deleteCustomerArea}</strong>?</p>
          <button className="btn btn-danger" onClick={handleDeleteCustomer}>Delete</button>
          <button className="btn btn-secondary ms-2" onClick={() => setShowDeleteCustomer(false)}>Cancel</button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Customers;
