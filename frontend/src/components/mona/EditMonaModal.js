import React,{useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Swal from 'sweetalert2'

function EditMonaModal (props) {

    const [descr, setDescr] = useState('');
    const [value, setValue] = useState('');
    // const [creation_date, setCreationDate] = useState('')
    // const [finish_date, setFinishDate] = useState('');
    
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
    

    
    const handleEdit = ()=>{

        const formData = new FormData();

        formData.append('mona_descr', descr)
        formData.append('mona_value', value)
        // formData.append('expen_creation_date', creation_date)
        // formData.append('expen_finish_date', finish_date)

        

        fetch('http://localhost:3000/mona/' + props.sidg,{ //problema con el props rey
            method: 'PUT',
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
                <Modal.Title>Edit Gasto</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group controlId="formDescrGasto">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control type="text" placeholder="Agregar descripcion del gasto" value={descr} onChange={handleChangeDescr}/>
                </Form.Group>
                
                <Form.Group controlId="formValueGasto">
                    <Form.Label>Valor</Form.Label>
                    <Form.Control type="text" placeholder="Agregar valor del gasto" value={value} onChange={handleChangeValue}/>
                </Form.Group>

                {/* <Form.Group controlId="formFechaDeInicioGasto">
                    <Form.Label>Fecha de inicio</Form.Label>
                    <Form.Control type="text" placeholder="Agregar fecha de inicio del gasto" value={creation_date} onChange={handleChangeCreationDate} />
                </Form.Group>

                <Form.Group controlId="formFechaDeFinalizacionGasto">
                    <Form.Label>Fecha de Finalizacion</Form.Label>
                    <Form.Control type="text" placeholder="Agregar fecha de finalizacion del gasto" value={finish_date} onChange={handleFinishDate}/>
                </Form.Group> */}

            </Modal.Body>

            <Modal.Footer>
                <Button variant= "secondary" onClick={props.hide}> 
                    Cancelar
                </Button>

                <Button variant="primary" onClick={handleEdit} onClickCapture={props.hide} >
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>

    )
}

export default EditMonaModal;