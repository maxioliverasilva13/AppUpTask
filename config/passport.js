const passport = require('passport')
const localStrategy = require('passport-local').Strategy;

const usuarios = require('../model/usuarios');

//local stategfy - login con credenciales propias (usuarios y password)

passport.use(
    new localStrategy(
        //por default password espera un usuario y password
        {
            usernameField:'email',
            passwordField:'password'
        },
        async (email,password,done) =>{
            //me fijo si el usuario aparece en la bdd
            try {
                
                const usuario = await usuarios.findOne({
                    where:{email:email}
                })
                //el usuario existe pero el password no existe
                if(!usuario.verificarPassword(password)){

                    return done(null,false,{
                        message:"La contraseña es incorrecta"
                    })
                }

                return done(null,usuario);
            } catch (error) {
                //usuario no existe
                console.log(error);

                return done(null,false,{
                    message:"Esa cuenta no existe"
                })
            }
        }
        )
)

//serializar usuario

passport.serializeUser((usuario,callback) =>{
    callback(null,usuario)
})

//deserializar usuario
passport.deserializeUser((usuario,callback) =>{
    callback(null,usuario)
})

module.exports = passport;