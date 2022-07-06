require('express-async-errors');
const { expect, use } = require('chai');
const chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon');
const salesMock = require('../mocks/sales.mock.js');
const salesService = require('../../../services/salesServices');
const salesController = require('../../../controllers/salesController');
const { ValidationError } = require('joi');

use(chaiAsPromised);

describe('#Testa o salesController', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('#listAllSales', async () => {
    it('deve retornar um "array" com todos os produtos se a requisição for realizada com sucesso', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      sinon.stub(salesService, 'listAllSales').resolves(salesMock);

      await salesController.listAllSales(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(salesMock)).to.be.equal(true);
    });
  });

  describe('#getSaleById', async () => {
    it('deve retornar um os dados de produto pesquisado a requisição for realizada com sucesso', async () => {
      const req = {};
      const res = {};

      req.params = { id: 1 };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      sinon.stub(salesService, 'getSaleById').resolves(salesMock[0]);

      await salesController.getSaleById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(salesMock[0])).to.be.equal(true);
    });
  });

  describe('#addSale', async () => {
    it('deve retornar um erro ao tentar adicionar uma venda com o corpo da requisição inválido', async () => {
      const req = {};
      const res = {};

      req.body = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      expect(salesController.addSale(req, res)).to.be.rejectedWith(ValidationError);
    });
  });
})