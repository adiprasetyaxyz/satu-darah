/* eslint-disable import/prefer-default-export */
import express from 'express';
import cors from 'cors';
import { publicRouter } from '../route/public-api.js';
import errorMiddleware from '../middleware/error-middleware.js';
import { userRouter } from '../route/api.js';

export const web = express();

web.use(cors({
  origin: 'http://localhost:9001', // Atur origin yang diizinkan
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Atur metode HTTP yang diizinkan
  credentials: true, // Izinkan kredensial, jika diperlukan
}));

web.use(express.json());
web.use(publicRouter);
web.use(userRouter);
web.use(errorMiddleware);
