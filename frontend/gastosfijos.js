document.getElementById('btn-nuevo').addEventListener('click', mostrarModalNuevoGasto)
document.getElementById('btn-guardar').addEventListener('click', guardarGastoEditado)


function mostrarModalNuevoGasto(){
    cambiarTituloModal('Nuevo Gasto')

    let inputs = document.getElementsByTagName('input');

    for (input of inputs){
        input.value = '';
    }

    document.getElementById('id-gasto').value = -1;


}
async function mostrarModalEditarGasto(event){
    cambiarTituloModal('Editar Gasto')
    let idGasto = event.currentTarget.getAttribute('data-id-gasto')
    ////console.log(idGasto);//////////////
    let oneExpend = await getUnGasto (idGasto);

    document.getElementById('descr').value =oneExpend.expen_descr
    
    document.getElementById('value').value =oneExpend.expen_value
    
    document.getElementById('creationdate').value =oneExpend.expen_creation_date
    
    document.getElementById('finishdate').value =oneExpend.expen_finish_date

    document.getElementById('id-gasto').value = idGasto //ESTE VA A SER EL HIDDEN MOSTRANDOSE EN EL FRONT (Ventana modal)
    ////console.log(idGasto) //////////////
};


async function getUnGasto (idGasto){ //de donde sale ese IDGASTO?

    let url =`http://localhost:3000/expend/${idGasto}`

    let response = await fetch(url, {
                    method: 'GET',
                    credentials: 'include' //credensiales para que viajen las cookies, sino no lo acepta
                    })
    let gasto = await response.json();
    

    return gasto ;
    
}

function cambiarTituloModal(titulo){

    document.querySelector('#modal-nuevo .modal-title').innerHTML = titulo;

}

 function guardarGastoEditado(){

    let url = 'http://localhost:3000/expend'

    let data= {
         descr : document.getElementById('descr').value,
         value : document.getElementById('value').value,
         creationdate : document.getElementById('creationdate').value,
         finishdate: document.getElementById('finishdate').value,
         statecode: 1
         };
    
    let idGasto = document.getElementById('id-gasto').value; //hidden
    
    let metodo;
    //metodo = idGasto == 1 ? 'POST' : 'PUT'; /// ESTO ES UN IF TERNARIO- ES LO MISMO QUE EL IF QUE ESTA ABAJO
    
    if (idGasto == -1){

        expendInsert(url,data);
    }
    else{
        expendUpdate(url, idGasto,data);
     }
};

async function expendDelete (event){
    
    let url = 'http://localhost:3000/expend'
    let idGasto = event.currentTarget.getAttribute('data-id-gasto')
    
    let data = {
        statecode: 0,
        };
    console.log(data)
    expendUpdate(url, idGasto, data)
}

function expendUpdate(url, idGasto, data){
    console.log("url" + url)
    console.log("idGasto" + idGasto)
    console.log("data" + data)
    
    console.log(url, idGasto, data)
    expendUpsert(url +'/'+ idGasto, 'PUT', data)
};

function expendInsert(url, data){
    expendUpsert(url +'/', 'POST', data)
};

function expendUpsert(url, metodo, data){ //Parametrizamos una funcion y la llamo dos veces
    console.log(data)
    console.log(JSON.stringify(data))
    fetch(url, {
        method: metodo,
        body: JSON.stringify(data),
        credentials :"include", //CUANDO TENGAS EL LOGIN, ES PARA QUE VIAJEN LAS COOKIES
        headers:{
                    "Content-Type": "application/json"
                }
       })

    .then (res => res.json())
    .then (data =>{alert(data.message)})        
    .catch((err)=>{alert('Error al guardar receta')})
}



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
                                                <button data-id-gasto= ${oneExpend.expen_id} class="btn btn-danger btn-borrar">Borrar</button>
                                                <button data-id-gasto= ${oneExpend.expen_id} class="btn btn-success btn-editar" data-toggle="modal" data-target="#modal-nuevo">Editar</button>
                                            </td>
                                        </tr>`
    }

    document.querySelectorAll('.btn-editar').forEach(
        (botonEditar)=> {botonEditar.addEventListener('click', mostrarModalEditarGasto)}
    )
    document.querySelectorAll('.btn-borrar').forEach(
        (botonBorrar)=> {botonBorrar.addEventListener('click', expendDelete)}
    )
}
cargarGastos();