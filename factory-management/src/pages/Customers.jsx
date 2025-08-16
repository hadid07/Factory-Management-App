// import React, { useState, useEffect } from 'react'
// import Navbar from '../components/Navbar'
// import Sidebar from '../components/Sidebar'
// import { InfoCircleFill, PersonPlus, TrashFill } from 'react-bootstrap-icons'
// import Search_Customers from '../components/Search_Customers'
// import { Modal, Form } from 'react-bootstrap'
// import axios from 'axios'

// const Customers = () => {
//   const [showAddCustomer, setShowAddCustomer] = useState(false);
//   const [showMessage, setShowMessage] = useState(false);
//   const [message, setMessage] = useState('');
//   const [areas, setAreas] = useState([]);
//   const [customers, setCustomers] = useState([{}]);
//   const [selectedArea, setSelectedArea] = useState('');
//   // form state
//   const [customerData, setCustomerData] = useState({
//     name: "",
//     area: ""
//   });

//   useEffect(() => {
//     const getAreas = async () => {
//       try {
//         const result = await axios.get('http://localhost:3000/get_areas', { withCredentials: true });
//         setAreas(result.data.areas);

//         console.log(result.data.areas);
//       } catch (error) {
//         console.error('Error fetching areas:', error);


//       }
//     };

//     const getCustomers = async () => {
//       try {
//         const result = await axios.get('http://localhost:3000/get_all_customers', { withCredentials: true });
//         setCustomers(result.data.customers);
//         console.log(result.data.customers);
//       } catch (error) {
//         console.error('Error fetching customers:', error);
//       }
//     }

//     getAreas();
//     getCustomers();
//   }, []);

//   useEffect(() => {
//     const getCustomersByArea = async () => {

//       if (selectedArea) {
//         const result = await axios.get(`http://localhost:3000/get_customers_by_area/${selectedArea}`, { withCredentials: true });
//         if (result.data.status) {
//           setCustomers(result.data.customers);
//         } else {

//           const response = await axios.get('http://localhost:3000/get_all_customers', { withCredentials: true });
//           setCustomers(response.data.customers);
//         }
//       }
//     }
//     getCustomersByArea();
//   }, [selectedArea])

//   const handleChange = (e) => {
//     setCustomerData({ ...customerData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Submitting customer:", customerData);

//     try {
//       const result = await axios.post("http://localhost:3000/add_customer", customerData, { withCredentials: true });
//       // alert("Customer added successfully!");
//       const NewCustomer = result.data.customer;
//       setShowAddCustomer(false);
//       setMessage(result.data.message);
//       setCustomerData({ name: "", area: "" }); // reset form
//       setCustomers([...customers, NewCustomer]);
//     } catch (error) {
//       console.error("Error adding customer:", error);
//       setMessage("Failed to add customer. Please try again.");
//       // alert("Failed to add customer");
//     }
//     setShowMessage(true);

