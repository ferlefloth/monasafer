const express = require('express');
const conexion = require('../connection.js')

const router = express.Router();

router.get('/', (req,res)=>{                                           // AHORROS Y PLAN DE AHORRO
   
    conexion.query('SELECT * FROM save', function (err,result,fields){
        if (err) throw err;

        console.log(result);
    })

        res.send('listado de Ahorros de monadb')
  })


module.exports = router;