const db = require('../db/dbcon');

const CustomerdbHelper ={
 addCustomer: (customerData) => {
    const stmt = db.prepare(`INSERT INTO customers (name, area) VALUES (?, ?)`);
    const info = stmt.run(customerData.name, customerData.area); // Executes the insert
    return { id: info.lastInsertRowid, ...customerData }; // Return inserted data
  },
  getCustomers : (areaName)=>{
    const stmt = db.prepare(`SELECT * FROM customers WHERE area = ?`);
    return stmt.all(areaName); // Returns all customers in the specified area
  },
  getAllCustomers : ()=>{
    const stmt = db.prepare(`SELECT * FROM customers`);
    return stmt.all(); // Returns all customers
  }
}


module.exports = CustomerdbHelper;

