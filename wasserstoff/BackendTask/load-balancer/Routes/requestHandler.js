const axios=require('axios');
const FIFOQueue=require('../Queue/fifoQueue');
const PriorityQueue=require('../Queue/priorityQueue');
const RoundRobinQueue=require('../Queue/roundRobin');
const { getWeightedRandomEndpoint, getLeastResponseTimeEndPoint }=require('../utils/routing');

class RequestHandler{
    constructor(){
        this.fifoQueue=new FIFOQueue();
        this.PriorityQueue=new PriorityQueue();
        this.RoundRobinQueue=new RoundRobinQueue();
    }

    addRequestToFIFO(req){
        this.fifoQueue.enqueue(req);
    }

    addRequestToPriority(req,priority){
        this.PriorityQueue.enqueue(req,priority);
    }

    addRequestToRoundRobin(){
        this.RoundRobinQueue.enqueue(req);
    }

    async processFIFO(){
        while(!this.fifoQueue.isEmpty()){
            const req=this.fifoQueue.dequeue();
            await this.forwordRequest(req);
        }
    }

    async processPriority(){
        while(!this.PriorityQueue.isEmpty()){
            const req=this.RoundRobinQueue.dequeue();
            await this.forwordRequest(req);
        }
    }

    async processRoundRobin(){
        while(!this.processRoundRobin.isEmpty()){
           const req=this.RoundRobinQueue.dequeue();
           await this.forwordRequest(req);
        }
    }

    async forwordRequest(req){
        let endpoint;
        switch(req.headers['routing-stategy']){
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
                const res=await axios({
                    method:req.method,
                    url:endpoint+req.url,//forwaord req to the selected endpoint
                    headers:req.headers,
                    data:req.body
                });
                req.res.status(res.status).send(res.data);
            }catch(error){
                req.res.status(500).send('Error forwording request');
            }
        }else{
            req.res.status(500).send("No suitable endpoint found");
        }
    }
}

module.exports=RequestHandler;