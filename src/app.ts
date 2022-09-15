import express from 'express';
import 'express-async-errors';
import carsRouter from './routers/carsRouter';
import errorHandler from './middlewares/error';

const app = express();

app.use(express.json());
app.use(errorHandler);

app.use(carsRouter);

export default app;
