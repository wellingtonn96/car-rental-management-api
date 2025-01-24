import express from 'express';
import { specificationRoutes } from './routes/specification.routes';
import { categoriesRoutes } from './routes/categories.routes';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.use(router)

app.listen(port, () => {
    console.log(`Web server started on port: ${port}`);
});
