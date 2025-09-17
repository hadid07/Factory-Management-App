const ExpenseDbHelper = require('../db/expenses_db_helper');
const SalesDbHelper = require('../db/sales_db_helper');
const ItemSEDBHelper = require('../db/items_sales_expensesDbHelper');
const ItemDBHelper = require('../db/item_db_helper');

module.exports.dailyReports = async (req, res) => {
    try {


        const { date } = req.query;

        var Sale = 0;
        var Expense = 0;
        var Debit = 0;
        var Credit = 0;

        const ItemsSaleExpense = [];

        const expenses = await ExpenseDbHelper.getExpensesByDate(date);
        const sales = await SalesDbHelper.getSalesByDate(date);
        const ItemSE = await ItemSEDBHelper.getSEByDate(date);
        const items = await ItemDBHelper.getItems();

        if (expenses.length > 0) {

            expenses.forEach((expense) => {
                Expense += Number(expense.expenseamount);
                Debit += Number(expense.debit);
            })
        }

        if (sales.length > 0) {
            sales.forEach((sale) => {
                Sale += Number(sale.saleamount);
                Credit += Number(sale.credit);
            })
        }

        items.forEach((item) => {
            var itemSaleAmount = 0;
            var itemExpenseAmount = 0;

            const itemSales = ItemSE.filter(sale => sale.item === item.name && sale.type === 'sale');
            const itemExpenses = ItemSE.filter(expense => expense.item === item.name && expense.type === 'expense');

            itemSales.forEach((sale) => {
                itemSaleAmount += Number(sale.amount);
            })

            itemExpenses.forEach((expense) => {
                itemExpenseAmount += Number(expense.amount);
            })

            const ItemSE_Details = {
                Name: item.name,
                Sale: itemSaleAmount,
                Expense: itemExpenseAmount
            }

            ItemsSaleExpense.push(ItemSE_Details);
        })

        res.json({
            status: true,
            message: 'Success',
            Sale: Sale,
            Expense: Expense,
            Debit: Debit,
            Credit: Credit,
            ItemsSaleExpense: ItemsSaleExpense
        })
    } catch (err) {
        console.log(err);
        res.json({
            status: false,
            message: 'Internal Error Occured',
            err: err
        })
    }

}

module.exports.monthlyReports = async (req, res) => {
  try {
    const { fromDate, toDate, remainingStock = [] } = req.body;

    const items = await ItemDBHelper.getItems();
    const sales = await SalesDbHelper.getSalesBetween(fromDate, toDate);
    const expenses = await ExpenseDbHelper.getExpensesBetween(fromDate, toDate);
    const itemSE = await ItemSEDBHelper.getItemSEBetween(fromDate, toDate);

    let TotalSale = 0;
    let TotalExpense = 0;
    let TotalCredit = 0;
    let TotalDebit = 0;
    let TotalUnSold = 0;

    const ItemSalesExpenses = [];

    sales.forEach((sale) => {
      TotalSale += Number(sale.saleamount);
      TotalCredit += Number(sale.credit);
    });

    expenses.forEach((expense) => {
      TotalExpense += Number(expense.expenseamount);
      TotalDebit += Number(expense.debit);
      
    });

    items.forEach((item) => {
      let itemSaleAmount = 0;
      let itemExpenseAmount = 0;
      let unsoldamount = 0;

      const itemSales = itemSE.filter(SE => SE.item === item.name && SE.type === 'sale');
      const itemExpenses = itemSE.filter(SE => SE.item === item.name && SE.type === 'expense');

      itemSales.forEach((sale) => {
        itemSaleAmount += Number(sale.amount);
      });

      itemExpenses.forEach((expense) => {
        itemExpenseAmount += Number(expense.amount);
      });

      const leftover = remainingStock.find(i => i.name === item.name);
      if (leftover) {
        // itemExpenseAmount -= Number(leftover.amount);
        TotalUnSold += Number(leftover.amount);
        unsoldamount = Number(leftover.amount);
      }

      ItemSalesExpenses.push({
        name: item.name,
        saleamount: itemSaleAmount,
        expenseamount: itemExpenseAmount,
        unsoldamount
      });
    });

    res.json({
      status: true,
      TotalSale,
      TotalExpense,
      TotalCredit,
      TotalDebit,
      ItemSalesExpenses,
      TotalUnSold,
      fromDate,
      toDate
    });

  } catch (err) {
    console.error(err);
    res.json({
      status: false,
      message: 'Internal Error'
    });
  }
};
