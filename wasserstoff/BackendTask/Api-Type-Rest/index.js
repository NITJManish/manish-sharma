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

const createServerP=(PORT)=>{

    
    app.use("/rest/api",productRoutes);
    
    
    
    app.listen(PORT,()=>{
        console.log(`server started on port : ${PORT} in ${process.env.NODE_ENV} mode.`)
    })
    
}

createServerP(3001);
createServerP(3002);
createServerP(3003);




