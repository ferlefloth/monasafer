import React,{useState} from 'react'
import EditGastoModal from './EditMonaModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';



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

        formData.append('mona_state_code', 0)
       

        

        fetch('http://localhost:3000/mona/' + props.id,{ //problema con el props rey
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

    // let iterable = props.ids 
    // console.log(props.id)
    // console.log(props.value)
    // for (const value of iterable) {
        
    //     value =+ props.value 

    // }

    return(


    <>
        <tr>
            <td>{props.id}</td>
            <td>{props.descripcion}</td>
            <td>${props.valor}</td>
            
            <td>    
                <button variant="light" onClick={handleEditClick} ><FontAwesomeIcon color="green" icon={faEdit} /></button>
                <button variant="light" onClick={handleEliminarClick} value={state_code} onChange={handleChangeStateCode} > <FontAwesomeIcon color="red" icon={faTrash} /></button>
                
            </td>
            
        </tr>
       <EditGastoModal />
       
    </>
    
    )
    
}

export default ValoresEnTabla;


