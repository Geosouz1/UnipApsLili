

exports.controle = (req, res) => {
    res.render("controle.ejs", {
  
    });
  };

  exports.datas = (req, res) => {
      res.render("controles/datas.ejs", {
          
      });
  }
  exports.impressoras = (req, res) => {
      res.render("controles/impressoras.ejs", {
          
      });
  }
  exports.telas = (req, res) => {
      res.render("controles/telas.ejs", {
          
      });
  }
  exports.cameras = (req, res) => {
      res.render("cameras/cameras.ejs", {
          
      });
  }