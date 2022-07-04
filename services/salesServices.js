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
  
  async listAllSales() {
    const sales = await salesModel.listAllSales();
    return sales;
  },

  async getSaleById(saleId) {
    const sale = await salesModel.getSaleById(saleId);
    if (!sale.length) {
      throw new NotFoundError('Sale not found');
    }
    return sale;
  },

};

module.exports = salesServices;