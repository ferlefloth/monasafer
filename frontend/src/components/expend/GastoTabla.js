import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table'
import ValoresEnTabla from './ValoresEnTabla'
import Button from 'react-bootstrap/Button'
import NuevoGastoModal from './NuevoGastoModal'
import EditGastoModal from './EditGastoModal';

function GastoTabla(props){

    //////////////////// NUEVO GASTO ///////////////////////////////////
    const [mostrarNuevoGasto, setMostrarNuevoGasto] = useState(false)

    function NuevoGasto(){
        setMostrarNuevoGasto(true)
    }

    function OcultarNuevoGasto(){
        setMostrarNuevoGasto(false)
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

    const [gastos, setGastos] = useState([]);

    useEffect( ()=>{

        fetch('http://localhost:3000/expend').then(
            response => response.json()
        ).then(
            data => {
                
                setGastos(data);
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
                    <Button className="ml-auto" onClick={NuevoGasto} variant="primary" >Nuevo Gasto</Button>
                </div>
            </div>

         <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Descripción</th>
                    <th>Valor</th>
                    <th>Fecha de Inicio</th>
                    <th>Fecha de Finalización</th>
                    <th>Acciones</th>
                    
                </tr> 
            </thead>
            
            <tbody>
            {
                        gastos.map( gasto =>{
                            return(
                                    <ValoresEnTabla id={gasto.expen_id}
                                                    descripcion={gasto.expen_descr}
                                                    valor={gasto.expen_value}
                                                    fechadeinicio={gasto.expen_creation_date}
                                                    fechadefinalizacion={gasto.expen_finish_date}
                                                    stateCode ={gasto.expen_state_code}
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

    <NuevoGastoModal show= {mostrarNuevoGasto} hide={OcultarNuevoGasto}/>
    <EditGastoModal show ={mostrarEditarGasto} hide={OcultarEditarGasto} sidg ={selectedIdGasto} />
    </>
        //id={selectedIdGasto}
    )

}

export default GastoTabla;