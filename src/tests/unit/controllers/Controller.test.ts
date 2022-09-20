import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../../../app';
import { CARS } from '../../../routers/main';
import { carDataToCreate, carsMock, createdCar } from '../dataMock';
import { afterEach, beforeEach } from 'mocha';
import VehicleController from '../../../controllers/VehicleController';
import CarsModel from '../../../models/CarsModel';
import CarsService from '../../../services/CarsService';
import CarsController from '../../../controllers/CarsController';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes de Controllers', () => {
  const carModel = new CarsModel()
  const carService = new CarsService(carModel);
  const carController = new CarsController(carService);
  
  const req = {} as Request; 
  const res = {} as Response;

  describe('1 - O CarsController:', () => {
    beforeEach(async () => {
      sinon.stub(carModel, 'create').resolves(createdCar);
      sinon.stub(carModel, 'read').resolves(carsMock);
    });
  
    afterEach(()=>{
      sinon.restore();
    })
  
    it.skip('estende a classe abstrata VehicleController', async () => {
/*       const result = await chai.request(app)
        .get(CARS);

      expect(result).to.be.instanceOf(VehicleController) */
    });

    it.skip('retorna status 201 e o objeto criado, ao enviar um carro válido', async () => {
      const result = await chai.request(app)
        .post(CARS)
        .send(carDataToCreate);
      console.log(result);
      expect(result.status).to.be.eq(201);
      expect(result.body).to.be.eql(createdCar);
    });
    it.skip('retorna o status 200 e um array com os carros cadastrados', async () => {
      const result =  await chai.request(app)
        .get(CARS)
      console.log(result);
      expect(result.status).to.be.eq(200);
      expect(result.body).to.be.eql(carsMock);
    });
  })

});
