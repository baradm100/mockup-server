const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const dynamicRoutes = require('./routes');

const port = process.env.PORT || 3000;
const debug = process.env.NODE_ENV !== 'production';
const app = express();
const router = require('express').Router();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger(debug ? 'dev' : 'combined'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

// Adding static folder
app.use(express.static(path.join(__dirname, 'public')));

// Load dynamic routes
Object.keys(dynamicRoutes).forEach(function (url) {
    router.get(url, (req, res) => {
        let response = dynamicRoutes[url];
        if (typeof response === 'function')
            res.status(200).json(response(req.params));
        else
            res.status(200).json(response);
    })
});

app.use(router);

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Listening to the port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port} or http://127.0.0.1:${port}`);
});