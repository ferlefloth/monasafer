const express = require('express');
const mysql = require('mysql');

const app = express();

app.post('/usuarios', (req, res)=>{  
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
                    resultado = JSON.stringify(result)
                    console.log(result);
                    console.log(resultado);
                }
            );

        }  
    );
    console.log(resultado);
    res.send({"insert": "ok"});
})

app.get('/usuarios', async (req, res)=>{  
    let resultado = ''                   
    let conexion = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root' ,
            password: '' ,
            database: "monadb"
        }
        );

    await conexion.connect( 
        function(err){
            
            if ( err ) throw err;

            console.log("Conectado con exito!");
            
            conexion.query("SELECT * FROM `user`" , 
                function(err, result, fields){
                    if ( err ) throw err;
                    resultado = JSON.stringify(result)
                    console.log(result);
                    console.log("el resultado es1:")
                    console.log(resultado);
                }
            );

        }  
    );
    console.log("el jkjk es:")
    console.log(resultado);
    res.json(resultado);
})

app.listen(3000, ()=>{console.log('Escuchando...')} );