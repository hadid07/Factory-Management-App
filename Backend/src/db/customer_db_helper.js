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
  },
  deleteCustomer: (name, area) => {
    const stmt = db.prepare(`DELETE FROM customers WHERE name = ? AND area = ?`);
    const result = stmt.run(name, area); // Executes the delete
    return result; // Returns the result of the delete operation
  },
  get_customer_by_details : (id,name,area)=>{
    const stmt = db.prepare(`SELECT * FROM customers WHERE id = ? AND name = ? AND area = ?`);
    return stmt.get(id,name,area); // Returns the customer matching the details
  },
  update_give_take : (id,name,area,money) =>{
    const stmt = db.prepare(`UPDATE customers SET money = ? WHERE id = ? AND name = ? AND area = ?`);
    const result = stmt.run(money,id,name,area); // Executes the update
    return result; // Returns the result of the update operation
  }
}


module.exports = CustomerdbHelper;

