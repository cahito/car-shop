import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const bikesMongooseSchema = new Schema<IMotorcycle>({
  status: Boolean,
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

class BikesModel extends MongoModel<IMotorcycle> {
  constructor(model = mongooseCreateModel('Motorcycles', bikesMongooseSchema)) {
    super(model);
  }
}

export default BikesModel;
