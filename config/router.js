const home = require('../app/controller/Home');
const lili = require('../app/controller/Lili');

module.exports = function (app){

    app.get('/', home.home);

    // Rotas apresentação



    // Rotas LILI
    app.get('/lili', lili.index);
    app.post('/lili/ouvir', lili.ouvir);
    app.get('/lili/falar', lili.falar);
    app.post('/lili/atualizar', lili.atualizar);
}