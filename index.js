const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const productsRouter = require('./routes/products');
const productsApiRouter =  require('./routes/api/products')
const boom = require("@hapi/boom");
const {
    logErrors,
    clientErrorHandler,
    errorHandler,
    wrapErrors
} = require('./utils/middlewares/errorsHandlers')
const authApiRouter = require('./routes/api/auth')
const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi');
//app
const app = express();

//middlewares
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//static files
app.use("/static", express.static(path.join(__dirname, "public")));

//view engine setup
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "pug");

//routes
app.use('/api/products', productsApiRouter);
app.use('/products', productsRouter);
app.use('/api/auth', authApiRouter);
//redirect
app.get((req, res) =>{
    res.redirect('/products');
})

app.use(function(req, res, next){
    if (isRequestAjaxOrApi(req)) {
        const {
          output: { statusCode, payload }
        } = boom.notFound();
    
        res.status(statusCode).json(payload);
      }
    
      res.status(404).render("404");
})
//errors handlers
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
app.use(wrapErrors);


const server = app.listen(3002, () => {
    console.log(`Server en http://localhost:${server.address().port}`);
})