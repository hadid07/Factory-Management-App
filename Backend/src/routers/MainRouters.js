const express = require('express');
const router = express.Router();
// const db = require('../db/dbcon');
const areaController = require('../controllers/area_controller');

router.get('/',(req,res)=>{
    res.json({
        message:'Hello from Router'
    })
})
router.post('/add-area',areaController.Add_Area);
router.get('/get_areas',areaController.get_areas);
router.delete('/delete-area/:areaName',areaController.deleteArea)
module.exports = router;