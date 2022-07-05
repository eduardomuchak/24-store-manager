const Joi = require('joi');
const salesModel = require('../models/salesModel');
const runSchema = require('./validators');
const NotFoundError = require('../errors/NotFoundError');

const salesServices = {

  validateParamsId: runSchema(
    Joi.object({
      id: Joi.number().required().integer(),
    }),
  ),

  async checkIfExists(saleId) {
    const exists = await salesModel.checkIfExists(saleId);
    if (!exists) {
      throw new NotFoundError('Sale not found');
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

};

module.exports = salesServices;