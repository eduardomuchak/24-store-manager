const { Router } = require('express');
const productController = require('../controllers/productController');

const productsRoute = Router();

productsRoute.get('/search', productController.searchProducts);
productsRoute.delete('/:id', productController.deleteProduct);
productsRoute.put('/:id', productController.editProduct);
productsRoute.get('/:id', productController.getProductById);
productsRoute.get('/', productController.listAllProducts);
productsRoute.post('/', productController.addProduct);

module.exports = productsRoute;