import { IMotorcycle, motoZodSchema } from '../interfaces/IMotorcycle';
import BikesModel from '../models/BikesModel';
import VehicleService from './VehicleService';

class BikesService extends VehicleService<IMotorcycle> {
  constructor(model = new BikesModel(), vehicleSchema = motoZodSchema) {
    super(model, vehicleSchema);
  }
}

export default BikesService;
