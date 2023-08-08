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

user_bd.modificar = function (mail, usuario, funCallBack) {
  parametros = [mail, usuario.mail, usuario.nickname, usuario.password];

  consulta = "UPDATE usuario SET mail= ?, nickname= ?, password= ? WHERE mail=?";
  connection.query(consulta, parametros, (err, rows) => {
    if (err) {
      funCallBack({
        mensaje: "error del servidor",
        detalle: err,
      });
    } else{
      funCallBack(undefined, {
        message: `Se modifico la persona ${mail} ${usuario.nickname} `,
        detalle: rows,
      });
    };
  });
}


user_bd.borrar = function(mail, funCallBack){
    
  consulta = 'DELETE FROM usuario WHERE mail=?';
    connection.query(consulta, mail, (err, rows)=>{
        if(err){
            funCallBack({
                mensaje: "error del servidor",
                detalle: err
            });
            return;
        } else{
            if(rows.affectedRows==0){
                funCallBack({
                    message: `No se encontro la persona ${mail}`
                });
            }else{
                funCallBack({
                    message:  `Se ELIMINO la persona  ${mail} `,
                    detail: rows
                })
            }
        }
    })

};



module.exports = user_bd;
