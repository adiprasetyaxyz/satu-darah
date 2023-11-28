import winston from 'winston';

// eslint-disable-next-line import/prefer-default-export
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({}),
  ],
});
