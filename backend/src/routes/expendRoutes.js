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
}
);

router.post('/', (req, res)=>{
                                                                                                                                                                  //¿EL NUMERO DE ID IRIA EN PARAMETROS? ejemplo {params.id}      
let sql = `INSERT INTO expend (expen_descr, expen_value, expen_user_id, expen_creation_date, expen_finish_date, expend_state_code) 
            VALUES ("${req.query.descr}", 
                ${req.query.value}, 
                ${req.query.userid}, 
                ${req.query.creationdate}, 
                ${req.query.finishdate}, 
                ${req.query.statecode})`

        conexion.query(sql, function(err,result,fields){
                if( err ) throw err;

                console.log(result);

                res.json(result)
        })

});


module.exports = router;