const productsMocks = require('../utils/mocks/products');

class ProductsService {
    constructor() {

    }
    getProducts({ tag }) {
        return Promise.resolve(productsMocks);
    }

    getProduct({ productId }) {
        return Promise.resolve(productsMocks[0]);
    }

    createProduct({ formData }) {
        return Promise.resolve(productsMocks[0]);
    }

    updateProduct({ productId, formData }) {
        return Promise.resolve(productsMocks[0]);
    }

    deleteProduct({ productId }) {
        return Promise.resolve(productsMocks[0]);
    }
}
module.exports = ProductsService;