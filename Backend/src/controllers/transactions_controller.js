const TransactionDBHelper = require('../db/transactionDbHelper');
const ItemSEDBHelper = require('../db/items_sales_expensesDbHelper');

module.exports.getTransactions = async (req, res) => {
    try {
        const { customerID } = req.query;
        const transactions = await TransactionDBHelper.get_transaction(customerID);
        if (transactions) {
            res.json({
                status: true,
                message: 'Transactions fetched successfully',
                transactions: transactions
            })
        }
        else {
            res.json({
                status: false,
                message: 'Could not etched transactions'
            })
        }

    } catch (err) {
        console.log(err);
        res.json({
            status:false,
            message:'Internal Error'
        })
    }
}

module.exports.getAllTransactions = async (req,res)=>{
    try{
        const transactions = await TransactionDBHelper.show_all_transactions();
        res.json({
            status:true,
            transactions:transactions
        })
    }catch(err){

    }
}

module.exports.getSE = async(req,res)=>{
    const SE = ItemSEDBHelper.getDBItemSE();
    res.json({
        status:true,
        itemSE:SE
    })
}