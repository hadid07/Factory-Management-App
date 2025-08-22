const db = require('../db/dbcon');

const Sales_ExpensesDbHelper = {
  addSaleExpense: async (sales, date,type) => {
    try {
      const stmt = db.prepare(
        `INSERT INTO items_sales_expenses (date, item, type, amount) VALUES (?, ?, ?, ?)`
      );

      sales.map((item)=> {
        if (Number(item.amount) > 0) {
          stmt.run(date, item.name, type, item.amount);
        }
      })

      return true;
    } catch (err) {
      console.error("Error inserting item sales:", err);
      return false;
    }
  },
};

module.exports = Sales_ExpensesDbHelper;
