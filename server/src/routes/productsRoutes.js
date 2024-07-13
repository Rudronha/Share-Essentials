const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

//routes to get products
router.get('/all', productController.getProducts);
router.get('/:id', productController.getProduct);

//rotues to manage favorite
router.get('/favorites/:id', productController.getFavorites);
router.get('/favorites/add/:id', productController.addFavorite);
router.get('/favorites/del/:id', productController.delFavorite);

//rotues to manage Cart products
router.get('/cart/:id', productController.getCart);
router.get('/cart/add/:id', productController.addToCart);
router.get('/cart/del/:id', productController.delFromCart);

module.exports = router;