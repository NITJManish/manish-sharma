class PriorityQueue{
    contructor(){
        this.queue=[];
    }

    enqueue(request,priority){
        this.queue.push({request,priority});
        this.queue.sort((a,b)=>a.priority-b.priority);
    }

    dequeue(){
        return this.queue.shift().request;
    }

    isEmpty(){
        return this.queue.length===0;
    }
}

module.exports=PriorityQueue;