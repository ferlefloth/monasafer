import React,{useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Swal from 'sweetalert2'

function NuevoGastoModal(props){

    const [descr, setDescr] = useState('');
    const [value, setValue] = useState('');
    //const [creation_date, setCreationDate] = useState('')
 
    
    const handleChangeDescr = (event)=>{
        setDescr(event.target.value);
        
    }
    
    const handleChangeValue = (event)=>{
        setValue(event.target.value);
    }

    // const handleChangeCreationDate = (event)=>{
    //     setCreationDate(event.target.value)
    // }

    // const handleFinishDate = (event)=>{
    //     setFinishDate(event.target.value)
    // }

    const handleSave = ()=>{

        const formData = new FormData();

        formData.append('descr', descr)
        formData.append('value', value)
        //formData.append('creationdate', Date.now())
        // formData.append('finishdate', finish_date)

        fetch('http://localhost:3000/mona',{
            method: 'POST',
            body: formData,
            credentials: 'include'
        }).then(response => response.json())
        .then (data =>{
            if ( data.status === 'ok' ){
                Swal.fire({
                    text: data.message,
                    icon: 'success'
                })
                

            }
            else{
                Swal.fire({
                    text: data.message,
                    icon: 'error'
                })
              
            }

        })
        .catch(err=>{
            console.log('Error')
        })
    }

    return(

        <Modal show={props.show} onHide ={props.hide}>
            <Modal.Header closeButton>
                <Modal.Title>Nueva Mona</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group controlId="formDescrMona">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control type="text" placeholder="Agregar descripcion de la mona" value={descr} onChange={handleChangeDescr}/>
                </Form.Group>
                
                <Form.Group controlId="formValueMona">
                    <Form.Label>Valor</Form.Label>
                    <Form.Control type="text" placeholder="Agregar valor de la Mona" value={value} onChange={handleChangeValue}/>
                </Form.Group>

                {/* <Form.Group controlId="formFechaDeInicioMona">
                    <Form.Label>Fecha de inicio</Form.Label>
                    <Form.Control type="text" placeholder="Agregar fecha de inicio de la Mona" value={creation_date} onChange={handleChangeCreationDate} />
                </Form.Group> */}


            </Modal.Body>

            <Modal.Footer>
                <Button variant= "secondary" onClick={props.hide}>
                    Cancelar
                </Button>

                <Button variant="primary" onClick={handleSave} onClickCapture={props.hide}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>

    )
}
export default NuevoGastoModal;
