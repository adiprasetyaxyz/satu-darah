import express from 'express';
import userController from '../controller/user-controller.js';
import authMiddleware from '../middleware/auth-middleware.js';
import eventController from '../controller/event-controller.js';

// User API
const userRouter = new express.Router();
userRouter.use(authMiddleware);
userRouter.get('/api/users/current', userController.get);
userRouter.delete('/api/users/logout', userController.logout);

// event API
// eslint-disable-next-line import/no-named-as-default-member
userRouter.post('/api/events', eventController.create);
userRouter.get('/api/events/:eventId', eventController.get);

// eslint-disable-next-line import/prefer-default-export
export { userRouter };
