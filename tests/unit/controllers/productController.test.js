const { expect, use } = require('chai');
const { ValidationError } = require('joi');
const chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon');
const productsMock = require('../mocks/products.mock.js');
const productService = require('../../../services/productService');
const productController = require('../../../controllers/productController');

require('express-async-errors');

use(chaiAsPromised);

describe('#Testa o productController', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('#listAllProducts', async () => {
    it('deve retornar um "array" com todos os produtos se a requisição for realizada com sucesso', async () => {
      const req = {};
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      sinon.stub(productService, 'listAllProducts').resolves(productsMock);

      await productController.listAllProducts(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(productsMock)).to.be.equal(true);
    });
  });

  describe('#getProductById', async () => {
    it('deve retornar um os dados de produto pesquisado a requisição for realizada com sucesso', async () => {
      const req = {};
      const res = {};

      req.params = { id: 2 };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      sinon.stub(productService, 'getProductById').resolves(productsMock[1]);

      await productController.getProductById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(productsMock[1])).to.be.equal(true);
    });
  });
})