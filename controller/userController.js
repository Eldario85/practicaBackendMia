require("rootpath")();
const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userBd = require("model/user.js");


//----------endpoints-------------------------//

//Listar todos los usuarios
app.get("/", (req, res) => {
  userBd.getAll((err, resultado) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(resultado);
    }
  });
});

//Listar usuario por mail
app.get("/:mail", (req, res) => {
  let mail = req.params.mail;
  userBd.getByMail(mail, (err, resultado) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(resultado);
    }
  });
});

//crear usuario
app.post("/", function (req, res) {
  let usuario_a_crear = req.body;

  userBd.create(usuario_a_crear, (err, resultado) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(resultado);
    }
  });
});

//modificar usuario
app.put("/:mail", function (req, res) {
  var mail = req.params.mail;
  var usuario_a_modificar = req.body;

  userBd.modificar(mail, usuario_a_modificar, (err, resultado) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(resultado);
    }
  });
});

//eliminar usuario
app.delete("/:mail", function (req, res) {
  var mail = req.params.mail;
  userBd.borrar(mail, (err, resultado) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(resultado);
    }
  });
});



module.exports = app;
