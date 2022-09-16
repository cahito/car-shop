import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../../../app';
import { CARS } from '../../../routers/main';
const { expect } = chai;

describe('Testes de Controllers', () => {
  describe('1 - O CarsController:', () => {
    before(async () => {
      sinon
        .stub()
        .resolves();
    });
  
    after(()=>{
      sinon.restore();
    })
  
    it('estende a classe abstrata VehicleController', async () => {
      const result = await chai.request(app)
        .get(CARS);
    });

    it('', async () => {});
    it('', async () => {});
  })

});
