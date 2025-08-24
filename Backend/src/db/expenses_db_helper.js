const db = require('../db/dbcon');

const ExpenseDbHelper = {
    add_expense : async(date, customername, customerarea, description,expenseamount, debit, expensetype)=>{
        try{

            const stmt = db.prepare(`INSERT INTO expenses (date, customername, customerarea, description, expenseamount, debit, expensetype) VALUES(?,?,?,?,?,?,?)`);
            const info = stmt.run(date,customername,customerarea,description,expenseamount,debit,expensetype)
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
    }
}

module.exports = ExpenseDbHelper;