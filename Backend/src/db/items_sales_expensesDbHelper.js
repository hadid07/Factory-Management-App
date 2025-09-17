const db = require('../db/dbcon');

const Sales_ExpensesDbHelper = {
  addSaleExpense: async (sales, date,type,ES_id) => {
    try {
      const stmt = db.prepare(
        `INSERT INTO items_sales_expenses (date, item, type, amount, ES_id) VALUES (?, ?, ?, ?, ?)`
      );

      sales.map((item)=> {
        if (Number(item.amount) > 0) {
          stmt.run(date, item.name, type, item.amount, ES_id);
        }
      })

      return true;
    } catch (err) {
      console.error("Error inserting item sales:", err);
      return false;
    }
  },
  deleteItemSaleExpense: (date, ES_id, type) => {
    const stmt = db.prepare(`DELETE FROM items_sales_expenses WHERE date = ? AND ES_id = ? AND type = ?`);
    const info = stmt.run(date, ES_id, type);
    return info;
  },
  getDBItemSE : ()=>{
    const stmt = db.prepare(`
      SELECT * FROM items_sales_expenses WHERE strftime('%Y-%m', date) = strftime('%Y-%m', 'now')
      `);
    const itemsSE = stmt.all();
    return itemsSE;
  },
    getSEByDate : (date)=>{
        const stmt = db.prepare(`
            SELECT * FROM items_sales_expenses WHERE date = ? 
            `);
        const expenses = stmt.all(date);
        return expenses
    },
    getSEByMonth: (year, month) => {
    const stmt = db.prepare(`
        SELECT * FROM items_sales_expenses 
        WHERE strftime('%Y', date) = ? 
          AND strftime('%m', date) = ?
    `);
    return stmt.all(String(year), String(month).padStart(2, '0'));
},
    getItemSEBetween: (fromDate, toDate) => {
        const stmt = db.prepare(`
        SELECT * FROM items_sales_expenses 
        WHERE date BETWEEN ? AND ?
        `);
        return stmt.all(fromDate, toDate);

    }
};

module.exports = Sales_ExpensesDbHelper;
