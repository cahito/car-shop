import CarsController from '../controllers/CarsController';
import CarsService from '../services/CarsService';
import CarsModel from '../models/CarsModel';
import BikesController from '../controllers/BikesController';
import BikesService from '../services/BikesService';
import BikesModel from '../models/BikesModel';

const carsModel = new CarsModel();
const carsService = new CarsService(carsModel);
const carsController = new CarsController(carsService);
const CARS = '/cars';
const CARS_ID = '/cars/:id';

const bikesModel = new BikesModel();
const bikesService = new BikesService(bikesModel);
const bikesController = new BikesController(bikesService);
const BIKES = '/motorcycles';
const BIKES_ID = '/motorcycles/:id';

export {
  carsController,
  CARS,
  CARS_ID,
  bikesController,
  BIKES,
  BIKES_ID,
};
