import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from 'mongoose';
import BikesModel from '../../../models/BikesModel';
import {
  bikeDataToCreate,
  bikeDataToUpdate,
  bikesMock,
  createdBike,
  ID_1,
  updatedBike,
} from '../dataMock';

const bikesModel = new BikesModel();

describe('Ao testar a camada de Model do cadastro de motos', () => {

  before(async () => {
    sinon.stub(Model, 'create').resolves(createdBike);
    sinon.stub(Model, 'find').resolves(bikesMock);
    sinon.stub(Model, 'findById').withArgs(ID_1).resolves(bikesMock[0]);
    sinon.stub(Model, 'findByIdAndUpdate').withArgs(ID_1, bikeDataToUpdate, { new: true }).resolves(updatedBike);
    sinon.stub(Model, 'findByIdAndDelete').withArgs(ID_1).resolves(true);
  });

  after(()=>{
    sinon.restore();
  })

  describe('para criar um registro de um novo carro', () => {
    it('retorna o carro inserido corretamente', async () => {
      const result = await bikesModel.create(bikeDataToCreate);

      expect(result).to.be.eql(createdBike);
    });
  });

  describe('para recuperar o registro de todos os carros cadastrados', () => {
    it('retorna um array de todos os carros cadastrados', async () => {
      const result = await bikesModel.read();

      expect(result).to.be.eql(bikesMock);
    });
  });

  describe('para recuperar o registro de um carro específico cadastrado', () => {
    it('retorna um objeto do carro cadastrado', async () => {
      const result = await bikesModel.readOne(ID_1);

      expect(result).to.be.eql(bikesMock[0]);
    });
  });

  describe('para atualizar o registro de um carro específico cadastrado', () => {
    it('retorna o registro atualizado do carro cadastrado', async () => {
      const result = await bikesModel.update(ID_1, bikeDataToUpdate);

      expect(result).to.be.eql(updatedBike);
    });
  });

  describe('para apagar o registro de um carro específico cadastrado', () => {
    it('retorna true quando é apagado o carro cadastrado', async () => {
      const result = await bikesModel.delete(ID_1);

      expect(result).to.be.true;
    });
  });
});