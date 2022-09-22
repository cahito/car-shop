import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import { Request, Response } from 'express';

import CarsModel from '../../../models/CarsModel';
import CarsService from '../../../services/CarsService';
import CarsController from '../../../controllers/CarsController';
import {
  carDataToCreate,
  carDataToUpdate,
  carsMock,
  createdCar,
  ID_1,
  updatedCar
} from '../dataMock';
import { carZodSchema } from '../../../interfaces/ICar';

chai.use(chaiHttp);
const { expect } = chai;

describe('Ao testar a camada de Controller do cadastro de carros', () => {
  const carsModel = new CarsModel()
  const carsService = new CarsService(carsModel, carZodSchema);
  const carsController = new CarsController(carsService);

  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon.stub(carsService, 'create').resolves(createdCar);
    sinon.stub(carsService, 'read').resolves(carsMock);
    sinon.stub(carsService, 'readOne').withArgs(ID_1).resolves(carsMock[0]);
    sinon.stub(carsService, 'update').withArgs(ID_1, carDataToUpdate).resolves(updatedCar);
    sinon.stub(carsService, 'delete').withArgs(ID_1).resolves();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  })

  describe('para criar um registro de um novo carro', () => {
    it('retorna o carro inserido corretamente, com o status 201', async () => {
      req.body = carDataToCreate;
      await carsController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(createdCar)).to.be.true;
    });
  })

  describe('para recuperar a lista de todos os carros cadastrados', () => {
    it('retorna status 200 e um array dos carros cadastrados', async () => {
      await carsController.read(req, res);
      
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMock)).to.be.true;
    });
  })

  describe('para recuperar o registro de um carro específico cadastrado', () => {
    it('retorna status 200 e um objeto do carro cadastrado', async () => {
      req.params = { id: ID_1 };
      await carsController.readOne(req, res);
      
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMock[0])).to.be.true;
    });
  })

  describe('para atualizar o registro de um carro específico cadastrado', () => {
    it('retorna o status 200 e o registro atualizado do carro cadastrado', async () => {
      req.params = { id: ID_1 };
      req.body = carDataToUpdate;
      await carsController.update(req, res);
      
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(updatedCar)).to.be.true;
    });
  })

  describe('para apagar o registro de um carro específico cadastrado', () => {
    it('retorna o status 204 e nenhum texto quando é apagado o carro cadastrado', async () => {
      req.params = { id: ID_1 };
      await carsController.delete(req, res);
      
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith()).to.be.true;
    });
  })
});
