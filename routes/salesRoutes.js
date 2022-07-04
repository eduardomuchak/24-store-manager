const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRoute = Router();

salesRoute.get('/:id', salesController.getSaleById);
salesRoute.get('/', salesController.listAllSales);

module.exports = salesRoute;