const express = require('express');
const mysql = require('mysql');


const app = express();

app.get('/', (req, res)=>{
                res.send('Respondiendo desde Express por metodo GET');
                console.log("Respuesta por GET");
              });
 app.get('/gorila', (req, res)=>{
                res.send('El gori te oye porque es buenardo');
                console.log("Respuesta por GET");
              });

app.post('/', (req, res)=>{
                res.send("Respondiendo desde Express por metodo POST");
                console.log("Respuesta por POST");
              });

app.get('/usuarios', (req, res)=>{  
    let resultado = ''                   
    let conexion = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root' ,
            password: '' ,
            database: "monadb"
        }
        );

    conexion.connect( 
        function(err){
            
            if ( err ) throw err;

            console.log("Conectado con exito!");
            
            conexion.query("SELECT * FROM `user`" , 
                function(err, result, fields){
                    if ( err ) throw err;
                    resultado = result
                    console.log(resultado);
                }
            );

        }  
    );
    console.log(resultado);
    res.json(resultado);
})

app.get('/proveedores', (req, res)=>{
                            res.send("Listado de proveedores");
                        })

app.listen(3000, ()=>{console.log('Escuchando...')} );

/*const http = require('http');

const server = http.createServer(  
                                    function(req, res){
                                        res.statusCode = 200;
                                        res.setHeader('Content-type', 'text/plain');
                                        res.end("Respondiendo desde Node.js");
                                    }
                                );

server.listen( 3000, 'localhost', ()=>{ console.log('Escuchando...') } )*/