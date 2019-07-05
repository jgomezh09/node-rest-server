const express = require('express');

const Producto = require('../models/producto');

const { verificaToken, verificaRolAdmin } = require('../middlewares/autenticacion');



const app = express();



app.get('/producto', (req, res) => {
    Producto.find({})
        .sort('precio')
        .populate('categoria')
        .populate('usuario', 'nombre email')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                producto: productoDB
            })
        })
})


app.get('/producto/:id', (req, res) => {
    let id = req.params.id;

    Producto.findById(id)

    .populate('categoria')
        .populate('usuario', 'nombre email')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "El id no existe"
                    }
                })
            }

            res.json({
                ok: true,
                producto: productoDB
            })
        })
})


app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i'); // la i es para que sea insencible a mayusculas y minusculas
    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre ')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                productos
            })
        })
})


app.post('/producto', [verificaToken, verificaRolAdmin], (req, res) => {
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria, ///////////////////????????????????????????????
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            producto: productoDB
        })

    })
})

app.put('/producto/:id', [verificaToken, verificaRolAdmin], (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Producto.findOneAndUpdate(id, body, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El id no existe"
                }
            })
        }

        res.json({
            ok: true,
            producto: productoDB
        })

    })
})



app.delete('/producto/:id', [verificaToken, verificaRolAdmin], (req, res) => {
    let id = req.params.id;
    let borrarDisp = {
        disponible: false
    }
    Producto.findOneAndUpdate(id, borrarDisp, (err, productoBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!productoBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El id no existe"
                }
            })
        }

        res.json({
            ok: true,
            producto: productoBorrado
        })

    })
})


module.exports = app;