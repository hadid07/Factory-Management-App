const AreadbHelper = require('../db/area_db_helper');
module.exports.Add_Area = async (req, res) => {

    const { areaName } = req.body;
    
    if (!areaName) {
        return res.status(400).json({ message: 'Area name is required' });
    }
    
    try {
        const areas = await AreadbHelper.getAllAreas();
        areas.map((area)=>{
            if(area.name === areaName){
                return res.status(400).json({status:false, message: 'Area already exists' });
            }
        })
        const newArea = await AreadbHelper.addArea(areaName);
        res.status(201).json({ status:true,message: 'Area added successfully', area: newArea });
    } catch (error) {
        console.error('Error adding area:', error);
        res.status(500).json({ status:false,message: 'Internal server error' });
    }
}
module.exports.get_areas = async (req,res)=>{
    try{

        let areas = await AreadbHelper.getAllAreas();
        res.status(200).json({ status:true,areas });
    } catch (error) {
        console.error('Error fetching areas:', error);
        res.status(500).json({ status:false,message: 'Internal server error' });
    }

}
module.exports.deleteArea = async (req, res) => {
    const { areaName } = req.params;

    if (!areaName) {
        return res.status(400).json({ message: 'Area name is required' });
    }

    try {
        const deleted = await AreadbHelper.deleteArea(areaName);
        if (deleted) {
            res.status(200).json({ status:true, message: 'Area deleted successfully' });
        } else {
            res.status(404).json({ status:false, message: 'Area not found' });
        }
    } catch (error) {
        console.error('Error deleting area:', error);
        res.status(500).json({ status:false, message: 'Internal server error' });
    }
}