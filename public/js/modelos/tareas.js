import axios from "axios";
import Swal from "sweetalert2"
import {actualizarAvance} from '../funciones/avanze'

const tareas = document.querySelector('.listado-pendientes');
if(tareas){

    tareas.addEventListener('click',e =>{
        if(e.target.classList.contains("fa-check-circle")){
            const icono = e.target;
            //dataset toma el data y luego de pide el nombre de la data-....
            const idTarea = icono.parentElement.parentElement.dataset.tarea;
            console.log(idTarea);

            //request hacia /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`
            axios.patch(url,{idTarea})
            .then(function(respuesta){
                if(respuesta.status===200){
                    icono.classList.toggle('completo')
                    actualizarAvance();

                }
            })

        }

        if(e.target.classList.contains('fa-trash')){
            const tareaHTML = e.target.parentElement.parentElement;
            const idTarea = tareaHTML.dataset.tarea;
            
            
            Swal.fire({
                title: 'Quieres Eliminar',
                text: "Los datos no se podran recuperar",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si,Eliminar',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                if (result.isConfirmed) {
                    const url =  `${location.origin}/tareas/${idTarea}`
                    //enviar el delete por axios
                    axios.delete(url,{params:{
                        idTarea
                    }}).then(function(respuesta){
                        console.log(respuesta)
                        if(respuesta.status===200){
                            //eliminar nodo
                            tareaHTML.parentElement.removeChild(tareaHTML);
                            //una alerta

                            Swal.fire(
                                'Tarea Eliminada',
                                respuesta.data,
                                'success'
                            );

                            actualizarAvance();

                        }
                    })
                }
            });


        }
    })

}


export default tareas;