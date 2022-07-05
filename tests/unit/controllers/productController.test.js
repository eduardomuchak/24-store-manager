require('express-async-errors');
const { expect, use } = require('chai');
const { ValidationError } = require('joi');
const chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon');
const productsMock = require('../mocks/products.mock.js');
const productService = require('../../../services/productService');
const productController = require('../../../controllers/productController');
const NotFoundError = require('../../../errors/NotFoundError.js');

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

  describe('#addProduct', () => {
    it('deve retornar um erro ao tentar adicionar um produto com o corpo da requisição inválido', async () => {
      const req = {};
      const res = {};

      req.body = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      expect(productController.addProduct(req, res)).to.be.rejectedWith(ValidationError);
    });

    it('deve retornar o produto cadastrado ao tentar adicionar um produto com o corpo da requisição válido', async () => {
      const req = {};
      const res = {};

      req.body = { name: "Armadura do Homem de Ferro" };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      sinon.stub(productService, 'addProduct').resolves({ id: 4, name: "Armadura do Homem de Ferro" });

      await productController.addProduct(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith({ id: 4, name: "Armadura do Homem de Ferro" })).to.be.equal(true);
    });
  });

  describe('#editProduct', () => {
    it('deve retornar um erro ao tentar editar um produto com o corpo da requisição inválido', async () => {
      const req = {};
      const res = {};

      req.body = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      expect(productController.editProduct(req, res)).to.be.rejectedWith(ValidationError);
    });

    it('deve retornar o produto editado ao tentar editar um produto com o corpo da requisição válido', async () => {
      const req = {};
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      
      req.params = { id: 2 };
      req.body = { name: "Manopla do Infinito" };
      
      sinon.stub(productService, 'editProduct').resolves({id: 2, name: "Manopla do Infinito"});

      await productController.editProduct(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      // expect(res.json.calledWith({ id: 2, name: "Manopla do Infinito" })).to.be.equal(true);
    });
  });

  describe('#deleteProduct', () => {
    it('deve retornar um erro ao tentar excluir um produto que não existe', async () => {
      const req = {};
      const res = {};

      req.body = {};
      req.params = { id: 99};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      expect(productController.deleteProduct(req, res)).to.be.rejectedWith(NotFoundError);
    });

    it('deve retornar o produto excluído ao tentar excluir um produto que existe', async () => {
      const req = {};
      const res = {};

      req.params = { id: 3 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      sinon.stub(productService, 'deleteProduct').resolves(productsMock[2]);

      expect(productController.deleteProduct(req, res)).to.be.fulfilled;
    })
  });
})