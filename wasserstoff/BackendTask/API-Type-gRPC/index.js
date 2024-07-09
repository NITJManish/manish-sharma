const express=require('express');
const mongoose=require('mongoose');
const routes=require('./routes/routes');
const bodyParser=require('body-parser');
// const connectDatabase=require('./config/dbconnection');
const app=express();
// const PORT=5001;
const dotenv=require('dotenv');
dotenv.config({path: "config/config.env"});

mongoose.connect(process.env.DB_URL).then((con)=>{
    console.log(`mongodb database connected with HOST : ${con?.connection?.host}`);
})
app.use(bodyParser.json());

const createServer=(PORT)=>{
app.use('/grpc/api',routes);
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});
}

createServer(5001);
createServer(5002);
createServer(5003);