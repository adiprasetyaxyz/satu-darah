import express from 'express';
import userController from '../controller/user-controller.js';
import eventController from '../controller/event-controller.js';
import bloodStockController from '../controller/stock-controller.js';

const publicRouter = new express.Router();
publicRouter.post('/api/users', userController.register);
publicRouter.post('/api/users/login', userController.login);
publicRouter.get('/api/events/:eventId', eventController.get);
publicRouter.get('/api/list', eventController.getAllEvents);
publicRouter.get('/api/blood-stocks', bloodStockController.getAll);
publicRouter.get('/api/blood-stocks/search', bloodStockController.search);
publicRouter.get('/api/list/search', eventController.searchEvents);

// eslint-disable-next-line import/prefer-default-export
export { publicRouter };
