const express = require('express');
const pool = require('../pool.js');
const bodyParser = require('body-parser');

const router = express.Router();

//用户注册——增
router.post('/register',(req,res)=>{
    var obj = req.body;
    var $uname = obj.uname;
    var $upwd = obj.upwd;
    var $email = obj.email;
    var $phone = obj.phone;

    //判空
    if(!$uname){
        res.send({code:'401',msg:'uname is required'});
        return;
    }
    if(!$upwd){
        res.send({code:'401',msg:'uname is required'});
        return;
    }
    if(!$email){
        res.send({code:'401',msg:'uname is required'});
        return;
    }
    if(!$phone){
        res.send({code:'401',msg:'uname is required'});
        return;
    }
    //插入数据
    var sqlstr = 'INSERT INTO war_user VALUES(NULL,?,?,?,?,NULL,NULL,NULL)';
    pool.query(sqlstr,[$uname,$upwd,$email,$phone],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows > 0){
            res.send({code:200,msg:'register success'});
        }else{
            res.send({code:301,msg:'register error'});
        }
    });
});

//用户登录——查询
router.post('/login',(res,req)=>{
    var obj = req.body;
    var $uname = obj.uname;
    var $upwd = obj.upwd;

    if(!$uname){
        res.send({code:'401',msg:'uname is required'});
        return;
    }
    if(!$upwd){
        res.send({code:'401',msg:'uname is required'});
        return;
    }
    var sqlstr = 'SELECT * FROM war_user WHERE uname = ? AND upwd = ?';
    pool.query(sqlstr,[$uname,$upwd],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({code:200,msg:'login success'});
        }else{
            res.send({code:301,msg:'login error'});
        }
    });
});

//用户名重复——ajax查询
router.get('/checkName',(req,res)=>{
    var obj = req.query;
    var $uname = obj.uname;
    if(!$uname){//待定——前端判空
        res.send({code:401,msg:'uname required'});
    }
    var sqlstr = 'SELECT * FROM war_user WHERE uname = ?';
    pool.query(sqlstr,$uname,(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({code:301,msg:'uname is repeat'});
        }else{
            res.send({code:200,msg:'uname can be use'});
        }
    });
});

//用户删除——删

//用户修改——改


//导出路由模块
module.exports = router;