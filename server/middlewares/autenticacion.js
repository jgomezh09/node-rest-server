const jwt = require('jsonwebtoken');


//=======================================
//Verificar Token   video 123
//========================================

let verificaToken = (req, res, next) => {
    let token = req.get('token'); //leer header

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Token invalido"
                }
            })
        }

        req.usuario = decoded.usuario;
        next();
    })

}

//=======================================
//Verificar TokenImagen   video 123
//========================================

let verificaTokenImg = (req, res, next) => {
    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Token invalido"
                }
            })
        }

        req.usuario = decoded.usuario;
        next();
    })

}


//=======================================
//Verificar Rol Admin   video 123
//========================================

let verificaRolAdmin = (req, res, next) => {

    let rol = req.usuario.role;

    if (rol === 'ADMIN_ROLE') {
        next()
        return;
    }

    return res.status(401).json({
        ok: false,
        err: {
            message: "El usuario no es administrador"
        }
    })

}



module.exports = {
    verificaToken,
    verificaRolAdmin,
    verificaTokenImg
}