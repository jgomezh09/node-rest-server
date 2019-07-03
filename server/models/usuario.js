const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El E-mail es necesario']
    },
    password: {
        type: String,
        required: [true, 'El Password es Obligatorio']
    },
    img: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        default: "USER_ROLE",
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    goole: {
        type: Boolean,
        required: false
    },
    creado: {
        type: Date,
        default: Date.now
    }

})

usuarioSchema.methods.toJSON = function() { //Ojo no utilizar funcion flecha para que funcione el this    Metodo toJSON siempre se llama cuando se va a imprimir
    let user = this;
    let userObject = user.toObject(); //Obtenemos toda la informacion del objeto    usuarioSchema
    delete userObject.password; //Eliminamos el password para que no lo imprima por pantalla
    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema); // quiero que se llame Usuario y va a tener toda la configuración de usuarioSchema