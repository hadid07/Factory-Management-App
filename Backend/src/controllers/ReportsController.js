const ExpenseDbHelper = require('../db/expenses_db_helper');
const SalesDbHelper = require('../db/sales_db_helper');
const ItemSEDBHelper = require('../db/items_sales_expensesDbHelper');
const ItemDBHelper = require('../db/item_db_helper');

module.exports.dailyReports = async(req,res) =>{
    try{

        
        const {date} = req.query;

    var Sale = 0;
    var Expense = 0;
    var Debit = 0;
    var Credit = 0;

    const ItemsSaleExpense = [];

    const expenses = await ExpenseDbHelper.getExpensesByDate(date);
    const sales = await SalesDbHelper.getSalesByDate(date);
    const ItemSE = await ItemSEDBHelper.getSEByDate(date);
    const items = await ItemDBHelper.getItems();

    if(expenses.length>0){
        
        expenses.forEach((expense)=>{
            Expense += Number(expense.expenseamount);
            Debit += Number(expense.debit); 
        })
    }

    if(sales.length>0){
        sales.forEach((sale)=>{
            Sale += Number(sale.saleamount);
            Credit += Number(sale.credit);
        })
    }

    items.forEach((item)=>{
        var itemSaleAmount = 0 ;
        var itemExpenseAmount = 0;
        
        const itemSales = ItemSE.filter(sale => sale.item === item.name && sale.type === 'sale');
        const itemExpenses = ItemSE.filter(expense => expense.item === item.name && expense.type === 'expense');

        itemSales.forEach((sale)=>{
            itemSaleAmount += Number(sale.amount);
        })

        itemExpenses.forEach((expense)=>{
            itemExpenseAmount += Number(expense.amount);
        })

        const ItemSE_Details = {
            Name : item.name ,
            Sale : itemSaleAmount ,
            Expense : itemExpenseAmount
        }
        
        ItemsSaleExpense.push(ItemSE_Details);
    })
    
    res.json({
        status : true ,
        message : 'Success' ,
        Sale : Sale , 
        Expense : Expense ,
        Debit : Debit ,
        Credit : Credit ,
        ItemsSaleExpense : ItemsSaleExpense
    })
}catch(err){
    console.log(err);
    res.json({
        status : false ,
        message : 'Internal Error Occured' ,
        err : err
    })
}

}