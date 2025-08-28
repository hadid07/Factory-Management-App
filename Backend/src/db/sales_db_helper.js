const db = require('../db/dbcon');

const SalesDbHelper = {
    add_sale: async (date, customername, customerarea, description,saleamount, credit, customerid) => {
        try {
            let stmt;
            let info;

            if (date) {
                // If user provides a date (from frontend input)
                stmt = db.prepare(`
                    INSERT INTO sales (date, customername, customerarea, description,saleamount, credit, customerid)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                `);
                info = stmt.run(date, customername, customerarea, description , saleamount, credit,customerid);
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
    
    get_all_sales : ()=>{
        const stmt = db.prepare(`SELECT * FROM sales`);
        return stmt.all();
    },
    detete_sale : ((id)=>{
        const stmt = db.prepare(`DELETE FROM sales WHERE id = ?`);
        const info = stmt.run(id);
        return info;
    }
)
};

module.exports = SalesDbHelper;
