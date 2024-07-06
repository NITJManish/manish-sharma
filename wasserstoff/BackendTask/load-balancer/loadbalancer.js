const express = require('express');
const dynamicRouter = require('./Routes/requestHandler');
const { logMetrics, logQueueMetrics } = require('./utils/logger');

const RequestHandler=require('./Routes/requestHandler');
const dotenv=require('dotenv');

const app=express();
dotenv.config({path: "config/config.env"});


const requestHandler=new RequestHandler();

app.use(express.json());


//Request logging middleware
app.use((req,res,next)=>{
    logMetrics(req);
    next();
})

//Queue Request Handling middleware
app.use((req,res,next)=>{
    const queueType=req.headers['queue-type'];
    //attach response object to req forwording
    req.res=res;
    switch(queueType){
        case 'FIFO':
            requestHandler.addRequestToFIFO(req);
            logQueueMetrics('FIFO',requestHandler.fifoQueue.queue.length);
            requestHandler.processFIFO();
            break;
        case 'Priority':
            const priority=req.headers['priority'] || 1;
            requestHandler.addRequestToPriority(req,priority);
            logQueueMetrics('Priority',requestHandler.priorityQueue.length);
            requestHandler.processPriority();
            break;
        case 'RoundRobin':
            requestHandler.addRequestToRoundRobin(req);
            logQueueMetrics('RoundRobin',requestHandler.roundRobinQueue.queue.length);
            requestHandler.processRoundRobin();
            break;
        default:
            res.status(400).send("Invalid queue type");
            return;
    }
});

//metrics logging middleware
app.use((req,res,next)=>{
    res.on('finish',()=>{
        logMetrics(req,res);
    });
    next();
});

app.listen(process.env.PORT,()=>{
    console.log(`Load Balancer is running on port ${process.env.PORT}`);
});