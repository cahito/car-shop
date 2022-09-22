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

  describe('para criar um registro de uma nova moto', () => {
    it('retorna a moto inserida corretamente', async () => {
      const result = await bikesModel.create(bikeDataToCreate);

      expect(result).to.be.eql(createdBike);
    });
  });

  describe('para recuperar o registro de todas as motos cadastradas', () => {
    it('retorna um array de todas as motos cadastradas', async () => {
      const result = await bikesModel.read();

      expect(result).to.be.eql(bikesMock);
    });
  });

  describe('para recuperar o registro de uma moto específica cadastrada', () => {
    it('retorna um objeto da moto cadastrada', async () => {
      const result = await bikesModel.readOne(ID_1);

      expect(result).to.be.eql(bikesMock[0]);
    });
  });

  describe('para atualizar o registro de uma moto específica cadastrada', () => {
    it('retorna o registro atualizado da moto cadastrada', async () => {
      const result = await bikesModel.update(ID_1, bikeDataToUpdate);

      expect(result).to.be.eql(updatedBike);
    });
  });

  describe('para apagar o registro de uma moto específica cadastrada', () => {
    it('retorna true quando é apagado a moto cadastrada', async () => {
      const result = await bikesModel.delete(ID_1);

      expect(result).to.be.true;
    });
  });
});