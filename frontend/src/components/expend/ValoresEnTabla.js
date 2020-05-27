import React,{useState} from 'react'
import EditGastoModal from './EditGastoModal';



function ValoresEnTabla (props){

    const handleEditClick = ()=>{
        props.onEditClick( props.id); // No se si podría llegar así, porque el edit esta dentro del button
        alert('hola' + props.id)
 
 
    }
    
    

    //// HANDLE EDIT DELETE ////
    
    const [state_code, setStateCode] = useState('');
    
    const handleChangeStateCode= (event)=>{
        setStateCode(event.target.value = 0)       
    }
   
 
    function handleEliminarClick(){

        const formData = new FormData();

        formData.append('expen_state_code', 0)
       

        

        fetch('http://localhost:3000/expend/' + props.id,{ //problema con el props rey
            method: 'PUT',
            body: formData,
            credentials: 'include'
        }).then(response => response.json())
        .then (data =>{
            console.log(data);
        })
        .catch(err=>{
            console.log('Error')
        })



    }


    return(

    <>
        <tr>
        <td>{props.id}</td>
            <td>{props.descripcion}</td>
            <td>${props.valor}</td>
            <td>{props.fechadeinicio}</td>
            <td>{props.fechadefinalizacion}</td>
            <td>    
                <button variant="primary" onClick={handleEditClick} >editar</button>
                <button  variant="danger" onClick={handleEliminarClick} value={state_code} onChange={handleChangeStateCode}>eliminar</button>
                
            </td>
            
        </tr>
       <EditGastoModal />
       
    </>
    
    )
    
}

export default ValoresEnTabla;


