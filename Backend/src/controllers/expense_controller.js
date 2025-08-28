const ExpenseDbHelper = require('../db/expenses_db_helper');
const itemSaleExpenseDbHelper = require('../db/items_sales_expensesDbHelper');

module.exports.add_expense = async(req,res)=>{

    const  {
        customerName,
        customerArea,
        description,
        item,
        totalExpense,
        debit,
        date,
        expensetype
      } = req.body;
    try{
        const expense = await ExpenseDbHelper.add_expense(date,customerName,customerArea,description,totalExpense,debit,expensetype);
        const ES_id = expense.lastInsertRowid;
        // console.log("expense id :", ES_id)
        if(item && item !==''){
            const type = 'expense';
            const sales = [{name:item,amount:totalExpense}];
            const ItemSE = await itemSaleExpenseDbHelper.addSaleExpense(sales,date,type,ES_id);
            console.log("item sale expense :", ItemSE)
        }
        res.json({
            status:true,
            message:'Expense Added Successfully'
        })
    }catch(err){
        console.log(err);
        res.json({

            status:false,
            message:'Could not add Expense'
        })
    }
}
module.exports.show_all_expenses = async(req,res)=>{
    try{
        const expenses = await ExpenseDbHelper.show_all_expenses();
        res.json({
            status:true,
            expenses:expenses
        })
    }catch(err){
        console.log(err);
        res.json({
            status:false,
            expenses:[]
        })
    }
}
module.exports.delete_expense = async(req,res)=>{
    const  {
        date,
        id,
        expensetype
      } = req.body;
    try{
        const expense = await ExpenseDbHelper.delete_expense(date,id);
        if(expensetype === 'item'){
            const type = 'expense';
            const ItemSE = await itemSaleExpenseDbHelper.deleteItemSaleExpense(date,id, type);
        }
        res.json({
            status:true,
            message:'Expense Deleted ...'
        })
    }catch(err){
        console.log(err);
        res.json({

            status:false,
            message:'Could not delete Expense'
        })
    }
}