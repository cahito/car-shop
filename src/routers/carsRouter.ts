import { Router } from 'express';
import CarsController from '../controllers/CarsController';
import CarsService from '../services/CarsService';
import CarsModel from '../models/CarsModel';

const router = Router();
const carsModel = new CarsModel();
const carsService = new CarsService(carsModel);
const carsController = new CarsController(carsService);

router.post('/cars', (req, res) => carsController.create(req, res));
router.get('/cars', (req, res) => carsController.read(req, res));
router.get('/cars/:id', (req, res) => carsController.readOne(req, res));
router.put('/cars/:id', (req, res) => carsController.update(req, res));

export default router;