//   };
//   const handleAreaChange = (e) => {
//     setSelectedArea(e.target.value);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className='d-flex flex-row ' style={{ width: '100%' }}>
//         <div style={{ width: '220px', flexShrink: 0 }}>
//           <Sidebar />
//         </div>
//         <div style={{ flexGrow: 1, padding: '20px' }}>
//           <Search_Customers />
//           <div className='d-flex m-3 flex-row ' style={{ width: '100%', height: 'auto' }}>
//             <div className='border border-danger mx-1' style={{ width: '18%' }} >
//               <h5 className='text-center text-primary'>Select Area</h5>
//               <div className="mb-3">
//                 {/* please read this comment add a option of view all and if click on view all all custiomers are shown again like how it shows first time */}
//                 <label className="form-label">Areas</label>
//                 <Form.Check
//                   type="radio"
//                   label="View All"
//                   name="area"
//                   value="" // empty value indicates all areas
//                   checked={selectedArea === ''}
//                   onChange={handleAreaChange}
//                 />
//                 {areas.map((area, index) => (
//                   <Form.Check
//                     type="radio"
//                     label={area.name}
//                     key={index}
//                     name="area"
//                     value={area.name}   // send area id to backend
//                     checked={customerData.area === area._id}
//                     onChange={handleAreaChange}
//                   />
//                 ))}
//               </div>
//             </div>
//             <div className=' mx-1' style={{ width: '70%', maxHeight: '70vh', overflowY: 'auto' }}>
//               <table className='table table-light rounded shadow table-striped' style={{ overflowY: 'auto' }}>
//                 <thead className='bg-primary text-white'>
//                   <tr>
//                     <td>Customer Name</td>
//                     <td>Area</td>
//                     <td>Give/Take</td>
//                     <td>Details</td>
//                     <td>Delete</td>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {customers.map((customer, index) => (
//                     <tr key={index}>
//                       <td>{customer.name}</td>
//                       <td>{customer.area}</td>
//                       <td>{customer.money}</td>
//                       <td><InfoCircleFill /></td>
//                       <td><TrashFill /></td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <div
//               onClick={() => setShowAddCustomer(true)}
//               className='btn btn-primary mx-1 d-flex align-items-center p-2'
//               style={{ minWidth: '12%', height: '10vh' }}
//             >
//               <PersonPlus className='text-llight' size={30} />
//               <span className='ms-1 text-light' style={{ fontSize: '0.90em' }}> Add Customer</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add Customer Modal */}
//       <Modal show={showAddCustomer} onHide={() => setShowAddCustomer(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Customer</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={handleSubmit}>
//             {/* Name Input */}
//             <div className="mb-3">
//               <label className="form-label">Customer Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="name"
//                 value={customerData.name}
//                 onChange={handleChange}
//                 placeholder="Enter customer name"
//                 required
//               />
//             </div>

//             {/* Area Options */}
//             <div className="mb-3">
//               <label className="form-label">Select Area</label>
//               {areas.map((area, index) => (
//                 <Form.Check
//                   type="radio"
//                   label={area.name}
//                   key={index}
//                   name="area"
//                   value={area.name}   // send area id to backend
//                   checked={customerData.area === area._id}
//                   onChange={handleChange}
//                 />
//               ))}
//             </div>

//             <button type="submit" className="btn btn-primary w-100">Add Customer</button>
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <button className="btn btn-danger" onClick={() => setShowAddCustomer(false)}>Close</button>
//         </Modal.Footer>
//       </Modal>

//       <Modal show={showMessage} onHide={() => setShowMessage(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Message</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>{message}</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <button className="btn btn-secondary" onClick={() => setShowMessage(false)}>Close</button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   )
// }

// export default Customers




import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { InfoCircleFill, PersonPlus, TrashFill } from 'react-bootstrap-icons';
import Search_Customers from '../components/Search_Customers';
import { Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const Customers = () => {
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [areas, setAreas] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');

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

  return (
    <>
      <Navbar />
      <div className='d-flex flex-row' style={{ width: '100%' }}>
        <div style={{ width: '220px', flexShrink: 0 }}>
          <Sidebar />
        </div>
        <div style={{ flexGrow: 1, padding: '20px' }}>
          <Search_Customers />
          <div className='d-flex m-3 flex-row ' style={{ width: '100%', height: 'auto' }}>
            
            {/* Area Filter */}
            <div className='m-2 border border-secondary bg-secondary text-light rounded shadow p-2 mx-1' style={{ width: '18%' ,height:'70vh' }}>
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
              <table className='table table-light rounded shadow table-striped'>
                <thead className='bg-primary text-white'>
                  <tr>
                    <td>Customer Name</td>
                    <td>Area</td>
                    <td>Give/Take</td>
                    <td>Details</td>
                    <td>Delete</td>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, index) => (
                    <tr key={index}>
                      <td>{customer.name}</td>
                      <td>{customer.area}</td>
                      <td>{customer.money}</td>
                      <td><InfoCircleFill /></td>
                      <td><TrashFill /></td>
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

            <div className="mb-3">
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
    </>
  );
};

export default Customers;
