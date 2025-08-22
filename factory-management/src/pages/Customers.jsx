import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  CartPlusFill,
  CashStack,
  EyeFill,
  PersonPlus,
  TrashFill,
} from "react-bootstrap-icons";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";

const Customers = () => {
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showDeleteCustomer, setShowDeleteCustomer] = useState(false);
  const [deleteCustomerName, setDeleteCustomerName] = useState("");
  const [deleteCustomerArea, setDeleteCustomerArea] = useState("");
  const [message, setMessage] = useState("");
  const [areas, setAreas] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [addSale, setAddSale] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerArea, setCustomerArea] = useState("");
  const [description, setDescription] = useState("");
  const [saleAmounts, setSaleAmounts] = useState([]);
  const [totalSale, setTotalSale] = useState(0);
  const [credit, setCredit] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [customerData, setCustomerData] = useState({ name: "", area: "" });

  // Fetch areas, customers, items
  useEffect(() => {
    const getAreas = async () => {
      const res = await axios.get("http://localhost:3000/get_areas", {
        withCredentials: true,
      });
      setAreas(res.data.areas);
    };

    const getCustomers = async () => {
      const res = await axios.get("http://localhost:3000/get_all_customers", {
        withCredentials: true,
      });
      setCustomers(res.data.customers);
    };

    const getItems = async () => {
      const res = await axios.get("http://localhost:3000/get_items", {
        withCredentials: true,
      });
      if (res.data.status) {
        setItems(res.data.items);
      }
    };

    getAreas();
    getCustomers();
    getItems();
  }, []);

  // Fetch customers by area
  useEffect(() => {
    const getCustomersByArea = async () => {
      if (selectedArea) {
        const res = await axios.get(
          `http://localhost:3000/get_customers_by_area/${selectedArea}`,
          { withCredentials: true }
        );
        if (res.data.status) {
          setCustomers(res.data.customers);
        }
      } else {
        const res = await axios.get("http://localhost:3000/get_all_customers", {
          withCredentials: true,
        });
        setCustomers(res.data.customers);
      }
    };
    getCustomersByArea();
  }, [selectedArea]);

  useEffect(() => {
  const total = saleAmounts.reduce(
    (sum, item) => sum + Number(item.amount || 0), 
    0
  );
  setTotalSale(total);
}, [saleAmounts]);

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/add_customer",
        customerData,
        { withCredentials: true }
      );
      setCustomers([...customers, res.data.customer]);
      setMessage(res.data.message);
      setShowAddCustomer(false);
      setCustomerData({ name: "", area: "" });
    } catch {
      setMessage("Failed to add customer.");
    }
    setShowMessage(true);
  };

  const ShowDeleteCustomer = (name, area) => {
    setDeleteCustomerName(name);
    setDeleteCustomerArea(area);
    setShowDeleteCustomer(true);
  };

  const handleDeleteCustomer = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/delete_customer",
        { name: deleteCustomerName, area: deleteCustomerArea },
        { withCredentials: true }
      );
      if (res.data.status) {
        setCustomers(
          customers.filter(
            (c) => !(c.name === deleteCustomerName && c.area === deleteCustomerArea)
          )
        );
      }
      setMessage(res.data.message);
    } catch {
      setMessage("Failed to delete customer.");
    }
    setShowDeleteCustomer(false);
    setShowMessage(true);
  };

  const handleClickAddSale = (name, area) => {
    setCustomerName(name);
    setCustomerArea(area);
    setAddSale(true);
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
  };

  const handleSaleClose =  ()=>{
     setAddSale(false);          // close modal
  setDate("");                // reset date
  setDescription("");         // reset description
  setSaleAmounts([]);         // reset sale amounts
  setCredit("");              // reset credit
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




  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="d-flex flex-row" style={{ width: "100%" }}>
        <div style={{ width: "220px", flexShrink: 0 }}>
          <Sidebar />
        </div>
        <div style={{ flexGrow: 1, padding: "20px" }}>
          {/* Search bar */}
          <div
            className="d-flex flex-row align-items-center justify-content-center mx-auto"
            style={{ width: "50%", height: "7vh" }}
          >
            <input
              type="text"
              placeholder="Search Customers"
              className="border border-secondary m-auto form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="d-flex m-3 flex-row" style={{ width: "100%" }}>
            {/* Area Filter */}
            <div
              className="m-2 border border-secondary bg-secondary text-light rounded shadow p-2"
              style={{ width: "18%", height: "70vh", overflowY: "auto" }}
            >
              <h5 className="text-center">Select Area</h5>
              <Form.Check
                type="radio"
                label="View All"
                name="area"
                value=""
                checked={selectedArea === ""}
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

            {/* Customer Table */}
            <div
              className="m-2"
              style={{ width: "70%", maxHeight: "70vh", overflowY: "auto" }}
            >
              <table className="table table-secondary rounded shadow table-striped">
                <thead className="bg-primary text-white">
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
                  {filteredCustomers.map((c, i) => (
                    <tr key={i}>
                      <td>{c.name}</td>
                      <td>{c.area}</td>
                      <td>{c.money}</td>
                      <td
                        className="text-center"
                        onClick={() => handleClickAddSale(c.name, c.area)}
                      >
                        <CartPlusFill />
                      </td>
                      <td className="text-center">
                        <CashStack />
                      </td>
                      <td className="text-center">
                        <EyeFill />
                      </td>
                      <td onClick={() => ShowDeleteCustomer(c.name, c.area)}>
                        <TrashFill />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Customer Button */}
            <div
              onClick={() => setShowAddCustomer(true)}
              className="btn btn-primary m-2 d-flex align-items-center p-2"
              style={{ minWidth: "12%", height: "10vh" }}
            >
              <PersonPlus size={30} className="text-light" />
              <span className="ms-1 text-light">Add Customer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Customer Modal */}
      <Modal show={showAddCustomer} onHide={() =>{ setShowAddCustomer(false)}} centered>
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
                required
              />
            </div>
            <div className="mb-3" style={{ maxHeight: "25vh", overflowY: "auto" }}>
              <label className="form-label">Select Area</label>
              {areas.map((area) => (
                <Form.Check
                  type="radio"
                  label={area.name}
                  key={area._id}
                  name="area"
                  value={area.name}
                  checked={customerData.area === area.name}
                  onChange={handleChange}
                  required
                />
              ))}
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Add Customer
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={() => setShowAddCustomer(false)}>
            Close
          </button>
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

      {/* Delete Customer Modal */}
      <Modal show={showDeleteCustomer} onHide={() => setShowDeleteCustomer(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete customer{" "}
            <strong className="text-danger">{deleteCustomerName}</strong> from area{" "}
            <strong className="text-danger">{deleteCustomerArea}</strong>?
          </p>
          <button className="btn btn-danger" onClick={handleDeleteCustomer}>
            Delete
          </button>
          <button className="btn btn-secondary ms-2" onClick={() => setShowDeleteCustomer(false)}>
            Cancel
          </button>
        </Modal.Body>
      </Modal>

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
                <Form.Control type="text" value={customerArea} readOnly />
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

            {items.map((item,index) => (
              <Form.Group className="mb-3" key={index}>
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
    </>
  );
};

export default Customers;
