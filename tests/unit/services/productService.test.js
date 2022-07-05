const { expect, use } = require('chai');
const sinon = require('sinon');
const NotFoundError = require('../../../errors/NotFoundError');
const chaiAsPromised = require('chai-as-promised');
const productsMock = require('../mocks/products.mock.js');
const productService = require('../../../services/productService');
const productModel = require('../../../models/productModel');

use(chaiAsPromised);

describe('#Testa o productService', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('#validateParamsId', () => {
    it('deve retornar um objeto válido se mandar um id válido', () => {
      const object = productService.validateParamsId({ id: 1 });
      expect(object).to.be.deep.equal({ id: 1 });
    });

    it('deve disparar um erro se mandar um id inválido', () => {
      expect(() => productService.validateParamsId({ id: 'string' })).to
        .throws('"id" must be a number');
    });
  });

  describe('#validateBody', () => {
    it('se mandar um objeto válido deve retonar um objeto válido', () => {
      const object = productService.validateBody({ name: 'Armadura do Homem de Ferro' });
      expect(object).to.be.deep.equal({ name: 'Armadura do Homem de Ferro' });
    });

    it('se mandar um objeto sem nome no body deve disparar um erro', () => {
      expect(() => productService.validateBody({})).to
        .throws('"name" is required');
    });
  });

  describe('#checkIfExists', () => {
    it('deve retornar "true" ao passar um id que existe', async () => {
      sinon.stub(productModel, 'checkIfExists').resolves(true);
      const exists = await productService.checkIfExists(1);
      expect(exists).to.be.eq(true);
    });

    it('deve retornar um erro ao passar um id que não existe', () => {
      sinon.stub(productModel, 'checkIfExists').resolves(false);
      expect(productService.checkIfExists(99)).to.be.rejectedWith(NotFoundError);
    });
  });

  describe('#listAllProducts', () => {
    it('deve retornar um array se a requisição for realizada com sucesso', async () => {
      sinon.stub(productModel, 'listAllProducts').resolves([productsMock]);
      const productsList = await productService.listAllProducts();
      expect(productsList).to.be.an('array');
    });
  });

  describe('#getProductById', () => {
    it('deve retornar um objeto se a requisição for realizada com sucesso', async () => {
      sinon.stub(productModel, 'getProductById').resolves([productsMock[0]]);
      const [foundProduct] = await productService.getProductById(1);
      expect(foundProduct).to.be.an('object');
    });

    it('tal objeto deve possuir as chaves "id" e "name" do produto', async () => {
      sinon.stub(productModel, 'getProductById').resolves([productsMock[0]]);
      const [foundProduct] = await productService.getProductById(1);
      expect(foundProduct).to.have.a.property('id');
      expect(foundProduct).to.have.a.property('name');
    });
  });

  describe('#addProduct', () => {
    it('deve retornar um objeto se a requisição for realizada com sucesso', async () => {
      sinon.stub(productModel, 'addProduct').resolves({id: 4, name: 'Disco do Super Shock'});
      const response = await productService.addProduct({ name: 'Disco do Super Shock' });
      expect(response).to.be.a('object');
    });

    it('tal objeto deve possuir as chaves "id" e "name" com os valores 4 e "Disco do Super Shock"', async () => {
      sinon.stub(productModel, 'addProduct').resolves({ id: 4, name: 'Disco do Super Shock' });
      const response = await productService.addProduct({ name: 'Disco do Super Shock' });
      expect(response).to.have.a.property('id');
      expect(response.id).to.be.equal(4);
      expect(response).to.have.a.property('name');
      expect(response.name).to.be.equal('Disco do Super Shock');
    });
  });

  describe('#editProduct', () => {
    it('deve retornar true ao tentar editar um produto enviando o id de um produto e um objeto com a chave "name"', async () => {
      sinon.stub(productModel, 'editProduct').resolves(true);
      const result = await productService.editProduct(2, { name: 'Capa da Invisibilidade do Harry Potter' });
      expect(result).to.be.equal(true);
    });

    it('deve retornar false ao tentar editar um produto enviando o id de um produto e um objeto sem a chave "name"', async () => {
      sinon.stub(productModel, 'editProduct').resolves(false);
      const result = await productService.editProduct(1, { nome: 'Capa da Invisibilidade do Harry Potter' });
      expect(result).to.be.equal(false);
    });
  });

  describe('#deleteProduct', () => {
    it('deve retornar um array se a requisição for realizada com sucesso', async () => {
      sinon.stub(productModel, 'deleteProduct').resolves(true);
      const result = await productService.deleteProduct(3);
      expect(result).to.be.equal(true);
    });
  });
})