const Joi = require('joi');
const salesModel = require('../models/salesModel');
const runSchema = require('./validators');
const NotFoundError = require('../errors/NotFoundError');
const salesProductModel = require('../models/salesProductModel');

const salesServices = {

  validateParamsId: runSchema(
    Joi.object({
      id: Joi.number().required().integer(),
    }),
  ),

  validateBody: runSchema(
    Joi.array().items(Joi.object({
      productId: Joi.number().required().integer(),
      quantity: Joi.number().required().min(1).integer(),
    })),
  ),

  async checkIfSaleExists(saleId) {
    const exists = await salesModel.checkIfSaleExists(saleId);
    if (!exists) {
      throw new NotFoundError('Sale not found');
    }
    return true;
  },

  async checkIfProductExists(productId) {
    const exists = await salesProductModel.checkIfProductExists(productId);
    if (!exists) {
      throw new NotFoundError('Product not found');
    }
    return true;
  },
  
  async listAllSales() {
    const sales = await salesModel.listAllSales();
    return sales;
  },

  async getSaleById(saleId) {
    const sale = await salesModel.getSaleById(saleId);
    return sale;
  },

  async addSale(sale) {
    const saleId = await salesModel.addSale();
    const result = sale.map(({ productId, quantity }) =>
      salesProductModel.addSaleProducts(saleId, productId, quantity));
    await Promise.all(result);
    return saleId;
  },

  async editSale(saleId, sale) {
    const result = sale.map(({ productId, quantity }) =>
      salesProductModel.editSaleProducts(quantity, saleId, productId));
    await Promise.all(result);
    return saleId;
  },

  async deleteSale(saleId) {
    await salesModel.deleteSale(saleId);
    return true;
  },
};

module.exports = salesServices;