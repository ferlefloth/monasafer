import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table'
import ValoresEnTabla from './ValoresEnTabla'
import Button from 'react-bootstrap/Button'
import NuevoMonaModal from './NuevoMonaModal'
import EditMonaModal from './EditMonaModal';



function MonaTabla(props){


    //////////////////// NUEVO GASTO ///////////////////////////////////
    const [mostrarMona, setmostrarMona] = useState(false)

    function NewMona(){
        setmostrarMona(true)
    }

    function OcultarNewMona(){
        setmostrarMona(false)
    }
    //////////////////////////////////////////////////////////////////
    
    /////////////////   EDITAR GASTO /////////////////////////////////
    
    const [mostrarEditarMona, setMostrarEditarMona] = useState(false)

    const[selectedIdGasto, setSelectedIdGasto] = useState(null)

    // function EditGasto(){
    // setMostrarEditarGasto(true)
    // }
     function OcultarEditarMona(){
         setMostrarEditarMona(false)
     }


     const handleEditClick = (id)=>{
         setSelectedIdGasto(id)
         setMostrarEditarMona(true)
        
    }


 
    const [monas, setMonas] = useState([]);

    useEffect( ()=>{

        fetch('http://localhost:3000/mona').then(
            response => response.json()
        ).then(
            data => {
                
                setMonas(data);
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
                    <Button className="ml-auto" onClick={NewMona} variant="primary" >Nueva Mona</Button>
                </div>
            </div>

         <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Descripción</th>
                    <th>Valor</th>
                    {/* <th>Fecha de Inicio</th> */}
                    {/* <th>Fecha de Finalización</th> */}
                    <th>Acciones</th>
                    
                </tr> 
            </thead>
            
            <tbody>
            {
                
                    monas.map( mona =>{
                            return(
                                    <ValoresEnTabla id={mona.mona_id}
                                                    descripcion={mona.mona_descr}
                                                    valor={mona.mona_value}
                                                    fechadeinicio={mona.mona_creation_date}
                                                    fechadefinalizacion=''
                                                    stateCode ={mona.mona_state_code}
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

    <NuevoMonaModal show= {mostrarMona} hide={OcultarNewMona}/>
    <EditMonaModal show ={mostrarEditarMona} hide={OcultarEditarMona} sidg ={selectedIdGasto} />
    </>
                                                    //id={selectedIdGasto}
    )

}

export default MonaTabla;