require('rootpath')();
const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(morgan("tiny"));
morgan(":method :url :status :res[content-length] - :response-time ms");

const configuraciones = require("config.json")

const personaBd = require("personaBD.js")



app.get("/api/persona", (req, res)=> {
    personaBd.getAll((err, resultado)=>{
        if(err){
            res.status(500).send(err);
        } else{
            res.json(resultado)
        }
    });
});



app.post("/api/persona", function (req, res) {
 let persona_a_crear = req.body;

 personaBd.create(persona_a_crear, (err, resultado)=>{
    if(err){
        res.status(500).send(err);
    } else{
        res.json(resultado)
    }
 }); 
});



app.put("/api/persona/:dni", function (req, res) {
    parametros= [req.body.dni, req.body.nombre, req.body.apellido, req.params.dni];

    $query = 'UPDATE persona SET dni=?, nombre=?, apellido=? WHERE dni=?';
    connection.query($query, parametros, (err, rows)=>{
        if(err){
            res.status(500).send({
                mensaje: "error del servidor",
                detalle: err
            });
            return;
        } else{
            if(rows.affectedRows==0){
                res.status(404).send({
                    message: `No se encontro la persona ${req.params.dni}`
                });
            }else{
                res.send({
                    message:  `Se modifico la persona ${req.body.nombre} ${req.body.apellido} ${req.body.dni} `,
                    detail: rows
                })
            }
        }
    })

});


app.delete("/api/persona/:dni", function (req, res) {

    $query = 'DELETE FROM persona WHERE dni=?';
    connection.query($query, req.params.dni, (err, rows)=>{
        if(err){
            res.status(500).send({
                mensaje: "error del servidor",
                detalle: err
            });
            return;
        } else{
            if(rows.affectedRows==0){
                res.status(404).send({
                    message: `No se encontro la persona ${req.params.dni}`
                });
            }else{
                res.send({
                    message:  `Se ELIMINO la persona  ${req.params.dni} `,
                    detail: rows
                })
            }
        }
    })

});

app.listen(configuraciones.server.port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("servidor escuchando en el puerto "+ configuraciones.server.port);
  }
});
