const productsMocks = require('../utils/mocks/products');
const MongoLib =  require('../lib/mongo');
class ProductsService {
    constructor() {
        this.collection = 'products';
        this.mongoDB = new MongoLib();
    }
    async getProducts({ tags }) {
        const query = tags && { tags: { $in: tags} };
        try {
            const products = await this.mongoDB.getAll(this.collection, query);
            return products || [];
        } catch (error) {
            console.log(error)
        }
        
    }

    async getProduct({ productId }) {
        try {
            const product = await this.mongoDB.getOne(this.collection, productId );
            return  product || {};
        }catch(e) {
            console.log(e);
        }
    }

    async createProduct({ formData }) {
        try {
            const createdProducId= await this.mongoDB.create(this.collection, formData);
            return createdProducId
        }catch(e) {
            console.log(e);
        }
    }

    async updateProduct({ productId, formData }) {
        try {
            const updateProductId= await this.mongoDB.update(this.collection,formData, productId );
            return updateProductId;
        }catch(e) {
            console.log(e);
        }
    }

    async deleteProduct({ productId }) {
        try {
            const deleteproductId = await this.mongoDB.delete(this.collection, productId);
            return deleteproductId
        }catch(e) {
            console.log(e);
        }
    }
}
module.exports = ProductsService;