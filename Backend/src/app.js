const express = require('express');
const app = express();
const db = require('./db/dbcon');
const router = require('./routers/MainRouters');


app.use(express.json());
app.use(router);
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})