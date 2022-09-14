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
    return this._car.readOne(_id);
  }

  public async update(_id: string, obj: ICar): Promise<ICar | null> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');
    return this._car.update(_id, obj);
  }

  public async delete(_id: string): Promise<ICar | null> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');
    return this._car.delete(_id);
  }
}

export default CarService;
