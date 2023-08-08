var user_bd = {};

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

user_bd.getAll = function (funCallBack) {
  $query = "SELECT * FROM usuario";
  connection.query($query, (err, rows) => {
    if (err) {
      funCallBack(err);
      return;
    }
    funCallBack(rows);
  });
};

user_bd.create = function (usuario, funCallBack) {
  $query = "INSERT INTO usuario (mail, nickname, password) VALUES(?,?,?)";
  parametros = [usuario.mail, usuario.nickname, usuario.password];

  connection.query($query, parametros, (err, detail_bd) => {
    if (err) {
      if (err.code == "ER_DUP_ENTRY") {
        funCallBack({
          mensaje: "el usuario ya fue registrada",
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
        message: `Se creo el usuario ${usuario.mail} ${usuario.nickname} `,
        detail: detail_bd,
      });
    }
  });
};

user_bd.update = function (mail, usuario, funCallBack) {
  parametros = [usuario.mail, usuario.nickname, usuario.password, mail];

  consulta = "UPDATE usuario SET mail= ?, nickname= ?, password= ? WHERE mail=?";
  connection.query(consulta, parametros, (err, rows) => {
    if (err) {
      funCallBack({
        mensaje: "error del servidor",
        detalle: err,
      });
    } else {
      funCallBack(undefined, {
        message: `Se modifico el usuario ${usuario.nickname}`,
        detalle: rows,
      });
    }
  });
};



module.exports = user_bd;
