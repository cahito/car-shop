import { Router } from 'express';
import CarsController from '../controllers/CarsController';
import CarsService from '../services/CarsService';
import Car from '../models/CarsModel';

const router = Router();
const carsModel = new Car();
const carsService = new CarsService(carsModel);
const carsController = new CarsController(carsService);

router.post('/cars', (req, res) => carsController.create(req, res));
router.get('/cars', (req, res) => carsController.read(req, res));

export default router;
