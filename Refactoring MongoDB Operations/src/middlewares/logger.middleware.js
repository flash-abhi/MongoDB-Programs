// Please don't change the pre-written code
// Import the necessary modules here
import winston from "winston";
export const logger = winston.createLogger({
  // Write your code here
  level: "error",
  format: winston.format.json(),
  defaultMeta: {service: 'user-service'},
  transports:[
      new winston.transports.File({filename: 'error.log'})
  ]
});
export const loggerMiddleware = (req, res, next) => {
  const data_to_log = `${new Date().toString()}\n req URL: ${
    req.originalUrl
  }\n reqBody: ${JSON.stringify(req.error)}`;
  logger.error(data_to_log);
  next();
};

export default loggerMiddleware;