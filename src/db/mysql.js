const mysql=require('mysql')
const {MYSQL_CONF}=require('../config/db')

//创建连接对象
const con=mysql.createConnection(MYSQL_CONF)

//开始连接
con.connect()

//建立统一执行SQL的函数
function exec(sql){
    const promise= new Promise((resolve, reject)=>{
        con.query(sql,(err,result)=>{
            if(err){
                reject(err)
                return
            }
            resolve(result)
        })
    }) 
    return promise
}

module.exports={
    exec
}