/* eslint-disable import/prefer-default-export */
import express from 'express';
import userController from '../controller/user-controller.js';
import authMiddleware from '../middleware/auth-middleware.js';
import eventController from '../controller/event-controller.js';
import registerController from '../controller/register-controller.js';
import bloodStockController from '../controller/stock-controller.js';

// User API
const userRouter = new express.Router();
userRouter.use(authMiddleware);
userRouter.get('/api/users/current', userController.get);
userRouter.delete('/api/users/logout', userController.logout);

// event API
// eslint-disable-next-line import/no-named-as-default-member
userRouter.post('/api/events', eventController.create);
userRouter.get('/api/events/:eventId', eventController.get);
userRouter.get('/api/list', eventController.getAllEvents);
userRouter.delete('/api/events/:eventId', eventController.deleteEvent);

// Routes untuk BloodStock API
userRouter.get('/api/blood-stocks', bloodStockController.getAll);
userRouter.delete('/api/blood-stocks/:bloodstockId', bloodStockController.remove);
userRouter.put('/api/blood-stocks/:bloodstockId', bloodStockController.update);

// routes register
userRouter.post('/api/events/:eventId/register', registerController.createRegister);
userRouter.get('/api/events/:eventId/register/', registerController.getAllRegisters);
userRouter.get('/api/events/:eventId/register/:registerId', registerController.getRegister);
userRouter.put('/api/events/:eventId/register/:registerId', registerController.updateRegister);
userRouter.delete('/api/events/:eventId/register/:registerId', registerController.deleteRegister);

export { userRouter };
