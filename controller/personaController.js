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
    dni= req.params.dni
    personaBd.borrar(dni, (err, resultado)=>{
        if(err){
            res.status(500).send(err);
        } else{
            res.send(resultado)
        }
    })
   
});



module.exports = app;