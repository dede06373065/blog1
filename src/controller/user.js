const loginCheck=(username,password)=>{
    if(username==="dede"&&password==="123"){
        return true
    }
    return false
}
module.exports={
    loginCheck
}