import Swal from 'sweetalert2';
import axios from 'axios';

const btnEleminar = document.querySelector("#eliminar-proyecto");
const addeditButton = document.querySelector("#addeditButton");




if(addeditButton){
    addeditButton.addEventListener('click',function(){
    })
}





if(btnEleminar){
    btnEleminar.addEventListener('click',(e)=>{
        const urlProyecto = e.target.dataset.proyectoUrl;


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
                const url = `${location.origin}/proyectos/${urlProyecto}`
                axios.delete(url,{params:{urlProyecto}})
                .then(function(respuesta){
                    Swal.fire(
                        'Eliminado!',
                        respuesta.data,
                        'success'
                      );
                        //enviar peticion a axios
        
        
                        setTimeout(() => {
                            window.location.href = "/"
                        }, 3000);
                }).catch(()=>{
                    Swal.fire({
                        type:"Error",
                        title:"Hubo un error",
                        text:"No se pudo eliminar el proyecto"
                    })
                })
             
            
    
            }
    
    
    
          });
          
    });
}

export default btnEleminar;