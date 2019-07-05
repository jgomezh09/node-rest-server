const express = require('express');

const Categoria = require('../models/categoria');

const _ = require('underscore');

const { verificaToken, verificaRolAdmin } = require('../middlewares/autenticacion');

const app = express();


app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categoria) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                categoria
            })
        })
});

app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "La categoria no existe"
                }
            })
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
})



app.post('/categoria', [verificaToken, verificaRolAdmin], (req, res) => {
    let body = req.body;
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    })

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    });

});



app.put('/categoria/:id', [verificaToken, verificaRolAdmin], (req, res) => {
    let id = req.param.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findOneAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            // if (err.codeName === "DuplicateKey") {
            //     return res.status(500).json({
            //         ok: false,
            //         err: {
            //             message: "La descripcion ya existe"
            //         }
            //     })

            // }

            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    });



    app.delete('/categoria/:id', [verificaToken, verificaRolAdmin], (req, res) => {
        let id = req.params.id;
        Categoria.findOneAndRemove(id, (err, categoriaBorrada) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            if (!categoriaBorrada) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "El id no existe"
                    }
                });
            }
            res.json({
                ok: true,
                categoria: categoriaBorrada
            })

        })
    })

});

module.exports = app;