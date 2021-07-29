const handleUserRouter=(req,res)=>{
    const method=req.method

    if(method==='POST'&&req.path==='/api/user/login')
    return{
        msg:'this is login'
    }

}
module.exports=handleUserRouter