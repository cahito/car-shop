import { Request, Response } from 'express';

export interface IController<T> {
  create(req: Request, res: Response<T>): Promise<void>,
  read(req: Request, res: Response<T[]>): Promise<void>,
  readOne(req: Request, res: Response<T | null>): Promise<void>,
  update(req: Request, res: Response<T | null>): Promise<void>,
  delete(req: Request, res: Response<T | null>): Promise<void>,
}