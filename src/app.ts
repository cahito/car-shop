import express from 'express';
import 'express-async-errors';
import carsRouter from './routers/carsRouter';
import motorcyclesRouter from './routers/motorcyclesRouter';
import errorHandler from './middlewares/error';

const app = express();

app.use(express.json());

app.use(carsRouter);
app.use(motorcyclesRouter);

app.use(errorHandler);

export default app;
