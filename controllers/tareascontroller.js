const proyectos = require('../model/tareas')
const Proyectos = require('../model/proyectos');
const tareas = require('../model/tareas')


exports.agregartarea = async (req,res,next)=> {
    //obtenemos el proyecto actual
    const proyecto = await Proyectos.findOne({
        where:{
            url:req.params.url
        }
    });

    //leer valor del input enviado por post
    const {tarea} = req.body;
    const estado = 0;

    const proyectoId = proyecto.id;

    //insertar en bdd y redireccionar
    const resultado = await tareas.create({tarea,estado,proyectoId});

    if(!resultado){
        return next();
    }
    res.redirect(`/proyectos/${req.params.url}`)
}




exports.cambiarEstadoTarea = async (req,res,next)=>{
    const idtar = req.params.id
    const tarea = await tareas.findOne(
        {where:{id:idtar}}
    )
    let estado = 0;
    if(tarea.estado=== estado){
        estado=1;
    }else{
        //se mantiene como esta
    }
    tarea.estado = estado;
    const resultado = await tarea.save();
    if(!resultado){
        return next();
    }
    res.status(200).send('todo bien')
}



exports.eliminarTarea = async (req,res,next) => {
    const {idTarea} = req.query;
    const resultado = await tareas.destroy({where:{
        id:idTarea
    }})
    if(!resultado){
        return next();
    }
    res.status(200).send("Eliminado Correctamente")

}