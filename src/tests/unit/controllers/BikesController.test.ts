import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import { Request, Response } from 'express';

import BikesModel from '../../../models/BikesModel';
import BikesService from '../../../services/BikesService';
import BikesController from '../../../controllers/BikesController';
import {
  bikeDataToCreate,
  bikeDataToUpdate,
  bikesMock,
  createdBike,
  ID_1,
  updatedBike
} from '../dataMock';
import { motoZodSchema } from '../../../interfaces/IMotorcycle';

chai.use(chaiHttp);
const { expect } = chai;

describe('Ao testar a camada de Controller do cadastro de motos', () => {
  const bikesModel = new BikesModel()
  const bikesService = new BikesService(bikesModel, motoZodSchema);
  const bikesController = new BikesController(bikesService);

  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon.stub(bikesService, 'create').resolves(createdBike);
    sinon.stub(bikesService, 'read').resolves(bikesMock);
    sinon.stub(bikesService, 'readOne').withArgs(ID_1).resolves(bikesMock[0]);
    sinon.stub(bikesService, 'update').withArgs(ID_1, bikeDataToUpdate).resolves(updatedBike);
    sinon.stub(bikesService, 'delete').withArgs(ID_1).resolves();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  })

  describe('para criar um registro de uma nova moto', () => {
    it('retorna a moto inserido corretamente, com o status 201', async () => {
      req.body = bikeDataToCreate;
      await bikesController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(createdBike)).to.be.true;
    });
  })

  describe('para recuperar a lista de todas as motos cadastradas', () => {
    it('retorna status 200 e um array das motos cadastradas', async () => {
      await bikesController.read(req, res);
      
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(bikesMock)).to.be.true;
    });
  })

  describe('para recuperar o registro de uma moto específica cadastrada', () => {
    it('retorna status 200 e um objeto da moto cadastrada', async () => {
      req.params = { id: ID_1 };
      await bikesController.readOne(req, res);
      
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(bikesMock[0])).to.be.true;
    });
  })

  describe('para atualizar o registro de uma moto específica cadastrada', () => {
    it('retorna o status 200 e o registro atualizado da moto cadastrada', async () => {
      req.params = { id: ID_1 };
      req.body = bikeDataToUpdate;
      await bikesController.update(req, res);
      
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(updatedBike)).to.be.true;
    });
  })

  describe('para apagar o registro de uma moto específica cadastrada', () => {
    it('retorna o status 204 e nenhum texto quando é apagado a moto cadastrada', async () => {
      req.params = { id: ID_1 };
      await bikesController.delete(req, res);
      
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith()).to.be.true;
    });
  })
});
