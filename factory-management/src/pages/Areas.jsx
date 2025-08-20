import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { Trash3Fill } from 'react-bootstrap-icons';
import { Modal } from 'react-bootstrap';

const Areas = () => {
  const [areas, setAreas] = useState([]);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [deleteArea, setDeleteArea] = useState('');
  const [showDeleteArea, setShowDeleteArea] = useState(false);
  const [areaName, setAreaName] = useState('');

  // Fetch areas on mount
  useEffect(() => {
    const getAreas = async () => {
      try {
        const result = await axios.get('http://localhost:3000/get_areas', { withCredentials: true });
        setAreas(result.data.areas);
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };
    getAreas();
  }, []);

  // Add new area
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        'http://localhost:3000/add-area',
        { areaName },
        { withCredentials: true }
      );

      if (result.data.status) {
        // use backend response area object
        setAreas((prev) => [...prev, result.data.area]);
        setMessage(result.data.message);
        setShowMessage(true);
      } else {
        setMessage(result.data.message || 'Failed to add area');
        setShowMessage(true);
      }

      setAreaName('');
    } catch (err) {
      console.error('Error adding area:', err);
      setMessage('Error adding area');
      setShowMessage(true);
    }
  };

  // Show delete modal
  const handleDelete = (areaName) => {
    setDeleteArea(areaName);
    setShowDeleteArea(true);
  };

  // Confirm delete
  const handleDeleteArea = async () => {
    try {
      const result = await axios.delete(`http://localhost:3000/delete-area/${deleteArea}`, { withCredentials: true });
      if (result.data.status) {
        setMessage(result.data.message);
        setAreas(areas.filter((area) => area.name !== deleteArea));
      } else {
        setMessage(result.data.message);
      }
    } catch (error) {
      console.error('Error deleting area:', error);
      setMessage('Error deleting area');
    } finally {
      setShowDeleteArea(false);
      setShowMessage(true);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="d-flex flex-row" style={{ width: '100%' }}>
        <div style={{ width: '220px' }}>
          <Sidebar />
        </div>

        <div className="flex-grow-1 p-4" style={{ backgroundColor: '#f8f9fa', overflowY: 'hidden' }}>
          {/* Form */}
          <div
            className="card shadow-lg p-4 mb-5"
            style={{ maxWidth: '500px', margin: '0 auto', borderRadius: '12px', backgroundColor: 'rgb(211,211,211)' }}
          >
            <h4 className="text-center text-secondary mb-4">Add New Area</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Area Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name of area"
                  value={areaName}
                  onChange={(e) => setAreaName(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn w-100" style={{ backgroundColor: '#343a40', color: 'white' }}>
                Add Area
              </button>
            </form>
          </div>

          {/* Scrollable Table */}
          <div
            className="card shadow-sm p-3"
            style={{ backgroundColor: 'rgb(211,211,211)', maxWidth: '80%', margin: '0 auto', borderRadius: '12px' }}
          >
            <h5 className="mb-3 text-secondary">Areas List</h5>
            <div style={{ maxHeight: '30vh', overflowY: 'auto' }}>
              <table className="table table-hover mb-0" style={{ backgroundColor: '#343a40', color: 'white' }}>
                <thead className="sticky-top" style={{ backgroundColor: '#343a40' }}>
                  <tr>
                    <th>Area Name</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {areas.map((area, index) => (
                    <tr key={index}>
                      <td>{area.name}</td>
                      <td
                        onClick={() => handleDelete(area.name)}
                        className="text-danger"
                        style={{ cursor: 'pointer' }}
                      >
                        <Trash3Fill size={20} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

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

      {/* Delete Modal */}
      <Modal show={showDeleteArea} onHide={() => setShowDeleteArea(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Area</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete Area <strong className='text-danger'>{deleteArea}</strong>?
          </p>
          <button className="btn btn-danger" onClick={handleDeleteArea}>
            Delete
          </button>
          <button className="btn btn-secondary ms-2" onClick={() => setShowDeleteArea(false)}>
            Cancel
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Areas;
