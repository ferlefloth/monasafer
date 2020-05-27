import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table'
import ValoresEnTabla from './ValoresEnTabla'
import Button from 'react-bootstrap/Button'
import NuevoAhorroModal from './NuevoAhorroModal'
import EditAhorroModal from './EditAhorroModal';



function AhorroTabla(props){


    //////////////////// NUEVO AHORRO///////////////////////////////////
    const [mostrarNuevoAhorro, setMostrarNuevoAhorro] = useState(false)

    function NuevoAhorro(){
        setMostrarNuevoAhorro(true)
    }

    function OcultarNuevoAhorro(){
        setMostrarNuevoAhorro(false)
    }
    //////////////////////////////////////////////////////////////////
    
    /////////////////   EDITAR GASTO /////////////////////////////////
    
    const [mostrarEditarGasto, setMostrarEditarGasto] = useState(false)

     const[selectedIdGasto, setSelectedIdGasto] = useState(null)

    function EditGasto(){
    setMostrarEditarGasto(true)
    }
     function OcultarEditarGasto(){
         setMostrarEditarGasto(false)
     }


     const handleEditClick = (id)=>{
         setSelectedIdGasto(id)
         setMostrarEditarGasto(true)
        
    }


 
    const [ahorros, setAhorros] = useState([]);

    useEffect( ()=>{

        fetch('http://localhost:3000/save').then(
            response => response.json()
        ).then(
            data => {
                
                setAhorros(data);
                console.log(data);
        
            }
        )
        }, []
    );

    
    

    return(

    <>
    
        <div className="container-fluid">


            <div className="row my-3"> 
                <div className="col">           
                    <Button className="ml-auto" onClick={NuevoAhorro} variant="primary" >Nuevo Ahorro</Button>
                </div>
            </div>

         <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Descripción</th>
                    <th>Valor</th>
                    <th>Fecha de Inicio</th>
                    <th>Acciones</th>
                    
                </tr> 
            </thead>
            
            <tbody>
            {
                        ahorros.map( ahorro =>{
                            return(
                                    <ValoresEnTabla id={ahorro.save_id}
                                                    descripcion={ahorro.save_descr}
                                                    valor={ahorro.save_value}
                                                    fechadeinicio={ahorro.save_creation_date}
                                                    // fechadefinalizacion={ahorro.save_finish_date}
                                                    stateCode ={ahorro.save_state_code}
                                                    onEditClick={handleEditClick}
                                                    sidg ={selectedIdGasto}
                                                    //idGasto={selectedIdGasto}
                                                    //Edit={EditGasto} // porque el Botón Edit está en valores en tabla
                                                    />


                                )
                                        

                            }
                        )
                }

              
            </tbody>
        </Table>

        </div>

    <NuevoAhorroModal show= {mostrarNuevoAhorro} hide={OcultarNuevoAhorro}/>
    <EditAhorroModal show ={mostrarEditarGasto} hide={OcultarEditarGasto} sidg ={selectedIdGasto} />
    </>
                                                    //id={selectedIdGasto}
    )

}

export default AhorroTabla;