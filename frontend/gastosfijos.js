document.getElementById('btn-nuevo').addEventListener('click', mostrarModalNuevoGasto)

function mostrarModalNuevoGasto(){
    alert('ee')
    document.querySelector('#modal-nuevo .modal-title').innerHTML = "NuevO Gasto"
    
}
function mostrarModalEditarGasto(){
    alert("editar el gasto")
}
async function cargarGastos(){
    url = "http://localhost:3000/expend";

    fetch(url).then(

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

    document.getElementsByClassName('.btn-editar').forEach(
        (botonEditar)=> {botonEditar.addEventListener('click', mostrarModalEditarGasto())}
    )
}
cargarGastos();