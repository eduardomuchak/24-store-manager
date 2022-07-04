const { expect } = require('chai');
const sinon = require('sinon');
const db = require('../../../models/connection');
const productsMock = require('../mocks/products.mock.js');
const productModel = require('../../../models/productModel');

describe('Testa o productsModel', () => {
  
  beforeEach(() => {
    sinon.restore();
  });

  describe('#checkIfExists', () => {
    it('ao mandar um id de um registro que existe deve retornar `true`', async () => {
      sinon.stub(db, 'query').resolves([productsMock[0]]);
      const exists = await productModel.checkIfExists(1);
      expect(exists).to.be.equal(true);
    });

    it('ao mandar um id de um registro que não existe deve retornar `false`', async () => {
      sinon.stub(db, 'query').resolves([[]]);
      const exists = await productModel.checkIfExists(99);
      expect(exists).to.be.equal(false);
    });
  });

  describe('#listAllProducts', () => {
    it('deve retornar um array se a requisição for realizada com sucesso', async () => {
      sinon.stub(db, 'query').resolves([productsMock]);
      const productsList = await productModel.listAllProducts();
      expect(productsList).to.be.an('array');
    });
    
    // it('tal array deve possuir todos os produtos cadastrados', async () => {
    //   sinon.stub(db, 'query').resolves([[productsMock]]);
    //   const productsList = await productModel.listAllProducts();
    //   expect(productsList).to.be.eql(productsMock);
    // });

  });

  describe('#getProductById', () => {
    it('deve retornar um objeto se a requisição for realizada com sucesso', async () => {
      sinon.stub(db, 'query').resolves([productsMock[2]]);
      const foundProduct = await productModel.getProductById(3);
      expect(foundProduct).to.be.an('object');
    });

    it('tal objeto deve possuir as chaves "id" e "name" do produto', async () => {
      sinon.stub(db, 'query').resolves([productsMock[2]]);
      const foundProduct = await productModel.getProductById(3);
      expect(foundProduct).to.have.a.property('id');
      expect(foundProduct).to.have.a.property('name');
    });
  });

  describe('#editProduct', function () {
    const payload = { id: 2, name: 'Arco do Gavião Arqueiro' };
    it('deve retornar um objeto se a requisição for realizada com sucesso', async () => {
      sinon.stub(db, 'query').resolves([productsMock[0]]);
      const [foundProduct] = await productModel.editProduct(payload.id, payload.name);
      expect(foundProduct).to.be.an('object');
    });
  });

  describe('#addProduct', () => {
    const payload = { name: 'Arco do Gavião Arqueiro' };
    it('deve retornar um objeto se a requisição for realizada com sucesso', async () => {
      const response = await productModel.addProduct(payload.name);
      expect(response).to.be.a('object')
    });

    it('tal objeto deve possuir as chaves "id" e "name" do novo produto adicionado', async () => {
      const response = await productModel.addProduct(payload.name);
      expect(response).to.have.a.property('id')
      expect(response).to.have.a.property('name')
    });
  });

  describe('#editProduct', function () {
    const payload = { id: 2, name: 'Arco do Gavião Arqueiro' };
    it('deve retornar um objeto se a requisição for realizada com sucesso', async () => {
      sinon.stub(db, 'query').resolves([productsMock[0]]);
      const [foundProduct] = await productModel.editProduct(payload.id, payload.name);
      expect(foundProduct).to.be.an('object');
    });
  });

  describe('#deleteProduct', () => {
    const payload = { id: 3 };
    it('deve retornar um array se a requisição for realizada com sucesso', async () => {
      sinon.stub(db, 'query').resolves([[true]]);
      const response = await productModel.deleteProduct(payload.id);
      expect(response).to.be.an('array');
    });
  });
});