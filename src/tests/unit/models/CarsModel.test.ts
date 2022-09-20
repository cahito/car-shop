import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from 'mongoose';
import CarsModel from '../../../models/CarsModel'
import {
  carDataToCreate,
  carDataToUpdate,
  carsMock,
  createdCar,
  ID_1,
  updatedCar,
} from '../dataMock';

const carsModel = new CarsModel();

describe('Ao testar a camada de Model do cadastro de carros', () => {

  before(async () => {
    sinon.stub(Model, 'create').resolves(createdCar);
    sinon.stub(Model, 'find').resolves(carsMock);
    sinon.stub(Model, 'findById').withArgs(ID_1).resolves(carsMock[0]);
    sinon.stub(Model, 'findByIdAndUpdate').withArgs(ID_1, carDataToUpdate, { new: true }).resolves(updatedCar);
    sinon.stub(Model, 'findByIdAndDelete').withArgs(ID_1).resolves(true);
  });

  after(()=>{
    sinon.restore();
  })

  describe('para criar um registro de um novo carro', () => {
    it('retorna o carro inserido corretamente', async () => {
      const result = await carsModel.create(carDataToCreate);

      expect(result).to.be.eql(createdCar);
    });
  });

  describe('para recuperar o registro de todos os carros cadastrados', () => {
    it('retorna um array de todos os carros cadastrados', async () => {
      const result = await carsModel.read();

      expect(result).to.be.eql(carsMock);
    });
  });

  describe('para recuperar o registro de um carro específico cadastrado', () => {
    it('retorna um objeto do carro cadastrado', async () => {
      const result = await carsModel.readOne(ID_1);

      expect(result).to.be.eql(carsMock[0]);
    });
  });

  describe('para atualizar o registro de um carro específico cadastrado', () => {
    it('retorna o registro atualizado do carro cadastrado', async () => {
      const result = await carsModel.update(ID_1, carDataToUpdate);

      expect(result).to.be.eql(updatedCar);
    });
  });

  describe('para apagar o registro de um carro específico cadastrado', () => {
    it('retorna true quando é apagado o carro cadastrado', async () => {
      const result = await carsModel.delete(ID_1);

      expect(result).to.be.true;
    });
  });
});