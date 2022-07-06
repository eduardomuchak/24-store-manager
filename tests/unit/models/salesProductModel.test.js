const { expect } = require('chai');
const sinon = require('sinon');
const db = require('../../../models/connection');
const salesProductMock = require('../mocks/salesProduct.mock.js');
const salesProductModel = require('../../../models/salesProductModel');

describe('#Testa o salesProductModel', () => {

  beforeEach(() => {
    sinon.restore();
  });

  describe('#checkIfProductExists', () => {
    it('ao mandar um id de um registro que existe deve retornar `true`', async () => {
      sinon.stub(db, 'query').resolves(true);
      const exists = await salesProductModel.checkIfProductExists(1);
      expect(exists).to.be.equal(true);
    });
  });

  describe('#addSaleProducts', () => {
    it('ao mandar a quantidade e um o id da venda e do produto retorna o id da venda', async () => {
      sinon.stub(db, 'query').resolves([salesProductMock[0].saleId]);
      const product = {
        saleId: 1,
        productId: 1,
        quantity: 5,
      }
      const saleId = await salesProductModel.addSaleProducts(product.saleId, product.productId, product.quantity);
      expect(saleId).to.be.equal(1);
    });
  });

  describe('#editSaleProducts', () => {
    it('ao mandar a quantidade e um o id da venda e do produto retorna o id da venda', async () => {
      sinon.stub(db, 'query').resolves([salesProductMock[0].saleId]);
      const product = {
        saleId: 1,
        productId: 1,
        quantity: 5,
      }
      const saleId = await salesProductModel.editSaleProducts(product.quantity, product.saleId, product.productId);
      expect(saleId).to.be.equal(1);
    });
  });
});