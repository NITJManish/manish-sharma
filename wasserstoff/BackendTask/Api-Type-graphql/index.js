import express from "express";
const app = express();
import { graphqlHTTP } from "express-graphql";
import dotenv from "dotenv";
import schema from './schemas/index.js';
import { connectDatabase } from "./config/dbconnection.js";

dotenv.config({ path: "config/config.env" });

//connecting to database
connectDatabase();

const createServerP = (PORT) => {


    app.use("/graphql/api", graphqlHTTP({
        schema:schema,
        graphiql:true,
    }));



    app.listen(PORT, () => {
        console.log(`server started on port : ${PORT} in ${process.env.NODE_ENV} mode.`)
    })

}

createServerP(4001);
createServerP(4002);
createServerP(4003);