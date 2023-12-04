const express = require("express");
const cors = require("cors");
const userRouter = require("./routers/userRouter");
const toysRouter = require("./routers/toyRouter"); 
const path= require("path");
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/toys', toysRouter); 
app.get("*",()=>{});
console.log("app is running");
module.exports.app = app;
