const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRoute = Router();

salesRoute.get('/', salesController.listAllSales);

module.exports = salesRoute;