const Sequelize = require('sequelize')
const passport = require('passport');
const bcrypt = require("bcrypt-nodejs");
const enviaremail = require("../handlers/email")
const usuarios = require("../model/usuarios")
//para validar fechas y demas con squelize
const Op = Sequelize.Op;
const crypto = require("crypto");
exports.autenticarUsuario  = passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/iniciar-sesion',
    failureFlash:true,
    badRequestMessage: "LLena Campos Obligatorios"
})


//funcion para ver si el usuario esta logueado o no


exports.usuarioAutenticado = (req,res,next) =>{

    //si esta autenticado , siga
    if(req.isAuthenticated()){
        return next();
    }

    //si no esta autenticado lo mando a iniciar sesion
    return res.redirect("/iniciar-sesion")
}

exports.cerrarsesion = (req,res)=>{
    console.log(req)
    req.session.destroy(()=>{
        //cierro la sesion de express session
        res.redirect("/iniciar-sesion");
    })
}

//genera token si usuario es valido
exports.enviarToken = async (req,res)=>{
    //verificar si usuario existe
    const usuario = await usuarios.findOne({
        where:{email:req.body.email}
    })
    //si no existe usuarii
    if(!usuario){
        req.flash('error',"No existe esa cuenta")
        res.redirect("/restablecer")
    }else{
    //usuario existe
    //genero token y expiracion
    usuario.token= crypto.randomBytes(20).toString('hex')
    usuario.expiracion = Date.now() + 3600000;

    //guardo en la bdd
    await usuario.save()
    //url de reset
    const resetUrl = `http://${req.headers.host}/restablecer/${usuario.token}`
    //envia el correo con el token

    await enviaremail.enviar({
        usuario,
        subject:"Password Reset",
        resetUrl,
        archivo:'restablecerpassword'
    })
    req.flash("correcto","Se ha enviado un mail con las instrucciones necesarias ")
    res.redirect("/iniciar-sesion")
    }

   
}

exports.validarToken = async (req,res) => {
    const usuario = await usuarios.findOne({
        where:{
            token:req.params.token
        }
    })
    if(!usuario){
        req.flash("error","No Valido");
        res.redirect("/restablecer")
    }
    res.render("resetpassword",{
        namePage:"Restablecer Contraseña"
    })
}


//cambia el password por uno nuevo

exports.actualizarPassword = async (req,res) =>{
    //verifica token valido y fecha de expiracion
    const usuario = await usuarios.findOne({
        where:{
            token:req.params.token,
            expiracion:{
                [Op.gte]:Date.now()
            }
        }
    })

    //verificamos si el usuario existe
    if(!usuario){
        req.flash("error","Token no valido");
        res.redirect("/restablecer")
    }
        usuario.password = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10));
        usuario.token=null;
        usuario.expiracion=null;
        await usuario.save()
        req.flash('correcto','Tu password se ha cambiado correctamente')
        res.redirect("/iniciar-sesion")

    
}