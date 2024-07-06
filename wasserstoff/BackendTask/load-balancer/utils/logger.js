const winston=require('winston');

const logger=winston.createLogger({
    level:'info',
    formate:winston.format.json(),
    transports:[
        new winston.transports.File({filename:'logs/request.log'}),
        new winston.transports.File({filename:'logs/metrics.log'})
    ]
});

const logRequest=(req)=>{
    logger.info({
        message:'Request received',
        method:req.method,
        url:req.url,
        headers:req.headers
    });
};

const logMetrics=(req,res)=>{
    logger.info({
        message:'Response sent',
    });
};

const logQueueMetrics=(req,res)=>{
    logger.info({
        message:'Queue metrics',
        queueType:'queue-type'
    });
};


module.exports={logRequest,logMetrics,logQueueMetrics};