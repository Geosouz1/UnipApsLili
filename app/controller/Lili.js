var estado_lili = "parado";



exports.index = ((req, res) => {
    res.send('testando o teste');
});

exports.ouvir = ((req, res) => {
    let voz = req.body.updateMensagem;

    res.send({ 'servidorRecebeu': voz });
    estado_lili = voz;

})
exports.falar = ((req, res) => {
    res.send(estado_lili);
});

exports.atualizar = ((req, res) => {
    estado_lili = req.body.updateMensagem;
    return res.send({
        'msg': 'Estado Atualizado',
        'valor': estado_lili
    });
});