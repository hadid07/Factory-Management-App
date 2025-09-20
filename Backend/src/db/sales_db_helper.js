const db = require('../db/dbcon');

const SalesDbHelper = {
    add_sale: async (date, customername, customerarea, description, saleamount, credit, customerid) => {
        try {
            let stmt;
            let info;

            if (date) {
                // If user provides a date (from frontend input)
                stmt = db.prepare(`
                    INSERT INTO sales (date, customername, customerarea, description,saleamount, credit, customerid)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                `);
                info = stmt.run(date, customername, customerarea, description, saleamount, credit, customerid);
            } else {
                // If no date provided → let SQLite use default DATE('now')
                stmt = db.prepare(`
                    INSERT INTO sales (customername, customerarea, description, saleamount, credit)
                    VALUES (?, ?, ?, ?)
                `);
                info = stmt.run(customername, customerarea, description, saleamount, credit);
            }

            return { success: true, lastInsertRowid: info.lastInsertRowid };
        } catch (err) {
            console.error("Error inserting sale:", err);
            return { success: false, error: err.message };
        }
    },

    get_all_sales: () => {
        const stmt = db.prepare(`SELECT * FROM sales ORDER BY id DESC`);
        return stmt.all();
    },
    detete_sale: ((id) => {
        const stmt = db.prepare(`DELETE FROM sales WHERE id = ?`);
        const info = stmt.run(id);
        return info;
    }
    ),
    getDBSales: () => {
        const stmt = db.prepare(`
        SELECT * FROM sales WHERE strftime('%Y-%m',date) = strftime('%Y-%m', 'now')
        `);
        const sales = stmt.all();
        return sales;
    },
    getSalesByDate: (date) => {
        const stmt = db.prepare(`
            SELECT * FROM sales WHERE date = ? 
            `);
        const expenses = stmt.all(date);
        return expenses
    },
    getSalesByMonth: (year, month) => {
        const stmt = db.prepare(`
        SELECT * FROM sales 
        WHERE strftime('%Y', date) = ? 
          AND strftime('%m', date) = ?
    `);
        return stmt.all(String(year), String(month).padStart(2, '0'));
    },
    getSalesBetween: (fromDate, toDate) => {
        const stmt = db.prepare(`
        SELECT * FROM sales 
        WHERE date BETWEEN ? AND ?
        `);
        return stmt.all(fromDate, toDate);

    }
};

module.exports = SalesDbHelper;
