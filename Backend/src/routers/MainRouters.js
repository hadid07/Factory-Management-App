const express = require('express');
const router = express.Router();
// const db = require('../db/dbcon');
const areaController = require('../controllers/area_controller');
const CustomerController = require('../controllers/customer_controller');
const ItemController = require('../controllers/Item_controller');
const SalesController = require('../controllers/sales_controller');
const ExpenseController = require('../controllers/expense_controller');

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
router.post('/delete_customer',CustomerController.deleteCustomer);
router.post('/add_item',ItemController.addItem);
router.get('/get_items',ItemController.getItems);
router.post('/add_sale',SalesController.addSale);
router.get('/get_all_sales',SalesController.get_all_sales);
router.post('/add_expense',ExpenseController.add_expense);
router.get('/get_all_expenses',ExpenseController.show_all_expenses);
module.exports = router;