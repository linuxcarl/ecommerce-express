const express = require('express');
const router = express.Router();
const ProductsService = require('../services/products');
const { config } = require('../config/index');
const productService = new ProductsService();
router.get('/', async (req, res, next) => {
    const { tag } = req.params;
    try {
        // throw new Error('Esto chingo a 20');// para probar los middlewares que creamos
        const products = await productService.getProducts({ tag });
        res.render("products", { products, dev: config.dev });
    } catch (error) {
        next(error);
    }

})

module.exports = router;