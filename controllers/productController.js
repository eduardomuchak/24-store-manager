const productServices = require('../services/productServices');
const {
  HTTP_CREATED_STATUS,
  HTTP_OK_STATUS,
  HTTP_NO_CONTENT_STATUS,
} = require('../helpers/codesHTTP');

const productController = {
  async listAllProducts(_req, res) {
    const products = await productServices.listAllProducts();
    res.status(HTTP_OK_STATUS).json(products);
  },

  async getProductById(req, res) {
    const [{ id }] = await Promise.resolve([
      productServices.validateParamsId(req.params),
    ]);
    await productServices.checkIfExists(id);
    const product = await productServices.getProductById(id);
    res.status(HTTP_OK_STATUS).json(product);
  },

  async addProduct(req, res) {
    const isValidBodyName = await productServices.validateBody(req.body);
    const product = await productServices.addProduct(isValidBodyName);
    res.status(HTTP_CREATED_STATUS).json(product);
  },

  async editProduct(req, res) {
    const [{ id }, changes] = await Promise.all([
      productServices.validateParamsId(req.params),
      productServices.validateBody(req.body),
    ]);
    await productServices.checkIfExists(id);
    await productServices.editProduct(id, changes);
    const product = await productServices.getProductById(id);
    res.status(HTTP_OK_STATUS).json(product);
  },

  async deleteProduct(req, res) {
    const { id } = await productServices.validateParamsId(req.params);
    await productServices.checkIfExists(id);
    await productServices.deleteProduct(id);
    res.sendStatus(HTTP_NO_CONTENT_STATUS);
  },
};

module.exports = productController;