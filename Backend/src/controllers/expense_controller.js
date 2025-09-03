const CustomerdbHelper = require('../db/customer_db_helper');
const ExpenseDbHelper = require('../db/expenses_db_helper');
const itemSaleExpenseDbHelper = require('../db/items_sales_expensesDbHelper');
const transactionDbHelper = require('../db/transactionDbHelper');

module.exports.add_expense = async(req,res)=>{

    const  {
        customerName,
        customerArea,
        description,
        item,
        totalExpense,
        debit,
        date,
        expensetype,
        customerid
      } = req.body;
    try{
        const expense = await ExpenseDbHelper.add_expense(date,customerName,customerArea,description,totalExpense,debit,expensetype,customerid);
        const ES_id = expense.lastInsertRowid;
        // console.log("expense id :", ES_id)
        const customer = await CustomerdbHelper.get_customer_by_details(customerid,customerName,customerArea);
        // console.log(customerid)
        // console.log("customer :", customer)
        if(customer){
            // const customer = await CustomerdbHelper.get_customer_by_details(customerID,customerName,customerArea);
            const customerAmount = customer.money;
            const RemainingAmount = totalExpense - debit;
            const newAmount = customerAmount - RemainingAmount;
            const transaction = await transactionDbHelper.add_transaction(date,customerName,customerArea,customerid,description,newAmount,0,debit,'expense', ES_id,totalExpense);
            const updateCustomer = await CustomerdbHelper.update_give_take(customerid,customerName,customerArea,newAmount);
            
         
        }
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
        expensetype,
        customerid,
        customername,
        customerarea,
        expenseamount,
        debit
      } = req.body;
    try{
        const customer = await CustomerdbHelper.get_customer_by_details(customerid,customername,customerarea);
        if(customer){
            const customerAmount = customer.money;
            const RemainingAmount = expenseamount - debit;
            const newAmount = customerAmount + RemainingAmount;
            const updateCustomer = await CustomerdbHelper.update_give_take(customerid,customername,customerarea,newAmount);
            const deleteTransaction = await transactionDbHelper.delete_transaction(date,'expense',id);
        
        }



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