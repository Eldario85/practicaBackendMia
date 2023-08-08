var persona_bd = {};

const mysql = require("mysql");
const configuraciones = require("config.json");
// Agregue las credenciales para acceder a su base de datos
var connection = mysql.createConnection(configuraciones.database);

// conectarse a mysql
connection.connect((err) => {
  // en caso de error
  if (err) {
    console.log(err);
  } else {
    console.log("base de datos conectada");
  }
});

persona_bd.getAll = function (funCallBack) {
  $query = "SELECT * FROM persona";
  connection.query($query, (err, rows) => {
    if (err) {
      funCallBack(err);
      return;
    }
    funCallBack(rows);
  });
};

persona_bd.create = function (persona, funCallBack) {
  $query = "INSERT INTO persona (dni, nombre, apellido) VALUES(?,?,?)";
  parametros = [persona.dni, persona.nombre, persona.apellido];

  connection.query($query, parametros, (err, detail_bd) => {
    if (err) {
      if (err.code == "ER_DUP_ENTRY") {
        funCallBack({
          mensaje: "la persona ya fue registrada",
          detalle: err,
        });
      } else {
        funCallBack({
          mensaje: "surgio un error en la consulta",
          detalle: err,
        });
      }
      return;
    } else {
      funCallBack(undefined, {
        message: `Se creo la persona ${persona.nombre} ${persona.apellido} dni n° ${persona.dni} `,
        detail: detail_bd,
      });
    }
  });
};

persona_bd.update = function (a_quien, persona, funCallBack) {
  parametros = [persona.dni, persona.nombre, persona.apellido, a_quien];

  consulta = "UPDATE persona SET dni= ?, nombre= ?, apellido= ? WHERE dni=?";
  connection.query(consulta, parametros, (err, rows) => {
    if (err) {
      funCallBack({
        mensaje: "error del servidor",
        detalle: err,
      });
    } else {
      funCallBack(undefined, {
        message: `Se modifico la persona ${persona.nombre} ${persona.apellido} `,
        detalle: rows,
      });
    }
  });
};



module.exports = persona_bd;
