

exports.home = (req, res) => {
  res.render("index.ejs", {
  });
};

exports.streamer = (req, res) => {
  res.render("home/streamer.ejs", {

  });
};

exports.cliente = (req, res) => {
  res.render("cliente.ejs", {

  });
};
