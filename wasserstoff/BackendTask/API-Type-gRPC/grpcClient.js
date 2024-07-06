const grpc=require('@grpc/grpc-js');
const protoLoader=require('@grpc/proto-loader');

const PROTO_PATH=__dirname+'/proto/item.proto';

const packageDefinition=protoLoader.loadSync(PROTO_PATH,{
    keepCase:true,
    longs:String,
    enums:String,
    defaults:true,
    oneofs:true,
});

const itemProto=grpc.loadPackageDefinition(packageDefinition).item;

const client=new itemProto.ItemService('localhost:50051',grpc.credentials.createInsecure());

module.exports=client;