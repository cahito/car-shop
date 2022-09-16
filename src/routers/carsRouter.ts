import { Router } from 'express';
import { carsController, CARS, CARS_ID } from './main';

const router = Router();

router.post(CARS, (req, res) => carsController.create(req, res));
router.get(CARS, (req, res) => carsController.read(req, res));
router.get(CARS_ID, (req, res) => carsController.readOne(req, res));
router.put(CARS_ID, (req, res) => carsController.update(req, res));
router.delete(CARS_ID, (req, res) => carsController.delete(req, res));

export default router;
