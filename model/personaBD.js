var persona_bd = {};

const mysql = require("mysql");
const configuraciones = require("config.json");

var connection = mysql.createConnection(configuraciones.database);

// conexion a mysql
connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("base de datos conectada");
  }
});

//--------consultas en base de datos-------///

//Buscar todos las personas en base de datos
persona_bd.getAll = function (funCallBack) {
  $query = "SELECT * FROM persona";
  connection.query($query, (err, rows) => {
    if (err) {
      funCallBack({
        mensaje: "surgio un error en la consulta",
        detalle: err,
      });
    }
    funCallBack(undefined, {
      message: `Esta es la lista de personas `,
      detail: rows,
    });
  });
};

//Buscar persona por apellido en base de datos
persona_bd.getByApellido = function (apellido, funCallBack) {
  consulta = "SELECT * FROM persona WHERE apellido=?";
  connection.query(consulta, apellido, (err, rows) => {
    if (err) {
      funCallBack({
        mensaje: "surgio un error en la consulta",
        detalle: err,
      });
    } else {
      if (rows == 0) {
        funCallBack(undefined, {
          message: `No se encontro la persona con apellido ${apellido}`,
        });
      } else {
        funCallBack(undefined, {
          message: `Esta es la lista de personas con apellido ${apellido} `,
          detail: rows,
        });
      }
    }
  });
};

//Crear persona en base de datos
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
        funCallBack(undefined,{
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

//Modificar persona en base de datos
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
      if (rows.affectedRows == 0) {
        funCallBack(undefined,{
          message: `No se encontro ninguna persona con ese dni`
        });
      } else if (rows.changedRows == 0) {
        funCallBack(undefined,{
          message: `No se modifico ningun dato`,
        });
      } else {
        funCallBack(undefined, {
          message: `Se modifico la persona ${persona.nombre} ${persona.apellido} `,
          detalle: rows,
        });
      }
    }
  });
};

//Borrar persona de base de datos
persona_bd.borrar = function (dni, funCallBack) {
  consulta = "DELETE FROM persona WHERE dni=?";
  connection.query(consulta, dni, (err, rows) => {
    if (err) {
      funCallBack({
        mensaje: "error del servidor",
        detalle: err,
      });
      return;
    } else {
      if (rows.affectedRows == 0) {
        funCallBack(undefined,{
          message: `No se encontro la persona ${dni}`,
        });
      } else {
        funCallBack(undefined, {
          message: `Se ELIMINO la persona  ${dni} `,
          detail: rows,
        });
      }
    }
  });
};

module.exports = persona_bd;
