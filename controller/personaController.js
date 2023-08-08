require('rootpath')();
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const personaBd = require("model/personaBD.js")



app.get("/", (req, res)=> {
    personaBd.getAll((err, resultado)=>{
        if(err){
            res.status(500).send(err);
        } else{
            res.json(resultado)
        }
    });
});



app.post("/", function (req, res) {
 let persona_a_crear = req.body;

 personaBd.create(persona_a_crear, (err, resultado)=>{
    if(err){
        res.status(500).send(err);
    } else{
        res.json(resultado)
    }
 }); 
});



app.put("/:dni", function (req, res) {
    var dni = req.params.dni;
    var persona_a_modificar = req.body;
   
    personaBd.update(dni, persona_a_modificar, (err, resultado)=>{
        if(err){
            res.status(500).send(err);
        } else{
            res.send(resultado)
        }
    })
});


app.delete("/:dni", function (req, res) {

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

module.exports = app;