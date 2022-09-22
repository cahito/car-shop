import * as sinon from 'sinon';
import chai from 'chai';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
const { expect } = chai;
import CarsModel from '../../../models/CarsModel'
import CarsService from '../../../services/CarsService';
import {
  carDataToCreate,
  carDataToUpdate,
  carsMock,
  carWrongColor,
  carWrongDoors,
  carWrongModel,
  carWrongSeats,
  carWrongYear,
  createdCar,
  ID_1,
  ID_2,
  ID_INVALID,
  ID_NOT_FOUND,
  updatedCar,
} from '../dataMock';
import { Model } from 'mongoose';

const carsModel = new CarsModel();
const carsService = new CarsService(carsModel);

describe('Ao testar a camada de Service do cadastro de carros', () => {

  before(async () => {
  });

  afterEach(() => {
    sinon.restore();
  })
  describe('para criar um registro de um novo carro', () => {
    it('retorna o carro inserido corretamente', async () => {
      sinon.stub(carsModel, 'create').withArgs(carDataToCreate).resolves(createdCar);
      const result = await carsService.create(carDataToCreate);

      expect(result).to.be.eql(createdCar);
    });

    it('retorna um erro caso não exista dados de um carro para inserir', async () => {
      let error;
      try {
        await carsService.create(undefined);
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.be.eql(ErrorTypes.UndefinedObject)
    });

    it('retorna um erro caso o modelo esteja errado para inserir', async () => {
      let error;
      try {
        await carsService.create(carWrongModel);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    });

    it('retorna um erro caso a cor esteja errado para inserir', async () => {
      let error;
      try {
        await carsService.create(carWrongColor);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    });

    it('retorna um erro caso o ano esteja errado para inserir', async () => {
      let error;
      try {
        await carsService.create(carWrongYear);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    });

    it('retorna um erro caso o número de portas esteja errado para inserir', async () => {
      let error;
      try {
        await carsService.create(carWrongDoors);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    });

    it('retorna um erro caso o número de assentos esteja errado para inserir', async () => {
      let error;
      try {
        await carsService.create(carWrongSeats);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('para recuperar o registro de todos os carros cadastrados', () => {
    it('retorna um array de todos os carros cadastrados', async () => {
      sinon.stub(carsModel, 'read').resolves(carsMock);
      const result = await carsService.read();

      expect(result).to.be.eql(carsMock);
    });
  });

  describe('para recuperar o registro de um carro cadastrado específico', () => {
    it('retorna um objeto do carro cadastrado específico', async () => {
      sinon.stub(carsModel, 'readOne').resolves(carsMock[1]);
      const result = await carsService.readOne(ID_2);

      expect(result).to.be.eql(carsMock[1]);
    });

    it('retorna um erro se o ID fornecido não for de um tipo válido', async () => {
      sinon.stub(carsModel, 'readOne').resolves();
      let error;
      try {
        await carsService.readOne(ID_INVALID);
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.eql(ErrorTypes.InvalidMongoId)
    });

    it('retorna um erro se o ID fornecido não constar na base de dados', async () => {
      sinon.stub(carsModel, 'readOne').resolves();
      let error;
      try {
        await carsService.readOne(ID_NOT_FOUND);
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.eql(ErrorTypes.ObjectNotFound)
    });
  });

  describe('para alterar o registro de um carro cadastrado específico', () => {
    it('retorna o carro específico com as alterações', async () => {
      sinon.stub(carsModel, 'update').withArgs(ID_1, carDataToUpdate).resolves(updatedCar);
      const result = await carsService.update(ID_1, carDataToUpdate);

      expect(result).to.be.eql(updatedCar);
    });

    it('retorna um erro caso não exista um objeto de dados de um carro para atualizar', async () => {
      let error;
      try {
        await carsService.update(ID_1, undefined as any);
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.be.eql(ErrorTypes.UndefinedObject)
    });

    it('retorna um erro caso não existam dados de um carro para atualizar', async () => {
      let error;
      try {
        await carsService.update(ID_1, {} as any);
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.be.eql(ErrorTypes.UndefinedObject)
    });

    it('retorna um erro se o ID fornecido não for de um tipo válido', async () => {
      let error;
      try {
        await carsService.update(ID_INVALID, carDataToUpdate);
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.eql(ErrorTypes.InvalidMongoId)
    });

    it('retorna um erro se o ID fornecido não constar na base de dados', async () => {
      sinon.stub(carsModel, 'update').withArgs(ID_NOT_FOUND, carDataToUpdate).resolves();
      let error;
      try {
        await carsService.update(ID_NOT_FOUND, carDataToUpdate);
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.eql(ErrorTypes.ObjectNotFound)
    });
  });

  describe('para apagar o registro de um carro específico cadastrado', () => {
    it('retorna true quando é apagado o carro cadastrado', async () => {
      sinon.stub(Model, 'findByIdAndDelete').withArgs(ID_1).resolves(true);
      const result = await carsService.delete(ID_1);

      expect(result).to.be.true;
    });

    it('retorna um erro se o ID fornecido não for de um tipo válido', async () => {
      sinon.stub(carsModel, 'delete').resolves();
      let error;
      try {
        await carsService.delete(ID_INVALID);
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.eql(ErrorTypes.InvalidMongoId)
    });

    it('retorna um erro se o ID fornecido não constar na base de dados', async () => {
      sinon.stub(carsModel, 'delete').resolves();
      let error;
      try {
        await carsService.delete(ID_NOT_FOUND);
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.eql(ErrorTypes.ObjectNotFound)
    });
  });
});
