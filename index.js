const express = require('express');
const app = express();
const path = require('path');
const productsRouter = require('./routes/products')
//con pug
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "pug");


app.get('/', (req, res, next) => {
    res.render('index', { hello: 'Hola', world: 'Mundo! POST COVID 19' });
})

app.use('/products', productsRouter);


const server = app.listen(3002, () => {
    console.log(`Server en http://localhost:${server.address().port}`);
})