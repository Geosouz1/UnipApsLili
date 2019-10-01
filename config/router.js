const home = require('../app/controller/Home');
const lili = require('../app/controller/Lili');
const controle = require('../app/controller/Controle');


module.exports = function (app) {

    
    // Rotas apresentação
    app.get('/', home.home);
    app.get('/streamer', home.streamer);
    app.get('/home/impressoras', home.impressoras);
    app.get('/home/datas', home.datas);
    


    // Rotas controle
    app.get('/controle', controle.controle);
    app.get('/datas', controle.datas);
    app.get('/cameras', controle.cameras);
    app.get('/impressoras', controle.impressoras);
    app.get('/telas', controle.telas);



    // Rotas LILI
    app.get('/lili', lili.index);
    app.post('/lili/ouvir', lili.ouvir);
    
    app.get('/lili/falar', lili.falar);
    app.post('/lili/atualizar', lili.atualizar);
}