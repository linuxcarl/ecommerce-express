const express = require('express');
const router = express.Router();
const ProductsService = require('../../services/products');
const validation = require('../../utils/middlewares/validacionHandler')
const {
    productIdSchema,
    productTagSchema,
    createProductSchema,
    updateProductSchema } = require('../../utils/schema/products');

const productService = new ProductsService();

router.get('/', async (req, res, next) => {

    const { tags } = req.query;
    try {
       // throw new Error('Esto chingo a 20 desde la API');// para probar los middlewares que creamos
        const product = await productService.getProducts({ tags });
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
        const product = await productService.getProduct({ productId });
        res.status(200).json({
            data: product,
            message: 'product listed'
        })
    } catch (error) {
        next(error);
    }
})
router.post('/', validation(createProductSchema), async (req, res, next) => {
    //desestructurado, primero mandas el indice que existe en req.body y lo asignas a la variable formData
    const { product: formData } = req.body;
    try {
        const product = await productService.createProduct({ formData });
        res.status(201).json({
            data: product,
            message: 'product created'
        })
    } catch (error) {
        next(error);
    }
})

router.put('/:productId', validation({ productId: productIdSchema }, "params"), validation(updateProductSchema), async (req, res, next) => {
    const { productId } = req.params;
    const { product: formData } = req.body;

    try {
        const product = await productService.updateProduct({ productId, formData });
        res.status(200).json({
            data: product,
            message: 'product updated'
        })
    } catch (error) {
        next(error);
    }
})


router.patch('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    const { product: formData } = req.body;

    try {
        const product = await productService.updateProduct({ productId, formData });
        res.status(200).json({
            data: product,
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
            data: product,
            message: 'product deleted'
        })
    } catch (error) {
        next(error);
    }
})

module.exports = router;