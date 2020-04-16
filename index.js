const express = require('express');
const app = express();
const path = require('path');
const productsRouter = require('./routes/products');
const productsApiRouter =  require('./routes/api/products')
//const bodyParse = require('body-parse');

//con pug
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "pug");
app.use("/static", express.static(path.join(__dirname, "public")));

app.use('/api/products', productsApiRouter);
app.use('/products', productsRouter);

app.use(express.json());

const server = app.listen(3002, () => {
    console.log(`Server en http://localhost:${server.address().port}`);
})