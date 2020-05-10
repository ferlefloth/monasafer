const express = require('express');
const router = express.Router();

router.post('/', (req, res)=>{
    console.log(req.session);

    req.session.user = 'Pablo';
    req.session.idUser = 1;

    res.json({msg:'sesion iniciada'});
})

router.delete('/', (req, res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.clearCookie('expend')
            res.send({msg: 'Sesion cerrada'});
        }
    })
})
module.exports = router;