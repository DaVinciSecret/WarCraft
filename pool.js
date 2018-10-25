//引入mysql模块
const mysql = require('mysql');

//创建数据池连接
var pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'war',
    connectionLimit:20,
    multipleStatements:true//多条sql语句查询
});

//导出
module.exports = pool;