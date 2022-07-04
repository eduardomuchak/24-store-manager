// const Joi = require('joi');
const salesModel = require('../models/salesModel');
// const runSchema = require('./validators');
// const NotFoundError = require('../errors/NotFoundError');

const salesServices = {
  
  async listAllSales() {
    const sales = await salesModel.listAllSales();
    return sales;
  },

};

module.exports = salesServices;