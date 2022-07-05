const { expect, use } = require('chai');
const sinon = require('sinon');
const NotFoundError = require('../../../errors/NotFoundError');
const chaiAsPromised = require('chai-as-promised');
const salesMock = require('../mocks/sales.mock.js');
const salesService = require('../../../services/salesServices');
const salesModel = require('../../../models/salesModel');

use(chaiAsPromised);

describe('#Testa o salesService', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('#validateParamsId', () => {
    it('deve retornar um objeto válido se mandar um id válido', () => {
      const object = salesService.validateParamsId({ id: 1 });
      expect(object).to.be.deep.equal({ id: 1 });
    });

    it('deve disparar um erro se mandar um id inválido', () => {
      expect(() => salesService.validateParamsId({ id: 'string' })).to
        .throws('"id" must be a number');
    });
  });

  describe('#checkIfExists', () => {
    it('deve retornar "true" ao passar um id que existe', async () => {
      sinon.stub(salesModel, 'checkIfExists').resolves(true);
      const exists = await salesService.checkIfExists(1);
      expect(exists).to.be.eq(true);
    });

    it('deve retornar um erro ao passar um id que não existe', () => {
      sinon.stub(salesModel, 'checkIfExists').resolves(false);
      expect(salesService.checkIfExists(99)).to.be.rejectedWith(NotFoundError);
    });
  });

  describe('#listAllSales', () => {
    it('deve retornar um array se a requisição for realizada com sucesso', async () => {
      sinon.stub(salesModel, 'listAllSales').resolves([salesMock]);
      const salesList = await salesService.listAllSales();
      expect(salesList).to.be.an('array');
    });
  });

  describe('#getSaleById', () => {
    it('deve retornar um objeto se a requisição for realizada com sucesso', async () => {
      sinon.stub(salesModel, 'getSaleById').resolves([salesMock[0]]);
      const [foundSale] = await salesService.getSaleById(1);
      expect(foundSale).to.be.an('object');
    });

    it('tal objeto deve possuir as chaves "id" e "name" do produto', async () => {
      sinon.stub(salesModel, 'getSaleById').resolves([salesMock[0]]);
      const [foundSale] = await salesService.getSaleById(1);
      expect(foundSale).to.have.a.property('date');
      expect(foundSale).to.have.a.property('productId');
      expect(foundSale).to.have.a.property('quantity');
    });
  });
})