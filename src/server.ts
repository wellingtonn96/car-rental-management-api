import express from 'express';
import swaggerUI from 'swagger-ui-express';

import { router } from './routes';
import swaggerUi from './swagger.json';
import 'reflect-metadata';
import './database';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerUi));

const port = 3000;

app.use(router);

app.listen(port, () => {
  console.log(`Web server started on port: ${port}`);
});
