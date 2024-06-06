import winston from "winston";

const logger=winston.createLogger({
    level:'info',
    format:winston.format.json(),
    transports:[
        new winston.transports.File({filename:'log.txt'})
    ]
});

export const loggerMiddleware = (req, res, next) => {
  // Write your code here
  if(!req.url.includes('signin')){
      const logData=`Timestamp: ${new Date()}, request URL:${req.url}, Body Recieved: ${JSON.stringify(req.body)}`;
      logger.info(logData);
  }
  next();
};