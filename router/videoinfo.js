const express = require('express');
const pool = require('../pool.js');
const bodyParser = require('body-parser');
const router = express.Router();

router.get('/',(req,res)=>{
    var sql = 'select vid,title,subtitle,path,poster from war_video';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({code:'200',data:result});
        }
    })
})




module.exports = router;