
const express = require('express');
const fs = require('fs')
const app = express()
const http = require('http').createServer(app);
const https = require('https');
const server = https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const io = require('socket.io').listen(server);


var now = new Date();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev')); // registrar cada pedido para o console

//String de conexão
const url = 'mongodb://localhost:27017/aps';
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
  console.log('Erro na conexão com o banco de dados!');
})

mongoose.connection.on('disconnected', () => {
  console.log('Aplicação desconectada do banco de dados')
})

mongoose.connection.on('connected', () => {
  console.log('Aplicação conectada com sucesso');
})


// rotas ===================================
require('./config/router.js')(app);

// Rotas nodo_modules e views ===============
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'assets/image')));
app.use(express.static(path.join(__dirname, 'app/views')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('views engine', 'ejs');

// Socket ====================================
io.on('connection', (socket) => {
  console.log('usuario conectado');

  socket.on('disconnect', (socket) =>{
    console.log('usuario desconectou')
  })

  socket.on('stream', function (image) {
    socket.broadcast.emit('stream', image);
  });
})
// io.on('connection',(socket) => {
// console.log('um usuario se conectou');
io.on('connection',function(socket){
  socket.on('stream',function(image){
    socket.broadcast.emit('stream',image);
  });

  socket.on('alterPage', (page) =>{
    console.log(page);
    socket.broadcast.emit('alterPage',page);
  })
});

//subir a aplicação
server.listen(2019);
console.log('A magia acontece na porta 2019');
http.listen(8042);
console.log('A magia acontece na porta 8042');

exports = module.exports = app;