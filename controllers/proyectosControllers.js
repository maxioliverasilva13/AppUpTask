const proyectos = require('../model/proyectos')
const slug = require('slug');
const tareas = require("../model/tareas")



exports.proyectoHome = async (req,res) =>{
    //select a los proyectos
    const proyect = await sliderProyectos(res);


    res.render("index",{
        namePage: "Inicio",
        proyect
    });
}
exports.formproyect = async (req,res) =>{
    const proyect = await sliderProyectos(res);

    res.render('nuevoProyecto',{
        namePage:"Nuevo Proyecto",
        proyect
    })
}

exports.nuevoProyecto = async (req,res) =>{
    const proyect = await sliderProyectos(res);

    //console.log(req.body)
    //validar que se envien datos

    const {nombre} = req.body
    console.log(nombre)
    let errores = [];
    if(!nombre){
        errores.push({texto: "Agrega Nombre A Poryecto"})
    }
    if(errores.length > 0){
        res.render('nuevoproyecto',{
            namePage:"Nuevo Proyecto",
            errores,
            proyect
        })
    }else{
        //inserto en bdd

        /*proyectos.create({ nombre})
        .then(()=> console.log("insertado correctamente"))
        .catch((error)=>{console.log(error)})
*/

        //hook

        //con async await
        const usuarioId = res.locals.usuario.id;
        const proyecto = await proyectos.create({ nombre,usuarioId});
        res.redirect("/")
       

    }
}

exports.proyectoUrl = async (req,res,next) =>{
    const proyect = await sliderProyectos(res);

    const proyecto = await proyectos.findOne({
        where: {
            url: req.params.url
        }
    });

    //consulto tareas de proyecto actual
    const tarea = await tareas.findAll({
        where:{
            proyectoId: proyecto.id
        },
        //es como un join trayendo tambien los datos de el proyecto
        include:[{model  :proyectos}]
    })


    if(!proyecto) return next();
    res.render('tarea',{
        namePage:"Tareas Del Proyecto",
        proyect,
        proyecto,
        tarea
    })
}


exports.formeditarproyect = async (req,res) => {
    const proyectPromise = sliderProyectos(res);

    const datoPromise =  proyectos.findOne({
        where:{
        id:req.params.id
        }
    })
    //hago esto por que al usar await 2 veces seguidas tendria que ser por dependencia pero en este caso no son dependientes entre si
    const [proyect,proyecto]  =await Promise.all([proyectPromise,datoPromise])

    res.render("nuevoproyecto",{
        namePage:"Editar Proyecto",
        proyect,
        proyecto
    })
}



//para actualizar proyecto con post
exports.updateProyect = async (req,res) =>{
    const proyect = await sliderProyectos(res);

    //descruct
    const {nombre} = req.body
    
    let errores = [];
    if(!nombre){
        errores.push({texto: "Agrega Nombre A Poryecto"})
    }
    if(errores.length > 0){
        res.render('nuevoproyecto',{
            namePage:"Nuevo Proyecto",
            errores,
            proyect
        })
    }else{
        await proyectos.update(
            {nombre:nombre},
            {where:{
                id:req.params.id
            }}
            );
        res.redirect("/")
       

    }
}

exports.eliminarProyecto = async (req,res,next) =>{
    const {urlProyecto} = req.query;
    const resultado = await proyectos.destroy(
        {
            where:{url:urlProyecto}
        }
    );
    
    if(!resultado){
        return next();
    }
    res.status(200).send("Proyecto Eliminado Correctamente")

}


function sliderProyectos(res){
    const userid = res.locals.usuario.id;
    return proyectos.findAll({
        where:{usuarioId:res.locals.usuario.id}
    });
} 