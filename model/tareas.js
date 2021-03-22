const sequelize = require('sequelize')
const db = require('../config/db')
const shortid = require('shortid')
const proyectos = require("./proyectos")
const tareas = db.define('tareas',{
    id:{
        type:sequelize.INTEGER(11),
        primaryKey:true,
        autoIncrement:true
    },
    tarea:sequelize.STRING(100),
    estado:sequelize.INTEGER

})
tareas.belongsTo(proyectos);
//le digo que para cada tarea pertenece a un proyecto , si uso hasMany le digo que un proyecto tiene vareas tareas



module.exports= tareas;