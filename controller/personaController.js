require("rootpath")();
const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const personaBd = require("model/personaBD.js");

//----------endpoints-------------------------//

//Listar todos las personas
app.get("/", (req, res) => {
  personaBd.getAll((err, resultado) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(resultado);
    }
  });
});

//Listar personas por apellido
app.get("/:apellido", (req, res) => {
  let apellido = req.params.apellido;
  personaBd.getByApellido(apellido, (err, resultado) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(resultado);
    }
  });
});

//Crear personas
app.post("/", function (req, res) {
  let persona_a_crear = req.body;

  personaBd.create(persona_a_crear, (err, resultado) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(resultado);
    }
  });
});

//Modificar personas
app.put("/:dni", function (req, res) {
  var dni = req.params.dni;
  var persona_a_modificar = req.body;

  personaBd.update(dni, persona_a_modificar, (err, resultado) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(resultado);
    }
  });
});

//Eliminar personas
app.delete("/:dni", function (req, res) {
  dni = req.params.dni;
  personaBd.borrar(dni, (err, resultado) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(resultado);
    }
  });
});



module.exports = app;
