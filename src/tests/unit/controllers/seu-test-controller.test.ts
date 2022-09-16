import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;

describe('Testes de Controllers', () => {
  describe('', () => {
    before(async () => {
      sinon
        .stub()
        .resolves();
    });
  
    after(()=>{
      sinon.restore();
    })
  
    it('', async () => {});
    it('', async () => {});
    it('', async () => {});
  })

});
