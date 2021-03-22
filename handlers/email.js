const nodemailer = require('nodemailer');
const pug = require("pug");
const juice = require("juice")
const htmlToText = require("html-to-text");
//para usar async y await si no lo soporta
const util = require("util")
const emailConfig= require("../config/email");
const email = require('../config/email');
const usuarios = require('../model/usuarios');

let transport = nodemailer.createTransport({
    host:emailConfig.host,
    port:emailConfig.port,
    secure:false,
    auth:{
        user:emailConfig.user,
        pass:emailConfig.pass
    }
})

//generar html
const generatehtml = (namefile,opciones)=> {
    //el juice lo uso para que pueda reconocer styles y demas
    const html = pug.renderFile(`${__dirname}/../views/emails/${namefile}.pug`,opciones)
    return juice(html);
}
exports.enviar = async (opciones) =>{
    const html = generatehtml(opciones.archivo,opciones)
    const text = htmlToText.fromString(html);
    let mailOption = {
        from:"UPTask <np-reply@uptask.com",
        to:opciones.usuario.email,
        subject:opciones.subject,
        text,
        html
        
    }
    const enviarEmail = util.promisify(transport.sendMail,transport)
    return enviarEmail.call(transport,mailOption)

}

