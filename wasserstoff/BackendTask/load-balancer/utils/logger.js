const winston=require('winston');

const logger=winston.createLogger({
    level:'info',
    formate:winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({filename:'logs/request.log'}),
        new winston.transports.File({filename:'logs/metrics.log'})
    ]
});

const logRequest=(req)=>{
    logger.info({
        message:'Request received',
        method:req.method,
        url:req.url,
        routeStrategy:'least-response-time',
    });
};

const logMetrics=(req,res)=>{
    logger.info({
        message:'Response sent',
        method:req.method,
        routeStrategy:'least-response-time',
        timestamp:new Date().toISOString().slice(0, 19).replace('T',' '),

    });
};

const logQueueMetrics=(req,res)=>{
    logger.info({
        message:'Queue metrics',
        queueType:'RoundRobin',
    });
};


module.exports={logRequest,logMetrics,logQueueMetrics};