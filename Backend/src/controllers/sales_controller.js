const SalesDbHelper = require('../db/sales_db_helper');
const itemSaleExpenseDbHelper = require('../db/items_sales_expensesDbHelper');
const transactionDbHelper = require('../db/transactionDbHelper');
const customerDbHelper = require('../db/customer_db_helper');

module.exports.addSale = async(req,res)=>{
    const  {
        customerName,
        customerArea,
        description,
        sales,
        totalSale,
        credit,
        date,
        type,
        customerID
      } = req.body;
    try{
        const sale = await SalesDbHelper.add_sale(date,customerName,customerArea,description,totalSale,credit,customerID);
        const ES_id = sale.lastInsertRowid;
        const ItemSE = await itemSaleExpenseDbHelper.addSaleExpense(sales,date,type, ES_id);
        
        if(customerName !== 'CashCustomer'){
            const customer = await customerDbHelper.get_customer_by_details(customerID,customerName,customerArea);
            const customerAmount = customer.money;
            const newAmount = customerAmount + (totalSale - credit);
            const updateCustomer = await customerDbHelper.update_give_take(customerID,customerName,customerArea,newAmount);
            const transaction = await transactionDbHelper.add_transaction(date,customerName,customerArea,customerID,description,newAmount,credit,0,'sale', ES_id);
        }
        // console.log('customer :', customer)
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

module.exports.delete_sale = async(req,res)=>{
    const  {
        date,
        id,
        customername,
        customerarea,
        saleamount,
        credit,
        customerid
      } = req.body;
    try{


        const RemainingAmount = saleamount - credit;
        const customer = await customerDbHelper.get_customer_by_details(customerid,customername,customerarea);
        const customerAmount = customer.money;
        const newAmount = customerAmount - RemainingAmount;
        const updateCustomer = await customerDbHelper.update_give_take(customerid,customername,customerarea,newAmount);


        const delTransaction = await transactionDbHelper.delete_transaction(date,'sale',id);
        const ItemSE = await itemSaleExpenseDbHelper.deleteItemSaleExpense(date,id,'sale');
        const sale = await SalesDbHelper.detete_sale(id);
        
        res.json({
            status:true,
            message:'Sale Deleted Successfully'
        })
    }catch(err){
        console.log(err);
        res.json({
            status:false,
            message:'could not delete sale'
        })
    }

}