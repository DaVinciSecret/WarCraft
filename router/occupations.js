const express = require('express');
const pool = require('../pool.js');
const bodyParser = require('body-parser');

const router = express.Router();

router.get('/',(req,res)=>{
    var sqlstr = 'select totem_img,title,subtitle,detail,ability_img from war_occupation';
    pool.query(sqlstr,(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({code:200,data:result});
        }
    });
});

router.get('/details',(req,res)=>{
    var $title = req.query.title;
    var sqlstr = "select totem_img,title,subtitle,detail,ability_img from war_occupation where title = ?";
    pool.query(sqlstr,[$title],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({code:200,data:result});
        }
    });
})  









//导出路由模块
module.exports = router;