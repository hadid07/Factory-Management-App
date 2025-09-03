const ExpenseDbHelper = require("../db/expenses_db_helper");
const SalesDbHelper = require('../db/sales_db_helper');
const ItemExpenseDBhelper = require('../db/items_sales_expensesDbHelper');
const ItemdbHelper = require("../db/item_db_helper");

module.exports.getDashboardData = async (req, res) => {
    try {
        const sales = await SalesDbHelper.getDBSales();
        const expenses = await ExpenseDbHelper.getDBExpenses();
        const itemSE = await ItemExpenseDBhelper.getDBItemSE();
        const items = await ItemdbHelper.getItems();

        let totalSales = 0;
        let totalExpenses = 0;
        let totalDebit = 0;
        let totalCredit = 0;
        
        expenses.forEach((expense) => {
            totalExpenses += Number(expense.expenseamount) || 0;
            totalDebit += Number(expense.debit) || 0;
        });

        sales.forEach((sale) => {
            totalSales += Number(sale.saleamount) || 0;
            totalCredit += Number(sale.credit) || 0;
        });

        res.json({
            status: true,
            totalSales: totalSales,
            totalExpenses: totalExpenses,
            totalDebit: totalDebit,
            totalCredit: totalCredit,
            itemSE: itemSE,
            items: items,
            expenses: expenses
        })

    } catch (err) {
        console.log(err);
        res.json({
            message: 'Server Error',
            status: false
        })
    }
}