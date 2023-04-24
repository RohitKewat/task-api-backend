const express = require('express');

const app = express() ;
const Port = 5000 ;
const router = require('./Routes/taskRoutes')
const connection = require('./connection/connection')
connection ()
app.use(router)
app.get('/',(req,res)=>{
    res.send("working good")
})



app.listen(Port,()=> console.log(`server is running at ${Port}`)); 