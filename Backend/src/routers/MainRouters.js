const express = require('express');
const router = express.Router();
// const db = require('../db/dbcon');
const areaController = require('../controllers/area_controller');
const CustomerController = require('../controllers/customer_controller')

router.get('/',(req,res)=>{
    res.json({
        message:'Hello from Router'
    })
})
router.post('/add-area',areaController.Add_Area);
router.get('/get_areas',areaController.get_areas);
router.delete('/delete-area/:areaName',areaController.deleteArea);
router.post('/add_customer',CustomerController.addCustomer);
router.get('/get_all_customers',CustomerController.getAllCustomers);
router.get('/get_customers_by_area/:areaName',CustomerController.getCustomerbyArea);
module.exports = router;