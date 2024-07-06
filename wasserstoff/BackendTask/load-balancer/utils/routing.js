const endPoints=[
    {
        type:'REST',
        url:'http://localhost:3001',
        weight:1,
        responseTime:100
    },
    {
        type:'REST',
        url:'http://localhost:3002',
        weight:1,
        responseTime:200
    },
    {
        type:'REST',
        url:'http://localhost:3003',
        weight:1,
        responseTime:300
    },
    {
        type:'GraphQL',
        url:'http://localhost:4001',
        weight:2,
        responseTime:200,
    },
    {
        type:'GraphQL',
        url:'http://localhost:4002',
        weight:2,
        responseTime:200,
    },
    {
        type:'GraphQL',
        url:'http://localhost:4003',
        weight:2,
        responseTime:200,
    },
    {
        type:'gRPC',
        url:'http://localhost:5001',
        weight:3,
        responseTime:300,
    },
]


const getLeastResponseTimeEndPoint=()=>{
    return endPoints.reduce((prev,curr)=>(prev.responseTime < curr.responseTime ? prev : curr)).url;
};

const getWeightedRandomEndpoint=()=>{
    const totalWeight=endPoints.reduce((acc,ep)=> acc+ep.weight,0);
    const random=Math.randow()*totalWeight;
    let weightSum=0;
    for(const endPoint of endPoints){
        weightSum+=endPoint.weight;
        if(random < weightSum){
            return endPoint.url;
        }
    }
    return null;
};

const getRandomEndpoint=()=>{
    const index=Math.floor(Math.random()*endPoints.length);
    return endPoints[index].url;
};

const getEndpointByApiType=(req)=>{
    const apiType=req.headers['api-type'];
    const endpoint=endPoints.find(ep=>ep.type === apiType);
    return endpoint ? endpoint.url : null;
}


const customRouting=(req)=>{
    return null;
};

module.exports={getWeightedRandomEndpoint, getLeastResponseTimeEndPoint, getEndpointByApiType, getRandomEndpoint,customRouting};