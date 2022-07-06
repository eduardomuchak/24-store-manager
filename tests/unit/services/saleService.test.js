const { expect, use } = require('chai');
const sinon = require('sinon');
const NotFoundError = require('../../../errors/NotFoundError');
const chaiAsPromised = require('chai-as-promised');
const salesMock = require('../mocks/sales.mock.js');
const salesService = require('../../../services/salesServices');
const salesModel = require('../../../models/salesModel');
const salesProductModel = require('../../../models/salesProductModel');

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

  describe('#validateBody', () => {
    it('se mandar um objeto válido deve retonar um objeto válido', () => {
      const object = salesService.validateBody([{ productId: 1, quantity: 5 }]);
      expect(object).to.be.deep.equal([{ productId: 1, quantity: 5 }]);
    });

    it('se mandar um array sem um objeto com a chave productId no body deve disparar um erro', () => {
      expect(() => salesService.validateBody([{}])).to
        .throws('"[0].productId" is required');
    });

    it('se mandar um array sem um objeto com a chave quantity no body deve disparar um erro', () => {
      expect(() => salesService.validateBody([{ productId: 1 }])).to
        .throws('"[0].quantity" is required');
    });
  });

  describe('#checkIfSaleExists', () => {
    it('deve retornar "true" ao passar um id que existe', async () => {
      sinon.stub(salesModel, 'checkIfSaleExists').resolves(true);
      const exists = await salesService.checkIfSaleExists(1);
      expect(exists).to.be.equal(true);
    });

    it('deve retornar um erro ao passar um id que não existe', () => {
      sinon.stub(salesModel, 'checkIfSaleExists').resolves(false);
      expect(salesService.checkIfSaleExists(99)).to.be.rejectedWith(NotFoundError);
    });
  });

  describe('#checkIfProductExists', () => {
    it('deve retornar "true" ao passar um id que existe', async () => {
      const exists = await salesService.checkIfProductExists(1);
      expect(exists).to.be.equal(true);
    });

    it('deve retornar um erro ao passar um id que não existe', () => {
      expect(salesService.checkIfProductExists(99)).to.be.rejectedWith(NotFoundError);
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

  describe('#addSale', () => {
    it('deve retornar o id da venda cadastrada', async () => {
      sinon.stub(salesProductModel, 'addSaleProducts').resolves(3);
      const saleId = await salesService.addSale([{ productId: 1, quantity: 5 }]);
      expect(saleId).to.be.equal(3);
    });
  });

  describe('#editSaleProducts', () => {
    it('deve retornar o id da venda alterada', async () => {
      sinon.stub(salesProductModel, 'editSaleProducts').resolves(1);
      const saleId = await salesService.editSale(1, [{ productId: 1, quantity: 5 }]);
      expect(saleId).to.be.equal(1);
    });
  });

  describe('#deleteSale', () => {
    it('deve retornar "affectedRows" se a venda for deletada com sucesso', async () => {
      sinon.stub(salesModel, 'deleteSale').resolves(1);
      const saleId = await salesService.deleteSale(1);
      expect(saleId).to.be.equal(true);
    });
  });

})