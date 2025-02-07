import 'reflect-metadata';
import express from 'express';
import { router } from './routes';
import swaggerUI from 'swagger-ui-express';
import swaggerJSON from './swagger.json';

import './modules/shared/container';
import { AppDataSource } from './database/data-source';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));
app.use(router);

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
