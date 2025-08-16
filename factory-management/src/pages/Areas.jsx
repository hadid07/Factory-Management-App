
import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import { useState } from 'react'
 import { Trash2Fill, Trash3, Trash3Fill, TrashFill } from 'react-bootstrap-icons'


const Areas = () => {
    const [areas, setAreas] = useState([])

  useEffect(() => {
  const getAreas = async () => {
    try {
      const result = await axios.get('http://localhost:3000/get_areas', { withCredentials: true });
      setAreas(result.data.areas);
      console.log(result.data.areas);
    } catch (error) {
      console.error('Error fetching areas:', error);
    }
  };

  getAreas();
}, []);


  const [areaName,setAreaName] = useState('');
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const result = await axios.post(
      'http://localhost:3000/add-area',
      { areaName },
      { withCredentials: true }
    );

    // Update the areas list immediately
    setAreas(prev => [...prev, { name: areaName }]);
    setAreaName(''); // reset input
    console.log(result.data);
  } catch (err) {
    console.error('Error adding area:', err);
  }
};

const handleDelete = async (areaName)=>{
  try {
    const result = await axios.delete(
      `http://localhost:3000/delete-area/${areaName}`,
      { withCredentials: true }
    );
    
    // Update the areas list immediately
    setAreas(prev => prev.filter(area => area.name !== areaName));
    console.log(result.data);
  } catch (err) {
    console.error('Error deleting area:', err);
  }
}  

  return (
    <div>
      <Navbar />
      <div className='d-flex flex-row' style={{ width: '100%' }}>
        <div style={{ width: '220px' }}>
          <Sidebar />
        </div>

        <div className="flex-grow-1 p-4" style={{ backgroundColor: '#f8f9fa',overflowY:'hidden' }}>
          
          {/* Form */}
          <div className="card  shadow-lg p-4 mb-5" style={{ maxWidth: '500px', margin: '0 auto', borderRadius: '12px',backgroundColor:'rgb(211,211,211)' }}>
            <h4 className="text-center text-secondary mb-4">Add New Area</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Area Name</label>
                <input
                
                  type="text"
                  className="form-control "
                  placeholder="Enter name of area"
                  value={areaName}
                  onChange={((e) => setAreaName(e.target.value))}
                />
              </div>
              <button type="submit" className="btn w-100" style={{backgroundColor:'#343a40', color: 'white'}} >
                Add Area
              </button>
            </form>
          </div>

          {/* Scrollable Table */}
          <div className="card  shadow-sm p-3" style={{ backgroundColor:'rgb(211,211,211)',maxWidth: '80%', margin: '0 auto', borderRadius: '12px' }}>
            <h5 className="mb-3 text-secondary">Areas List</h5>
            <div style={{ maxHeight: '30vh', overflowY: 'auto' }}>
              <table className="table  table-hover mb-0" style={{backgroundColor:'#343a40'}}>
                <thead className=" sticky-top" style={{backgroundColor:'#343a40'}}>
                  <tr>
                    <th>Area Name</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {areas.map((area, index) => (
                    <tr key={index}>
                      <td>{area.name}</td>
                      <td onClick={()=>{handleDelete(area.name)}} className='text-danger' style={{cursor:'pointer'}}><Trash3Fill size={20}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Areas

