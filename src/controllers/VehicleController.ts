import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';

class VehicleController<T> {
  protected _service: IService<T>;

  constructor(service: IService<T>) {
    this._service = service;
  }

  public async create(req: Request, res: Response<T>) {
    const payload = req.body;
    const result = await this._service.create(payload);
  
    res.status(201).json(result);
  }

  public async read(_req: Request, res: Response<T[]>) {
    const result = await this._service.read();

    res.status(200).json(result);
  }

  public async readOne(req: Request, res: Response<T | null>) {
    const { id } = req.params;
    const result = await this._service.readOne(id);

    res.status(200).json(result);
  }

  public async update(req: Request, res: Response<T | null>) {
    const { id } = req.params;
    const payload = req.body;
    const result = await this._service.update(id, payload);

    res.status(200).json(result);
  }

  public async delete(req: Request, res: Response<T | null>) {
    const { id } = req.params;
    await this._service.delete(id);

    res.status(204).json();
  }
}

export default VehicleController;
