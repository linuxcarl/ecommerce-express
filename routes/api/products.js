const express = require('express');
const router = express.Router();
const ProductsService = require('../../services/products');

const productService = new ProductsService();

router.get('/', async (req, res, next) => {
    const { tag } = req.query;
    try {
        const product = await productService.getProducts({ tag });
        res.status(200).json({
            data: product,
            message: 'product listed'
        })
    } catch (error) {
        next(error);
    }

})

router.get('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    try {
        const product = await productService.getProducts({ productId });
        res.status(200).json({
            data: product[0],
            message: 'product listed'
        })
    } catch (error) {
        next(error);
    }
})
router.post('/', async (req, res, next) => {
    const { formData: products } = req
    try {
        const product = await productService.createProduct({ formData });
        res.status(201).json({
            data: product[0],
            message: 'product created'
        })
    } catch (error) {
        next(error);
    }
})

router.put('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    const { formData: product } = req.params;
    try {
        const product = await productService.updateProduct({ productId, formData });
        res.status(200).json({
            data: product[0],
            message: 'product updated'
        })
    } catch (error) {
        next(error);
    }
})


router.patch('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    const { formData: product } = req.params;
    try {
        const product = await productService.updateProduct({ productId, formData });
        res.status(200).json({
            data: product[0],
            message: 'product patched'
        })
    } catch (error) {
        next(error);
    }
})


router.delete('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    try {
        const product = await productService.deleteProduct({ productId });
        res.status(200).json({
            data: product[0],
            message: 'product deleted'
        })
    } catch (error) {
        next(error);
    }
})

module.exports = router;