const express = require('express');
const app = express();
const db = require("./db/dbcon");
const router = require('./routers/MainRouters');
const cors = require('cors');

app.use(cors({
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type'],
      credentials: true 
    }));


app.use(express.json());
app.use(router);
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})