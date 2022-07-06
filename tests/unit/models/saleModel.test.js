const { expect } = require('chai');
const sinon = require('sinon');
const db = require('../../../models/connection');
const salesMock = require('../mocks/sales.mock.js');
const salesModel = require('../../../models/salesModel');

describe('#Testa o salesModel', () => {

  beforeEach(() => {
    sinon.restore();
  });

  describe('#checkIfSaleExists', () => {
    it('ao mandar um id de um registro que existe deve retornar `true`', async () => {
      sinon.stub(db, 'query').resolves([salesMock[0]]);
      const exists = await salesModel.checkIfSaleExists(1);
      expect(exists).to.be.equal(true);
    });

    it('ao mandar um id de um registro que não existe deve retornar `false`', async () => {
      sinon.stub(db, 'query').resolves([[]]);
      const exists = await salesModel.checkIfSaleExists(99);
      expect(exists).to.be.equal(false);
    });
  });

  describe('#listAllSales', () => {
    it('deve retornar um array se a requisição for realizada com sucesso', async () => {
      sinon.stub(db, 'query').resolves([salesMock]);
      const salesList = await salesModel.listAllSales();
      expect(salesList).to.be.an('array');
    });
  });

  describe('#getSaleById', () => {
    it('deve retornar um objeto se a requisição for realizada com sucesso', async () => {
      sinon.stub(db, 'query').resolves([salesMock[0]]);
      const [foundSale] = await salesModel.getSaleById(1);
      expect(foundSale).to.be.an('object');
    });

    it('tal objeto deve possuir as chaves "id" e "name" do produto', async () => {
      sinon.stub(db, 'query').resolves([salesMock[0]]);
      const [foundSale] = await salesModel.getSaleById(1);
      expect(foundSale).to.have.a.property('date');
      expect(foundSale).to.have.a.property('productId');
      expect(foundSale).to.have.a.property('quantity');
    });
  });
});