//引入各部分模块
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
//导入路由器
const user = require('./router/user');


//托管静态资源
app.use(express.static('./public'));
app.use(express.static('./HTML'));

//设置请求头
app.all('*',(req,res,next)=>{
    //允许跨域
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.listen(3000,()=>{
    console.log('War Server is Running');
});
app.use(bodyParser.urlencoded({
    extended:false
}));
