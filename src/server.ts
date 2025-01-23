import express from 'express';
import { specificationRoutes } from './routes/specification.routes';
import { categoriesRoutes } from './routes/categories.routes';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.use('/categories', categoriesRoutes)
app.use('/specifications', specificationRoutes)

app.listen(port, () => {
    console.log(`Web server started on port: ${port}`);
});
