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
        if(item !=''||item){
            const type = 'expense';
            const sales = [{name:item,amount:totalExpense}];
            const ItemSE = await itemSaleExpenseDbHelper.addSaleExpense(sales,date,type);
        }
        res.json({
            status:true,
            message:'Expense Added Successfully'
        })
    }catch(err){
        res.json({
            status:false,
            message:'Could not add Expense'
        })
    }
}