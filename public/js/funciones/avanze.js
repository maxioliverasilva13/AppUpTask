import Swal from "sweetalert2";

export const actualizarAvance = () =>{
    //seleccionar tareas existentes
    const tareas = document.querySelectorAll("li.tarea");
    if(tareas.length){

    //seleccionar tareas completadas
    const tareasCompletadas = document.querySelectorAll('i.completo')

    //calcular avance
    const avanceNumber = Math.round((tareasCompletadas.length / tareas.length) * 100);

    const porcentaje = document.querySelector("#porcentaje");
    porcentaje.style.width = avanceNumber + "%";


    if(avanceNumber==100){
        Swal.fire(
            "Completaste El Proyecto",
            "Felicidades Has Terminado Tus Tareas",
            'success'
        )
    }
    }


    }
   