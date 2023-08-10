var user_bd = {};

const mysql = require("mysql");
const configuraciones = require("config.json");

var connection = mysql.createConnection(configuraciones.database);

// coneccion a mysql
connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("base de datos conectada");
  }
});

//--------consultas en base de datos-------///

//Buscar todos los usuarios en BD
user_bd.getAll = function (funCallBack) {
  consulta = "SELECT * FROM usuario";
  connection.query(consulta, (err, rows) => {
    if (err) {
      funCallBack({
        mensaje: "surgio un error en la consulta",
        detalle: err,
      });
    }
    funCallBack(undefined, {
      message: `Esta es la lista de usuarios `,
      detail: rows,
    });
  });
};

//buscar usuarios por mail en BD
user_bd.getByMail = function (mail, funCallBack) {
  consulta = "SELECT * FROM usuario WHERE mail=?";
  connection.query(consulta, mail, (err, rows) => {
    if (err) {
      funCallBack({
        mensaje: "surgio un error en la consulta",
        detalle: err,
      });
    } else {
      if (rows == 0) {
        funCallBack({
          message: `No se encontro el usuario con mail ${mail}`,
        });
      } else {
        funCallBack(undefined, {
          message: `Este es el usuario con el mail ${mail}`,
          detail: rows,
        });
      }
    }
  });
};

//crear usuario en BD
user_bd.create = function (usuario, funCallBack) {
  consulta = "INSERT INTO usuario (mail, nickname, password, persona) VALUES(?,?,?,?)";
  parametros = [usuario.mail, usuario.nickname, usuario.password, usuario.persona];

  connection.query(consulta, parametros, (err, detail_bd) => {
    if (err) {
      if (err.code == "ER_DUP_ENTRY") {
        funCallBack({
          mensaje: "el usuario ya fue registrado",
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
        message: `Se creo el usuario ${usuario.nickname} `,
        detail: detail_bd,
      });
    }
  });
};

//modificar usuarios en BD
user_bd.modificar = function (mail, usuario, funCallBack) {
  parametros = [usuario.mail, usuario.nickname, usuario.password, mail];

  consulta = "UPDATE usuario SET mail= ?, nickname= ?, password= ? WHERE mail=?";
  connection.query(consulta, parametros, (err, rows) => {
    if (err) {
      funCallBack({
        mensaje: "error del servidor",
        detalle: err,
      });
    } else {
      if (rows.affectedRows == 0) {
        funCallBack({
          message: `No se encontro ningun usuario con ese mail`
        });
      } else if(rows.changedRows==0){
        funCallBack({
          message: 'No se modifico el usuario'
        })
      } else{
      funCallBack(undefined, {
        message: `Se modifico la persona ${mail} ${usuario.nickname} `,
        detalle: rows,
      });
    }};
  });
};

//borrar usuarios de BD
user_bd.borrar = function (mail, funCallBack) {
  consulta = "DELETE FROM usuario WHERE mail=?";
  connection.query(consulta, mail, (err, rows) => {
    if (err) {
      funCallBack({
        mensaje: "error del servidor",
        detalle: err,
      });
      return;
    } else {
      if (rows.affectedRows == 0) {
        funCallBack({
          message: `No se encontro la persona ${mail}`,
        });
      } else {
        funCallBack({
          message: `Se ELIMINO la persona  ${mail} `,
          detail: rows,
        });
      }
    }
  });
};

module.exports = user_bd;
