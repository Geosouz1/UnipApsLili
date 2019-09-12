const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

var now = new Date();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev')); // registrar cada pedido para o console


// rotas ===================================
require('./config/router.js')(app);

// Rotas nodo_modules e views ===============
app.use(express.static(path.join(__dirname, 'node_modules')));
app.set('viwes', path.join(__dirname, 'app/views'));
app.set('views engine', 'ejs');

//subir o banco 
http.listen(8042);
console.log('A magia acontece na porta 8042');

exports = module.exports = app;