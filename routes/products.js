const express = require('express');
const router = express.Router();

const products = [
    {
        name: "Read Shoes",
        price: 10
    },
    {
        name: "Black Bike",
        price: 250
    }
];
router.get('/', (req, res) => {
    res.render("products", { products });
})

module.exports = router;