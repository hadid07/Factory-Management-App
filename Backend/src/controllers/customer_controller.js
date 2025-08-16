const CustomerdbHelper = require('../db/customer_db_helper');
module.exports.addCustomer = async(req,res) => {
    const { name, area } = req.body;
    if (!name || !area) {
        return res.status(400).json({ message: 'Name and area are required' });
    }
    try{
        const newCustomer = await CustomerdbHelper.addCustomer( {name, area} );
        res.status(201).json({ status:true, message: 'Customer added successfully', customer: newCustomer });
    }catch (error) {
        console.error('Error adding customer:', error);
        res.status(500).json({ status:false, message: 'Internal server error' });
    }
  }

  module.exports.getAllCustomers = async(req,res)=>{
    try {
        const customers = await CustomerdbHelper.getAllCustomers();
        res.status(200).json({ status:true, customers });
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ status:false, message: 'Internal server error' });
    }
  }

  module.exports.getCustomerbyArea = async(req,res)=>{
    const { areaName } = req.params;
    if (!areaName) {
        return res.status(400).json({ message: 'Area name is required' });
    }
    try {
        const customers = await CustomerdbHelper.getCustomers(areaName);
        if (customers.length === 0) {
            return res.status(404).json({ status:false, message: 'No customers found in this area' });
        }
        res.status(200).json({ status:true, customers });
    } catch (error) {
        console.error('Error fetching customers by area:', error);
        res.status(500).json({ status:false, message: 'Internal server error' });
    }
  }