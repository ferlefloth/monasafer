import React from "react";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import iconoNoFavorito from '../no_favorito.png';
import {Link} from 'react-router-dom';

export default (props)=>

    <Col md={4} lg={3} xl={2} className="mb-4 text-center d-flex align-items-stretch justify-content-center">

        <Card>

            <Card.Body>

                <a className="nav-link p-0 text-right" href="#">
                    <img src={iconoNoFavorito}></img>
                </a>

                <Link to={"/productos/" + props.id} className="nav-link p-0 mt-3">
                    <Card.Title style={{fonSize:"0.8rem"}} className="mb-5">
                        {props.titulo}
                    </Card.Title>
                
                    <img
                        src={props.imagen}
                        className="card-img-top">
                    </img>
                </Link>

            </Card.Body>

            <Card.Footer>
                <small className="text-muted">{props.precio}</small>
            </Card.Footer>

        </Card>

    </Col>