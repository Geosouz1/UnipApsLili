const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const WebSocket = require('ws');


const PORT = process.env.PORT || 8042;

const ws = new WebSocket.Server({ port: 8080 });

var now = new Date();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev')); // registrar cada pedido para o console


// rotas ===================================
require('./config/router.js')(app);

// Rotas nodo_modules e views ===============
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'assets/image')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('views engine', 'ejs');

//subir a aplicação


http.listen(PORT);
console.log('A magia acontece na porta 8042');

exports = module.exports = app;