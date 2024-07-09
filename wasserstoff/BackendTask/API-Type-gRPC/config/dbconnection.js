const mongoose =require('mongoose');

const connectDatabase=()=>{
    let DB_URL="";

    if(process.env.NODE_ENV==="DEVELOPMENT") DB_URL=process.env.DB_URL;

    mongoose.connect(DB_URL).then((con)=>{
        console.log(`mongodb database connected with HOST : ${con?.connection?.host}`);
    })

};

module.exports=connectDatabase;