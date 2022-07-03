const Joi = require('joi');
const productModel = require('../models/productModel');
const runSchema = require('./validators');
const NotFoundError = require('../errors/NotFoundError');

const productService = {

  validateBody: runSchema(
    Joi.object({
      name: Joi.string().required().min(5),
    }),
  ),

  validateParamsId: runSchema(
    Joi.object({
      id: Joi.number().required().integer(),
    }),
  ),

  async checkIfExists(id) {
    const exists = await productModel.checkIfExists(id);
    if (!exists) {
      throw new NotFoundError('Product not found');
    }
  },

  async listAllProducts() {
    const products = await productModel.listAllProducts();
    return products;
  },

  async getProductById(id) {
    const product = await productModel.getProductById(id);
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    return product;
  },

  async addProduct(product) {
    const result = await productModel.addProduct(product.name);
    return result;
  },

  async editProduct(id, changes) {
    if (Object.keys(changes).length) {
      await productModel.editProduct(id, changes.name);
    }
  },

  async deleteProduct(id) {
    await productModel.deleteProduct(id);
  },
};

module.exports = productService;