const env=process.env.NODE_ENV //获取环境变量
let MYSQL_CONF
if(env==='dev'){
    MYSQL_CONF={
        host:'localhost',
        user:'root',
        password:'Sbc565678',
        port:'3306',
        database:'MyBlog'
    }
}
if(env==='production'){
    MYSQL_CONF={
        host:'localhost',
        user:'root',
        password:'Sbc565678',
        port:'3306',
        database:'MyBlog'
    }
}

module.exports={
    MYSQL_CONF
}