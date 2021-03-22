//import express from 'express'
const express = require('express');
const rutas = require('./routes');
const path = require("path");
const bodyParser = require("body-parser")
const helper = require("./helper")
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const passport = require("./config/passport")
//crea app de express
const app = express();

//crear conexion a db
const db = require('./config/db')

//importo el modelo
require('./model/proyectos')
require('./model/tareas')
require("./model/usuarios")
//authenticate() solo se conecta y sync ejecuta el modelo
db.sync()
.then( () => console.log("Conectado Al Server"))
.catch(error => console.log(error));
app.use(bodyParser.urlencoded({extended:true}))
//LE DIGO EN donde estan las vistas
app.use(express.static(__dirname + '/public'));

//habilito pug
app.set('view engine','pug');

//añadir vistas
app.set('views',path.join(__dirname,"./views"))

//pasar vardump a la app

//para usar flash messages
app.use(flash())
app.use(cookieParser())
//las sesiones nos permite movernos entre paginas sin tener que volver a autenticarnos
app.use(session({
    secret:'supersecreto',
    resave:false,
    saveUninitialized:false
}))
//lo inisializo
app.use(passport.initialize());
//le digo que los metodos para que el usuario se mueva entre las diferentes paginas
app.use(passport.session())

app.use((req,res,next) =>{
    //hago que la fucnion vardump de helper este disponible en todos los archivos
    res.locals.vardump = helper.vardump
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    next();
})

//habilitar body parser para leer datos de form osea me ayuda a leer los datos del post enviado con req.body
//que se ve al entrar al index-rutas para home
app.use('/',rutas())

app.listen('3000');

require("./handlers/email")