
//-----------------------------------------------------------------------------------------
const express = require('express');
const Usuario = require('../models/usuario');
const app = express();

app.get('/', (req, res) =>{
    res.json('Hola Mundo')
});

app.get('/usuario', (req, res) =>{
    res.json('get Usuario LOCAL');
});

app.post('/usuario', (req, res) =>{
    let body = req.body;

    let usuario = new Usuario({//crea nueva instancia del esquema usuario
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        role: body.role,
        google: body.google
    });

    //Grabar en la DB
    usuario.save( (err, usuarioDB) =>{
        if(err){
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok:true,
            usuario: usuarioDB
        })
    });
});

app.put('/usuario/:id', (req, res) =>{
    let id = req.params.id;
    let bofy = req.body;

    //traer el usuario que solicitamos de acuerdo al id
    Usuario.findByIdAndUpdate(id, body, {new: true}, (err, usuarioDB) =>{
        if(err){
            req.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.delete('/usuario', (reqp, res) =>{
    res.json('delete usuario');
})
module.exports = app;   