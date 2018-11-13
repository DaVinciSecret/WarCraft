const express = require('express');
const pool = require('../pool.js');
const bodyParser = require('body-parser');

const router = express.Router();

//评论列表查询
router.get('/comment',(req,res)=>{
    var sqlstr = 'select cid,uname,date,comment,praise,hate from war_comment order by cid desc';
    pool.query(sqlstr,(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({code:200,obj:result});
        }
    });
});
//检查是否登录
router.get('/islogin',(req,res)=>{
    if(req.session['uid'] === undefined){
        res.send({code:200,msg:unlogin});
    }else{
        var uid = req.session.uid;
        var sql = 'select * from war_user where uid=?';
        pool.query(sql,[uid],(err,result)=>{
            if(err) throw err;
            if(result.length > 0){
                var user = result[0];
                res.write(JSON.stringify({
                    code:1,uname:user.uname
                  }))
                  res.end()
            }
        })
    }
})

//评论列表插入
router.post('/comment/insert',(req,res)=>{
    if(req.session['uid'] === undefined){
        res.send({code:0,msg:'unlogin!'});
    }else{
        console.log('session:'+req.session['uid']);
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

//货赞/货踩
router.get('/priseOrhate',(req,res)=>{
    if(req.session['uid'] === undefined){
        res.send({code:0,msg:'unlogin!'});
    }else{
        var $praise = req.query.praise;
        var $hate = req.query.hate;
        var $cid = req.query.cid;
        console.log($praise,$hate,$cid);
        var $other = null;
        var sqlstr = '';
        if($praise){
            sqlstr = 'UPDATE war_comment SET praise = ? WHERE cid = ?'
            $other = $praise;
        }
        if($hate){
            sqlstr = 'UPDATE war_comment SET hate = ? WHERE cid = ?'
            $other = $hate;
        }
        pool.query(sqlstr,[$other,$cid],(err,result)=>{
            if(err) throw err;
            if(result.affectedRows > 0){
                res.send({code:'200',msg:'praise/hate success'});
            }
        })
    }
})


//导出路由模块
module.exports = router;