import { Router } from 'express';
import CarsController from '../controllers/CarsController';

const router = Router();
const carsController = new CarsController();

router.post('/cars', carsController.create);

export default router;
