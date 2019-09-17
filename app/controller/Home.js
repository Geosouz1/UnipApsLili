
exports.home = ((req, res) => {
       res.render('index.ejs', {
       });
})

exports.controle = ((req, res) => {
       res.render('controle.ejs', {

       });
});

exports.streamer = ((req, res) => {
       res.render('streamer.ejs', {

       });

       const wsServer = new WebSocket.Server({ port: WS_PORT }, () => console.log(`WS server is listening at ws://localhost:${WS_PORT}`));
       let connectedClients = [];

       ws.on('open', function open() {
              console.log('connected');
              ws.send(Date.now());
            });

       ws.on('connection', function connection(ws) {
              ws.on('message', function incoming(data) {
                     ws.clients.forEach(function each(client) {
                            if (client !== ws && client.readyState === WebSocket.OPEN) {
                                   cliente.send(data);
                            }
                     });
              });
       });
});

exports.cliente = ((req, res) => {
       res.render('cliente.ejs')
});
