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
    }
}

module.exports = ExpenseDbHelper;