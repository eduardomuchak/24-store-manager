const productService = require('../services/productService');
const {
  HTTP_CREATED_STATUS,
  HTTP_OK_STATUS,
  HTTP_NO_CONTENT_STATUS,
} = require('../helpers/codesHTTP');

const productController = {
  
  async listAllProducts(_req, res) {
    const products = await productService.listAllProducts();
    res.status(HTTP_OK_STATUS).json(products);
  },

  async getProductById(req, res) {
    const [{ id }] = await Promise.resolve([
      productService.validateParamsId(req.params),
    ]);
    await productService.checkIfExists(id);
    const product = await productService.getProductById(id);
    res.status(HTTP_OK_STATUS).json(product);
  },

  async addProduct(req, res) {
    const isValidBodyName = await productService.validateBody(req.body);
    const product = await productService.addProduct(isValidBodyName);
    res.status(HTTP_CREATED_STATUS).json(product);
  },

  async editProduct(req, res) {
    const [{ id }, changes] = await Promise.all([
      productService.validateParamsId(req.params),
      productService.validateBody(req.body),
    ]);
    await productService.checkIfExists(id);
    await productService.editProduct(id, changes);
    const product = await productService.getProductById(id);
    res.status(HTTP_OK_STATUS).json(product);
  },

  async deleteProduct(req, res) {
    const { id } = await productService.validateParamsId(req.params);
    await productService.checkIfExists(id);
    await productService.deleteProduct(id);
    res.sendStatus(HTTP_NO_CONTENT_STATUS);
  },

  async searchProducts(req, res) {
    const { q } = req.query;
    const products = await productService.searchProducts(q);
    res.status(HTTP_OK_STATUS).json(products);
  },
};

module.exports = productController;