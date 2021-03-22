const usuarios = require("../model/usuarios")

exports.formCreateCuenta = (req,res) =>{
    res.render("crearCuenta",{
        namePage:"Crear cuenta en Uptask"
    })
}


exports.crearCuenta = async (req,res) =>{
   
   //leer los datos

   const {email,password} = req.body;

   try {
       await  usuarios.create({
        email,
        password
    });
    res.redirect("/iniciar-sesion")
   } catch (error) {
       req.flash('error',error.errors.map(error => error.message))
       res.render('crearCuenta',{
           namePage:"Crear Cuenta",
           mensajes:req.flash(),
            email,
            password
       })
   }


   //crear usuario
  
}



exports.iniciarsesionform = (req,res) =>{
    const {error} = res.locals.mensajes;
    res.render("iniciarsesion",{
        namePage:"Iniciar Sesion en Uptask",
        error:error
    })
}



exports.formRestablecerPassword = (req,res) =>{
    res.render('restablecer',{
        namePage:"Restablecer Contraseña"
    })
}
