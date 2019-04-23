"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const routes_1 = require("./routes");
app.use(express.static(__dirname + '/app'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// Home
app.get('/', (req, res) => {
    res
        .json('Welcome to Alethio API');
});
app.get('error', (req, res, next) => {
    return next('Error occured');
});
app.use('/api', routes_1.default);
// Not found
app.use((req, res, next) => {
    return res.status(404).send({ msg: 'Url not found' });
});
// Error
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Port is listening on port ${port}`);
});
