import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

class CarsController {
  private _service: IService<ICar>;

  constructor(service: IService<ICar>) {
    this._service = service;
  }

  public async create(req: Request, res: Response<ICar>) {
    const payload = req.body;
    const result = await this._service.create(payload);
  
    res.status(201).json(result);
  }

  // public async read(): { }

  // public async readOne(_id: string): Promise<T | null>,
  // public async update(_id: string, obj: T): Promise<T | null>,
  // public async delete(_id: string): Promise<T | null>,
}

export default CarsController;
