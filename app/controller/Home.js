exports.home = (req, res) => {
  res.render("index.ejs", {});
};

exports.streamer = (req, res) => {
  res.render("home/streamer.ejs", {});
};

exports.impressoras = (req, res) => {
  res.render("home/impressoras.ejs", {});
};

exports.datas = (req, res) => {
  res.render("home/datas.ejs", {});
};
