const db = require('../db/dbcon');

const ExpenseDbHelper = {
    add_expense : async(date, customername, customerarea, description,expenseamount, debit, expensetype, customerid)=>{
        try{

            const stmt = db.prepare(`INSERT INTO expenses (date, customername, customerarea, description, expenseamount, debit, expensetype, customerid) VALUES(?,?,?,?,?,?,?,?)`);
            const info = stmt.run(date,customername,customerarea,description,expenseamount,debit,expensetype,customerid);
            return { success: true, lastInsertRowid: info.lastInsertRowid };
        }catch(err){
            return({
                success:false,
                err:err
            })
        }

    },
    show_all_expenses : async()=>{
        try{
            const stmt = db.prepare(`SELECT * FROM expenses ORDER BY date DESC`);
            const expenses = stmt.all();
            return expenses;
        }catch(err){
            console.log(err);
            return [];
        }
    },
    delete_expense : (date,id)=>{
        const stmt = db.prepare(`DELETE FROM expenses WHERE date = ? AND id = ?`);
        const info = stmt.run(date,id );
        return info;
    },
    getDBExpenses : ()=>{
        const stmt = db.prepare(`
            SELECT * FROM expenses WHERE strftime('%Y-%m', date) = strftime('%Y-%m', 'now')`);
            const expenses = stmt.all();
            return expenses;
    },
    getExpensesByDate : (date)=>{
        const stmt = db.prepare(`
            SELECT * FROM expenses WHERE date = ? 
            `);
        const expenses = stmt.all(date);
        return expenses
    },
    getExpensesByMonth: (year, month) => {
    const stmt = db.prepare(`
        SELECT * FROM expenses 
        WHERE strftime('%Y', date) = ? 
          AND strftime('%m', date) = ?
    `);
    return stmt.all(String(year), String(month).padStart(2, '0'));
}

}

module.exports = ExpenseDbHelper;