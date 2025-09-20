const ItemdbHelper = require('../db/item_db_helper');
module.exports.addItem = (req, res) => {
    const name = req.body.name;
    if (!name) {
        return res.status(400).json({ status: false, message: 'Item name is required' });
    }
    try {
        const newItem = ItemdbHelper.addItem(name);
        res.status(201).json({ status: true, message: 'Item added successfully', item: newItem });
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }

}
module.exports.getItems = async(req,res)=>{
    try{
        const items = await ItemdbHelper.getItems();
        res.json({status:true,message:'Items Fetched Successfully',items:items})
    }catch(err){
        console.log(err);
        res.json({status:false,message:'could not get Items'})
    }
}
module.exports.deleteItem = async(req,res)=>{
    try{
        const {id} = req.body;
        const res = await ItemdbHelper.deleteItem(id);
        res.json({
            status:true,
            message:'Item Deleted Successfully'
        })

    }catch(err){
        res.json({
            status:false,
            message:'Could not Delete Item'
        })
    }
}