const express = require('express');
const pool = require('../pool.js');
const bodyParser = require('body-parser');

const router = express.Router();

//用户注册——增
router.post('/register',(req,res)=>{
    var obj = req.body;
    console.log(obj);
    var $uname = obj.uname;
    var $upwd = obj.upwd;
    var $email = obj.email;
    var $phone = obj.phone;

    //插入数据
    var sqlstr = 'INSERT INTO war_user VALUES(NULL,?,?,?,NULL,NULL,NULL)';
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
router.post('/login',(req,res)=>{
    var obj = req.body;
    console.log(obj);
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
            var user = result[0];
            req.session['uid'] = user['uid'];
            console.log(req.session['uid']);
            res.send({code:200,msg:'login success'});
        }else{
            res.send({code:301,msg:'login error'});
        }
    });
});

//用户名重复——ajax查询
router.get('/check',(req,res)=>{
    var obj = req.query;
    console.log(obj);
    var $uname = obj.uname;
    var $email = obj.email;
    console.log($uname);

    //中间过渡变量
    var prop="";
    var $midVO=null;
    
    //判断存在变量
    if(!$email){
        prop = 'uname';
        $midVO = $uname;
    }
    if(!$uname){
        prop = 'email';
        $midVO = $email;

    }
    var sqlstr = `SELECT * FROM war_user WHERE ${prop} = ?`;
    pool.query(sqlstr,[$midVO],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({code:301,msg:'uname is repeat'});
        }else{
            res.send({code:200,msg:'uname can be use'});
        }
    });
});


//评论列表查询
router.get('/comment',(req,res)=>{
    
    var sqlstr = 'select uname,date,comment from war_comment order by cid desc';
    pool.query(sqlstr,(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({code:200,obj:result});
        }
    });
});
//评论列表插入
router.post('/comment/insert',(req,res)=>{
    if(req.session['uid'] === undefined){
        res.send({code:0,msg:'unlogin!'});
    }else{
        var obj = req.body;
        var info = obj.info;
        var comment = obj.postInfo;
        console.log(obj);
        if(info === "insert"){
            var sqlstr1 = `insert into war_comment ( cid,uname,date,comment) values( NULL,?,now(),?)`;
            pool.query(sqlstr1,['alice',comment],(err,result)=>{
                if(err) throw err;
                if(result.affectedRows > 0){
                    console.log("insert success");
                    res.send({code:'200',msg:'insert success'})
                }
            });
        }
    }
});


//用户删除——删

//用户修改——改


//导出路由模块
module.exports = router;
