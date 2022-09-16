import { carZodSchema, ICar } from '../interfaces/ICar';
import VehicleService from './VehicleService';
import CarsModel from '../models/CarsModel';

class CarService extends VehicleService<ICar> {
  constructor(model = new CarsModel(), vehicleSchema = carZodSchema) {
    super(model, vehicleSchema);
  }
}

export default CarService;
