import { isValidObjectId } from 'mongoose';
import { ZodSchema } from 'zod';
import { IService } from '../interfaces/IService';
import { IModel } from '../interfaces/IModel';

abstract class VehicleService<T> implements IService<T> {
  protected _vehicle:IModel<T>;
  protected _vehicleSchema:ZodSchema<T>;
  constructor(model:IModel<T>, vehicleSchema:ZodSchema<T>) {
    this._vehicle = model;
    this._vehicleSchema = vehicleSchema;
  }

  public async create(obj:unknown): Promise<T> {
    if (!obj) throw new Error('UndefinedObject');

    const parsed = this._vehicleSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }

    return this._vehicle.create(parsed.data);
  }

  public async read(): Promise<T[]> {
    return this._vehicle.read();
  }

  public async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');
    const result = await this._vehicle.readOne(_id);
    if (!result) throw new Error('ObjectNotFound');

    return result;
  }

  public async update(_id: string, obj: T): Promise<T> {
    if (!obj || Object.keys(obj).length === 0) throw new Error('UndefinedObject');
    if (!isValidObjectId(_id)) throw new Error('InvalidMongoId');
    
    const result = await this._vehicle.update(_id, obj);
    if (!result) throw new Error('ObjectNotFound');

    return result;
  }

  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error('InvalidMongoId');

    const result = await this._vehicle.delete(_id);
    if (!result) throw new Error('ObjectNotFound');

    return this._vehicle.delete(_id);
  }
}

export default VehicleService;
