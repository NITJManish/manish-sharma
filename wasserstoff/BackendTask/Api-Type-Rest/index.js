import express from "express";
const app=express();

import dotenv from "dotenv";
import { connectDatabase } from "./config/dbconnection.js";

dotenv.config({path: "config/config.env"});


//connecting to database
connectDatabase();

app.use(express.json());

//import all routes
import productRoutes from './Routes/products.js';

app.use("/rest/api",productRoutes);


app.listen(process.env.PORT,()=>{
    console.log(`server started on port : ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})