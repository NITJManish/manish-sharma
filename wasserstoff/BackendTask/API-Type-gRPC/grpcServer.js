const grpc=require('@grpc/grpc-js');
const protoLoader=require('@grpc/proto-loader');

const Item =require('./model/models');

const PROTO_PATH=__dirname+'/proto/item.proto';

const packageDefinition=protoLoader.loadSync(PROTO_PATH,{
    keepCase:true,
    longs:String,
    enums:String,
    defaults:true,
    oneofs:true,
});

const itemProto=grpc.loadPackageDefinition(packageDefinition).item;

const createItem=async (call,callback)=>{
    const newItem=new Item(call.request);
    await newItem.save();
    callback(null,newItem);
};

const getItems=async (call,callback)=>{
     const items=await Item.find();
     callback(null,{items});
};

const getItem=async (call,callback)=>{
    const item=await Item.findById(call.request.id);
    callback(null,item);
};

const updateItem=async (call,callback)=>{
    const updateItem=await Item.findByIdAndUpdate(call.request.id,call.request,{new:true});
    callback(null,updateItem);
};

const deleteItem=async (call,callback)=>{
    await Item.findByIdAndDelete(call.request.id);
    callback(null,{});
};

const server=new grpc.Server();

server.addService(itemProto.ItemService.service,{
    createItem,
    getItems,
    getItem,
    updateItem,
    deleteItem,
});


server.bindAsync('127.0.0.1:50051',grpc.ServerCredentials.createInsecure(),()=>{
    console.log("grpc server running on port 50051");
    server.start();
});









