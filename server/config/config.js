//  =========================================
//  Puerto
//  ========================================
process.env.PORT = process.env.PORT || 3000;


//  =========================================
//  Entorno
//  =========================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//  =========================================
//  Vencimiento Token
//  =========================================
// 60 segundos *
// 60 minutos *
// 24 horas  *
// 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//  =========================================
//  (Semilla)SEED de autenticación
//  =========================================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//  =========================================
//  Base de datos
//  =========================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/tramites';
} else {
    urlDB = 'mongodb+srv://jgomezh:DoJVGWSIV2uj5YcJ@cluster0-dhurk.mongodb.net/cafe';
}

process.env.URLDB = urlDB;