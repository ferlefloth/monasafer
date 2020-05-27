import React,{useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function NuevoAhorroModal(props){

    const [descr, setDescr] = useState('');
    const [value, setValue] = useState('');
    const [creation_date, setCreationDate] = useState('')
    // const [finish_date, setFinishDate] = useState('');
    
    const handleChangeDescr = (event)=>{
        setDescr(event.target.value);
        
    }
    
    const handleChangeValue = (event)=>{
        setValue(event.target.value);
    }

    const handleChangeCreationDate = (event)=>{
        setCreationDate(event.target.value)
    }

    // const handleFinishDate = (event)=>{
    //     setFinishDate(event.target.value)
    // }

    const handleSave = ()=>{

        const formData = new FormData();

        formData.append('descr', descr)
        formData.append('value', value)
        formData.append('creationdate', creation_date)
        // formData.append('finishdate', finish_date)

        fetch('http://localhost:3000/save',{
            method: 'POST',
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

        <Modal show={props.show} onHide ={props.hide}>
            <Modal.Header closeButton>
                <Modal.Title>Nuevo Ahorro</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group controlId="formDescrGasto">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control type="text" placeholder="Agregar descripcion del Ahorro" value={descr} onChange={handleChangeDescr}/>
                </Form.Group>
                
                <Form.Group controlId="formValueGasto">
                    <Form.Label>Valor</Form.Label>
                    <Form.Control type="text" placeholder="Agregar valor del Ahorro" value={value} onChange={handleChangeValue}/>
                </Form.Group>

                <Form.Group controlId="formFechaDeInicioGasto">
                    <Form.Label>Fecha de inicio</Form.Label>
                    <Form.Control type="text" placeholder="Agregar fecha de inicio del Ahorro" value={creation_date} onChange={handleChangeCreationDate} />
                </Form.Group>

                {/* <Form.Group controlId="formFechaDeFinalizacionGasto">
                    <Form.Label>Fecha de Finalizacion</Form.Label>
                    <Form.Control type="text" placeholder="Agregar fecha de finalizacion del gasto" value={finish_date} onChange={handleFinishDate}/>
                </Form.Group> */}

            </Modal.Body>

            <Modal.Footer>
                <Button variant= "secondary">
                    Cancelar
                </Button>

                <Button variant="primary" onClick={handleSave}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>

    )
}
export default NuevoAhorroModal;
