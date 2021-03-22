const Sequelize = require("sequelize")
const db = require("../config/db")
const proyectos = require("../model/proyectos")
const bcrypt = require("bcrypt-nodejs");
const usuarios = db.define('usuarios',{

    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    email:{
        type:Sequelize.STRING(60),
        allowNull:false,
        validate: {
            isEmail:{
                msg:'Agrega Un Correo Valido'
            },
            notEmpty:{
                msg:'El email no puede ir vacio'
            }
            
        },
        unique: {
            args: true,
            msg:'El email no puede ir vacio'
        }
    },
    password:{
        type:Sequelize.STRING(60),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'El password no puede ir vacio'
            }
        }
    },
    token:Sequelize.STRING,
    expiracion:Sequelize.DATE
    
},{
    hooks:{
        beforeCreate(usuario){
            //bcrypt me ayuda a encriptar con hashsync que pide los datos y con getsaltlync 
            usuario.password = bcrypt.hashSync(usuario.password,bcrypt.genSaltSync(10))
        }
    }
});

//metodo personalizado
usuarios.prototype.verificarPassword = function(password){
    //retorna true o false en caso de que la contraseña hasheada sea igual a la puesta
    return bcrypt.compareSync(password,this.password)
}

usuarios.hasMany(proyectos)
//un usuario puede tener mucho proyectos

module.exports =   usuarios;