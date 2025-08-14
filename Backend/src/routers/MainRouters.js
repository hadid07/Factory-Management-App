const express = require('express');
const router = express.Router();
const db = require('./db/dbcon');

router.get('/',(req,res)=>{
    res.json({
        message:'Hello from Router'
    })
})