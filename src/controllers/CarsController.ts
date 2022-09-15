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

  public async read(_req: Request, res: Response<ICar[]>) {
    const result = await this._service.read();

    res.status(200).json(result);
  }

  public async readOne(req: Request, res: Response<ICar | null>) {
    const { id } = req.params;
    const result = await this._service.readOne(id);

    res.status(200).json(result);
  }

  // public async update(_id: string, obj: T): Promise<T | null>,
  // public async delete(_id: string): Promise<T | null>,
}

export default CarsController;
