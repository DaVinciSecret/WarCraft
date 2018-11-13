const express = require('express');
const pool = require('../pool.js');
const bodyParser = require('body-parser');

const router = express.Router();

router.get('/hole',(req,res)=>{
    var sqlstr = 'select totem_img,title,subtitle from war_hole';
    pool.query(sqlstr,(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({code:200,data:result});
        }
    })
})

router.get('/legend',(req,res)=>{
    var sqlstr = 'select totem_img,title,subtitle from war_legend';
    pool.query(sqlstr,(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({code:200,data:result});
        }
    })
})

router.get('/chartbar',(req,res)=>{
    var sqlstr = 'select bid,name,value from war_chartbar';
    pool.query(sqlstr,(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({code:200,data:result});
        }
    })
});

router.get('/chartpie',(req,res)=>{
    var sqlstr = 'select pid,name,value from war_chartpie';
    pool.query(sqlstr,(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({code:200,data:result});
        }
    })
})

router.get('/chartline',(req,res)=>{
    var sqlstr = 'select tid,name,data from war_chartline';
    pool.query(sqlstr,(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({code:200,data:result});
        }
    })
})




//导出路由模块
module.exports = router;