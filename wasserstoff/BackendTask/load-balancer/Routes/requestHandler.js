const axios=require('axios');
const FIFOQueue=require('../Queue/fifoQueue');
const PriorityQueue=require('../Queue/priorityQueue');
const RoundRobinQueue=require('../Queue/roundRobin');
const { getWeightedRandomEndpoint, getLeastResponseTimeEndPoint, getRandomEndpoint }=require('../utils/routing');

class RequestHandler{
    constructor(){
        this.fifoQueue=new FIFOQueue();
        this.priorityQueue=new PriorityQueue();
        this.roundRobinQueue=new RoundRobinQueue();
    }

    addRequestToFIFO(req){
        // console.log("add req to fifo",req);
        this.fifoQueue.enqueue(req);
    }

    addRequestToPriority(req,priority){
        this.priorityQueue.enqueue(req,priority);
    }

    addRequestToRoundRobin(req){
        // console.log("request coming or not",req);
        this.roundRobinQueue.enqueue(req);
    }

    async processFIFO(){
        while(!this.fifoQueue.isEmpty()){
            const req=this.fifoQueue.dequeue();
            await this.forwordRequest(req);
        }
    }

    async processPriority(){
        while(!this.priorityQueue.isEmpty()){
            const req=this.priorityQueue.dequeue();
            await this.forwordRequest(req);
        }
    }

    async processRoundRobin(){
        while(!this.roundRobinQueue.isEmpty()){
           const req=this.roundRobinQueue.dequeue();
           await this.forwordRequest(req);
        }
        // console.log("request is coming or not",reqtype);
    }

    async forwordRequest(req){
        // console.log(req);
     
        let endpoint;
        const routeStrategy=req.headers['routing-stategy'];
        switch(routeStrategy){
            case 'least-response-time':
                endpoint=getLeastResponseTimeEndPoint();
                break;
            case 'weight-random':
                endpoint=getWeightedRandomEndpoint();
                break;
            case 'api-type':
                endpoint=getEndpointByApiType(req);
                break;
            case 'random':
            default:
                endpoint=getRandomEndpoint();
                break;
        }

        if(endpoint){
            try{
                // console.log(endpoint+req.url);
                const res=await axios({
                    method:req.method,
                    url:endpoint+req.url,//forwaord req to the selected endpoint
                    headers:req.headers,
                    data:req.body
                });
                req.res.status(res.status).send(res.data);
            }catch(error){
                console.log(error);
                req.res.status(500).send('Error forwording request');
            }
        }else{
            req.req.res.status(500).send("No suitable endpoint found");
        }
    }
}

module.exports=RequestHandler;