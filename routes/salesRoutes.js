const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRoute = Router();

salesRoute.get('/:id', salesController.getSaleById);
salesRoute.put('/:id', salesController.editSale);
salesRoute.post('/', salesController.addSale);
salesRoute.get('/', salesController.listAllSales);

module.exports = salesRoute;