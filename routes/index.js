const express = require("express");
const router = express.Router();
const {body } = require('express-validator/check')
const controller = require("../controllers/proyectosControllers.js");
const tareasController = require("../controllers/tareascontroller.js");
const usuariosController = require("../controllers/usuarioscontroller")
const authcontroller = require("../controllers/authcontroller");
const usuarios = require("../model/usuarios.js");
module.exports = function(){

  
    router.get('/nuevoproyecto'
    ,authcontroller.usuarioAutenticado,controller.formproyect)
    router.post('/nuevoproyecto',
    body('nombre').not().isEmpty().trim().escape(),
    controller.nuevoProyecto)

    router.get('/',
    authcontroller.usuarioAutenticado,
    controller.proyectoHome)
    //listar proyecto

    router.get("/proyectos/:url"
    ,authcontroller.usuarioAutenticado
    ,controller.proyectoUrl)

    //actualizar proyecto , se envian los datos a actualizar por get
    router.get("/proyecto/editar/:id",
    authcontroller.usuarioAutenticado
    ,controller.formeditarproyect)


    router.post('/nuevoproyecto/:id',
    body('nombre').not().isEmpty().trim().escape()
    ,authcontroller.usuarioAutenticado,
    controller.updateProyect)


    //ELIMINAR PROYECTO
    router.delete("/proyectos/:url"
    ,authcontroller.usuarioAutenticado,controller.eliminarProyecto)
    //para editar un proyecto con el post a la bdd



    //tareas route
    router.post("/proyectos/:url"
    ,authcontroller.usuarioAutenticado,tareasController.agregartarea)

    //actualizar tarea - patch es como update pero solo cambia la columna de estado en este caso
    router.patch('/tareas/:id'
    ,authcontroller.usuarioAutenticado,tareasController.cambiarEstadoTarea)


      //eliminar tarea - envio con axios.delete en tareas.js los params
    router.delete('/tareas/:id'
    ,authcontroller.usuarioAutenticado,tareasController.eliminarTarea)


    //crear nueva cuenta
    router.get('/crear-cuenta'
    ,usuariosController.formCreateCuenta)

    router.post('/crear-cuenta'
    ,usuariosController.crearCuenta)


  //cuando se acceda a la ruta de iniciar sesion
    router.get('/iniciar-sesion'
    ,usuariosController.iniciarsesionform)



    //cuando se envie el formulario post de iniciar sesion
    router.post("/iniciar-sesion"
    ,authcontroller.autenticarUsuario)



  //cerrar session
  router.get("/cerrar-sesion",authcontroller.cerrarsesion)
  //restablecer contraseña
  router.get("/restablecer",usuariosController.formRestablecerPassword)

  router.post("/restablecer",authcontroller.enviarToken)

  router.get("/restablecer/:token",authcontroller.validarToken)
  router.post("/restablecer/:token",authcontroller.actualizarPassword)




    return router;  
}

