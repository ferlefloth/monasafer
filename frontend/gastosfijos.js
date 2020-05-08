document.getElementById('btn-nuevo').addEventListener('click', mostrarModalNuevoGasto)
document.getElementById('btn-guardar').addEventListener('click', guardarGastoEditado)

function login(){
let url = "http://localhost:3000/auth"

fetch(url, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({user:'pablo', password:'123456'}),
                headers:{
                            "Content-type": "application/json"
                }
           }
 ).then(response => response.text() )
 .then( data =>{
                    console.log(data)
                } )
}

function logout(){
    let url = "http://localhost:3000/auth"

    fetch(url, {
                    method: 'DELETE',
                    credentials: 'include',
                }
    ).then(response => response.text() )
    .then( data =>{
                        console.log(data)
                    } )
    
}

function mostrarModalNuevoGasto(){
    cambiarTituloModal('Nuevo Gasto')

    let inputs = document.getElementsByTagName('input');

    for (input of inputs){
        input.value = '';
    }
}
function mostrarModalEditarGasto(){
    cambiarTituloModal('Editar Gasto')
    
};

function cambiarTituloModal(titulo){

    document.querySelector('#modal-nuevo .modal-title').innerHTML = titulo;

}


 function guardarGastoEditado(){

    let url = 'http://localhost:3000/expend'

    let data= {
         descr : document.getElementById('descr').value,
         value : document.getElementById('value').value,
         creationdate : document.getElementById('creationdate').value,
         finishdate: document.getElementById('finishdate').value
         };
    
     fetch(url, {
                 method: 'POST',
                 body: JSON.stringify(data),
                 credentials :"include", //CUANDO TENGAS EL LOGIN, ES PARA QUE VIAJEN LAS COOKIES
                 headers:{
                             "Content-Type": "application/json"
                         }
                })
             
             
            .then (res => res.json())
              
            
            .then (data =>{alert(data.message)})
             
            .catch((err)=>{alert('Error al guardar receta')})
        };
async function cargarGastos(){
    url = "http://localhost:3000/expend";

    fetch(url, {
                method: 'GET',
                credentials: 'include'
    }).then(

        response => {
           
            return response.json();
            
        }
        
            
        ).then(
            expend =>{mostrarGastosEnTabla(expend)}
        )

}

function mostrarGastosEnTabla(expend){

    let listadoGastos =document.getElementById('listado-gastos')
    for (oneExpend of expend){
        listadoGastos.innerHTML += `	<tr>
                                            <td>${oneExpend.expen_descr}</td>
                                            <td>$${oneExpend.expen_value}</td>
                                            <td>${oneExpend.expen_creation_date}</td>
                                            <td>${oneExpend.expen_finish_date}</td> 
                                            <td>
                                                <button class="btn btn-danger">Borrar</button>
                                                <button class="btn btn-success btn-editar" data-toggle="modal" data-target="#modal-nuevo">Editar</button>
                                            </td>
                                        </tr>`
    }

    document.querySelectorAll('.btn-editar').forEach(
        (botonEditar)=> {botonEditar.addEventListener('click', mostrarModalEditarGasto)}
    )
}
cargarGastos();