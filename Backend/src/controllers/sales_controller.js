const SalesDbHelper = require('../db/sales_db_helper');
const itemSaleExpenseDbHelper = require('../db/items_sales_expensesDbHelper');

module.exports.addSale = async(req,res)=>{
    const  {
        customerName,
        customerArea,
        description,
        sales,
        totalSale,
        credit,
        date,
        type
      } = req.body;
    try{
        const sale = await SalesDbHelper.add_sale(date,customerName,customerArea,description,totalSale,credit);
        const ItemSE = await itemSaleExpenseDbHelper.addSaleExpense(sales,date,type);
        res.json({
            status:true,
            message:'Sale Added Successfully'
        })
    }catch(err){
        console.log(err);
        res.json({
            status:false,
            message:'could not add a sale'
        })
    }

}