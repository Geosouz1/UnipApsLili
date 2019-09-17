const home = require('../app/controller/Home');
const lili = require('../app/controller/Lili');

module.exports = function (app) {

    app.get('/', home.home);
    app.get('/controle', home.controle);
    app.get('/streamer', home.streamer);
    app.get('/cliente', home.cliente);
    // Rotas apresentação



    // Rotas LILI
    app.get('/lili', lili.index);
    app.post('/lili/ouvir', lili.ouvir);
    app.get('/lili/falar', lili.falar);
    app.post('/lili/atualizar', lili.atualizar);
}