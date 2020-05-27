import React, {useState} from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/NavBar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import LoginModal from './LoginModal'


import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'


function NavigationBar (props){

    const  [mostrarModal, setMostrarModal] = useState(false)

    function ocultarModalLogin(){
        setMostrarModal(false)
    }
    
    function mostrarModalLogin (){
        setMostrarModal(true);
    }

    return(
        <>
        <Navbar style={{backgroundColor: "#16A085"}} expand="lg">
            
            <Navbar.Brand href="#home">Monasafer</Navbar.Brand>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            
            <Navbar.Collapse id="basic-navbar-nav">
                
                <Nav className="ml-auto">
                    <Nav.Link href="#home">Mona</Nav.Link>
                    
                    <NavDropdown title="Gastos" className="nav-gasto">
                        <NavDropdown.Item href="#action/3.1">Gastos fijos y variables</NavDropdown.Item>
                        <NavDropdown.Divider />
                    </NavDropdown>

                    <NavDropdown title="Ahorros" className="nav-ahorro">
                        <NavDropdown.Item href="#action/3.1">Ahorros</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Plan de Ahorro</NavDropdown.Item>
                        <NavDropdown.Divider />
                    </NavDropdown>
                    
                    
                    {!props.user
                    ?
                        <Button className="ml-auto" onClick={mostrarModalLogin} variant="primary" >Inicias Sesión</Button>
                    :
                        <>
                            <NavDropdown title ={props.user.nombre}>
                                <NavDropdown.Item onClick={props.handleLogout}>Cerrar sesión</NavDropdown.Item>
                            </NavDropdown>
                        </>
                    }   
                </Nav>
            
            </Navbar.Collapse>
        </Navbar>
        
        <LoginModal show= {mostrarModal} 
                    hide={ocultarModalLogin}
                    handleLoginSuccess={props.handleLoginSuccess}/>
        </>
    )
}

export default NavigationBar; 