import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import swaggerUI from 'swagger-ui-express';

import { AppDataSource } from './database/data-source';
import { AppError } from './modules/errors/app-error';
import { router } from './routes';
import swaggerJSON from './swagger.json';

import './modules/shared/container';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));
app.use(router);
app.use(
  (
    err: Error,
    request: Request,
    response: Response,
    _next: NextFunction
  ): void => {
    if (err instanceof AppError) {
      response.status(err.statusCode).json({ message: err.message });
      return;
    }

    response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`
    });
  }
);

const port = 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Database connected!');

    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err);
  });
