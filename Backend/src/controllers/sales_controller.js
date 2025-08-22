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
module.exports.get_all_sales = async(req,res)=>{
    try{
        const sales = await SalesDbHelper.get_all_sales();
        if(sales.length==0){
            return res.json({
                status:false,
                message:'no sales to show '
            })
        }
        res.json({
            status:true,
            sales:sales,
            message:'Sales fetched successfully'
        })
    }catch(err){
        return res.json({
            status:false,
            message:'could not get sales',
            
        })
    }
}