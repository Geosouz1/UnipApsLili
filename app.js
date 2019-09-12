const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dateFormat = require('dateformat');
const io = require('socket.io')(http);
const cv = require('opencv4nodejs');

const wCap = new cv.VideoCapture(0)
var now = new Date();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev')); // registrar cada pedido para o console



// rotas ===================================
require('./config/router.js')(app);

// Rotas nodo_modules e views ===============
app.use(express.static(path.join(__dirname, 'node_modules')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs'); //configura ejs como template

//subir o banco 
http.listen(8042);
console.log('A magia acontece na porta 8042');

//WEBCAM ======================================
// setInterval(() => {
// io.emit('image', 'some data')
// },1000)




exports = module.exports = app;