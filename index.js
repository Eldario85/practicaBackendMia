require('rootpath')();
const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(morgan("tiny"));
morgan(":method :url :status :res[content-length] - :response-time ms");

const configuraciones = require("config.json");


const controladorPersona = require("controller/personaController");
const controladorusuario = require("controller/userController");

app.use('/api/persona', controladorPersona);
app.use('/api/user', controladorusuario);





app.listen(configuraciones.server.port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("servidor escuchando en el puerto "+ configuraciones.server.port);
  }
});
