import CarsController from '../controllers/CarsController';
import CarsService from '../services/CarsService';
import CarsModel from '../models/CarsModel';

const carsModel = new CarsModel();
const carsService = new CarsService(carsModel);
const carsController = new CarsController(carsService);
const CARS = '/cars';
const CARS_ID = '/cars/:id';

export {
  carsController,
  CARS,
  CARS_ID,
};
