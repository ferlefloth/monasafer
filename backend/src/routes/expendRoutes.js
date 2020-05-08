const express = require('express');
const conexion = require('../connection')
const router = express.Router();

router.get('/', (req, res)=>{                          //GASTOS 

  
conexion.query('SELECT * FROM expend', function(err,result,fields){
        if (err) throw err;
        
        console.log(result);
        res.json(result);
})       
                        
        //res.send('listado de gastos de monadb')
});

router.get('/:id', (req, res) => {
    
        conexion.query('SELECT * FROM expend WHERE expen_id=' + req.params.id,
                        function (err, result, fields){
                            if ( err ) throw err;
    
                            res.json(result[0]);
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
        req.body.userid = 1,  // TENGO QUE METER ESTA OPCION METER ESTA OPCION SI O SI
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


module.exports = router;