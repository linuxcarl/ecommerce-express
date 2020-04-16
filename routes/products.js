const express = require('express');
const router = express.Router();
const ProductsService = require('../services/products');

const productService = new ProductsService();
router.get('/', async (req, res, next) => {
    const { tag } =  req.params;
    try {
        const products = await productService.getProducts({ tag });
        res.render("products", { products });
    } catch (error) {
        next(error);
    }

}) 

module.exports = router;