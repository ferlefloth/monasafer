const express = require('express');
const conexion = require('../connection')
const router = express.Router();

router.get('/', (req, res)=>{                          //GASTOS 

  
conexion.query('SELECT * FROM expend', function(err,result,fields){
        if (err) throw err;
        
        //console.log(result);
        res.json(result);
})       
                        
        //res.send('listado de gastos de monadb')
});

router.get('/:id', (req, res) => {
    
        conexion.query('SELECT * FROM expend WHERE expen_id=' + req.params.id,
                        function (err, result, fields){
                            if ( err ) throw err;
    
                            res.json(result[0]); //esta con el [0], asi te devuelve el OBJETO de la array y no la array completa
                        }
                    )
    
    } );




router.post('/', (req, res)=>{
console.log(req.body)
        //¿EL NUMERO DE ID IRIA EN PARAMETROS? ejemplo {params.id}      
let sql = `INSERT INTO expend (expen_descr, expen_value, expen_user_id, expen_creation_date, expen_finish_date, expend_state_code) 
            VALUES (?, ?, ?, ?, ?, ?)`

let params = [
        req.body.descr, 
        req.body.value, 
        req.session.idUser,  // solucionado (parametros aclarados en session_routes.js )
        req.body.creationdate, 
        req.body.finishdate, 
        req.body.statecode = 1 //TENGO QUE METER ESTA OPCION SI O SI 
        ];
       
        conexion.query(sql, params, function(err,result,fields){
              let respuesta;

              if (err){
                console.log(err)

                respuesta ={
                                status: 'error',
                                message: 'Error al guardar  gasto'
                           }
              }
              else{
                      respuesta = {
                                        status: 'ok',
                                        message: 'El gasto se guardo satisfactoreamente'
                                  }
              }
              res.json(respuesta);
        })

});

router.put('/:id', (req, res)=>{
        
        let sql = `UPDATE expend
                SET expen_descr = ?, 
                expen_value = ?, 
                expen_user_id = ?, 
                expen_creation_date = ?, 
                expen_finish_date= ?, 
                expend_state_code = ?
                WHERE expen_id = ?`
        
        let params = [
                req.body.descr, 
                req.body.value, 
                req.session.idUser,
                req.body.creationdate, 
                req.body.finishdate, 
                req.body.statecode = 1, 
                req.params.id
                ];
        
        conexion.query(sql, params, function(err,result,fields){

                let respuesta;

                if (err){
                        respuesta={
                                        status: 'error',
                                        message: 'Error al modificar la receta',
                                  }
                }
                else{
                        respuesta= {
                                        status: 'ok',
                                        message: 'la respuesta se agregó',
                                  }
                }
                res.json(respuesta);

        })


})

module.exports = router;