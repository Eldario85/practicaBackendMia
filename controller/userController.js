require('rootpath')();
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const userBd = require("model/user.js");




app.get("/", (req, res)=> {
    userBd.getAll((err, resultado)=>{
        if(err){
            res.status(500).send(err);
        } else{
            res.json(resultado)
        }
    });
});



app.post("/", function (req, res) {
 let usuario_a_crear = req.body;

 userBd.create(usuario_a_crear, (err, resultado)=>{
    if(err){
        res.status(500).send(err);
    } else{
        res.json(resultado)
    }
 }); 
});



app.put("/:mail", function (req, res) {
    var mail = req.params.mail;
    var usuario_a_modificar = req.body;
   
    userBd.update(mail, usuario_a_modificar, (err, resultado)=>{
        if(err){
            res.status(500).send(err);
        } else{
            res.send(resultado)
        }
    })
});


// app.delete("/:mail", function (req, res) {

//     $query = 'DELETE FROM usuario WHERE mail=?';
//     connection.query($query, req.params.mail, (err, rows)=>{
//         if(err){
//             res.status(500).send({
//                 mensaje: "error del servidor",
//                 detalle: err
//             });
//             return;
//         } else{
//             if(rows.affectedRows==0){
//                 res.status(404).send({
//                     message: `No se encontro la persona ${req.params.dni}`
//                 });
//             }else{
//                 res.send({
//                     message:  `Se ELIMINO la persona  ${req.params.dni} `,
//                     detail: rows
//                 })
//             }
//         }
//     })

// });

module.exports = app;