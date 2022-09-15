import { isValidObjectId } from 'mongoose';
import { IService } from '../interfaces/IService';
import { ICar, carZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';

class CarService implements IService<ICar> {
  private _car:IModel<ICar>;
  constructor(model:IModel<ICar>) {
    this._car = model;
  }

  public async create(obj:unknown): Promise<ICar> {
    if (!obj) throw new Error('UndefinedObject');

    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._car.create(parsed.data);
  }

  public async read(): Promise<ICar[]> {
    return this._car.read();
  }

  public async readOne(_id: string): Promise<ICar | null> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');
    const result = await this._car.readOne(_id);
    if (!result) throw new Error('ObjectNotFound');

    return result;
  }

  public async update(_id: string, obj: ICar): Promise<ICar> {
    if (!obj || Object.keys(obj).length === 0) throw new Error('UndefinedObject');
    if (!isValidObjectId(_id)) throw new Error('InvalidMongoId');
    
    const result = await this._car.update(_id, obj);
    if (!result) throw new Error('ObjectNotFound');

    return result;
  }

  public async delete(_id: string): Promise<ICar | null> {
    if (!isValidObjectId(_id)) throw new Error('InvalidMongoId');

    const result = await this._car.delete(_id);
    if (!result) throw new Error('ObjectNotFound');

    return this._car.delete(_id);
  }
}

export default CarService;
