import * as sinon from 'sinon';
import chai from 'chai';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
const { expect } = chai;
import BikesModel from '../../../models/BikesModel'
import BikesService from '../../../services/BikesService';
import {
  bikeDataToCreate,
  bikeDataToUpdate,
  bikesMock,
  bikeWrongColor,
  bikeWrongCategory,
  bikeWrongModel,
  bikeWrongEngCapacity,
  bikeWrongYear,
  createdBike,
  updatedBike,
  ID_1,
  ID_2,
  ID_INVALID,
  ID_NOT_FOUND,
} from '../dataMock';
import { Model } from 'mongoose';

const bikesModel = new BikesModel();
const bikesService = new BikesService(bikesModel);

describe('Ao testar a camada de Service do cadastro de motocicletas', () => {

  before(async () => {
  });

  afterEach(() => {
    sinon.restore();
  })
  describe('para criar um registro de uma nova moto', () => {
    it('retorna a moto inserida corretamente', async () => {
      sinon.stub(bikesModel, 'create').withArgs(bikeDataToCreate).resolves(createdBike);
      const result = await bikesService.create(bikeDataToCreate);

      expect(result).to.be.eql(createdBike);
    });

    it('retorna um erro caso não exista dados de uma moto para inserir', async () => {
      let error;
      try {
        await bikesService.create(undefined);
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.be.eql(ErrorTypes.UndefinedObject)
    });

    it('retorna um erro caso o modelo esteja errado para inserir', async () => {
      let error;
      try {
        await bikesService.create(bikeWrongModel);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    });

    it('retorna um erro caso a cor esteja errado para inserir', async () => {
      let error;
      try {
        await bikesService.create(bikeWrongColor);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    });

    it('retorna um erro caso o ano esteja errado para inserir', async () => {
      let error;
      try {
        await bikesService.create(bikeWrongYear);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    });

    it('retorna um erro caso a categoria esteja errada para inserir', async () => {
      let error;
      try {
        await bikesService.create(bikeWrongCategory);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    });

    it('retorna um erro caso a capacidade do motor esteja errada para inserir', async () => {
      let error;
      try {
        await bikesService.create(bikeWrongEngCapacity);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('para recuperar o registro de todas as motos cadastradas', () => {
    it('retorna um array de todas as motos cadastradas', async () => {
      sinon.stub(bikesModel, 'read').resolves(bikesMock);
      const result = await bikesService.read();

      expect(result).to.be.eql(bikesMock);
    });
  });

  describe('para recuperar o registro de uma moto cadastrada específica', () => {
    it('retorna um objeto da moto cadastrada específica', async () => {
      sinon.stub(bikesModel, 'readOne').resolves(bikesMock[1]);
      const result = await bikesService.readOne(ID_2);

      expect(result).to.be.eql(bikesMock[1]);
    });

    it('retorna um erro se o ID fornecido não for de um tipo válido', async () => {
      sinon.stub(bikesModel, 'readOne').resolves();
      let error;
      try {
        await bikesService.readOne(ID_INVALID);
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.eql(ErrorTypes.InvalidMongoId)
    });

    it('retorna um erro se o ID fornecido não constar na base de dados', async () => {
      sinon.stub(bikesModel, 'readOne').resolves();
      let error;
      try {
        await bikesService.readOne(ID_NOT_FOUND);
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.eql(ErrorTypes.ObjectNotFound)
    });
  });

  describe('para alterar o registro de uma moto cadastrada específica', () => {
    it('retorna o moto específico com as alterações', async () => {
      sinon.stub(bikesModel, 'update').withArgs(ID_1, bikeDataToUpdate).resolves(updatedBike);
      const result = await bikesService.update(ID_1, bikeDataToUpdate);

      expect(result).to.be.eql(updatedBike);
    });

    it('retorna um erro caso não exista um objeto de dados de uma moto para atualizar', async () => {
      let error;
      try {
        await bikesService.update(ID_1, undefined as any);
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.be.eql(ErrorTypes.UndefinedObject)
    });

    it('retorna um erro caso não existam dados de uma moto para atualizar', async () => {
      let error;
      try {
        await bikesService.update(ID_1, {} as any);
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.be.eql(ErrorTypes.UndefinedObject)
    });

    it('retorna um erro se o ID fornecido não for de um tipo válido', async () => {
      let error;
      try {
        await bikesService.update(ID_INVALID, bikeDataToUpdate);
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.eql(ErrorTypes.InvalidMongoId)
    });

    it('retorna um erro se o ID fornecido não constar na base de dados', async () => {
      sinon.stub(bikesModel, 'update').withArgs(ID_NOT_FOUND, bikeDataToUpdate).resolves();
      let error;
      try {
        await bikesService.update(ID_NOT_FOUND, bikeDataToUpdate);
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.eql(ErrorTypes.ObjectNotFound)
    });
  });

  describe('para apagar o registro de uma moto específica cadastrada', () => {
    it('retorna true quando é apagada a moto cadastrada', async () => {
      sinon.stub(Model, 'findByIdAndDelete').withArgs(ID_1).resolves(true);
      const result = await bikesService.delete(ID_1);

      expect(result).to.be.true;
    });

    it('retorna um erro se o ID fornecido não for de um tipo válido', async () => {
      sinon.stub(bikesModel, 'delete').resolves();
      let error;
      try {
        await bikesService.delete(ID_INVALID);
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.eql(ErrorTypes.InvalidMongoId)
    });

    it('retorna um erro se o ID fornecido não constar na base de dados', async () => {
      sinon.stub(bikesModel, 'delete').resolves();
      let error;
      try {
        await bikesService.delete(ID_NOT_FOUND);
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.eql(ErrorTypes.ObjectNotFound)
    });
  });
});
