const {
    getList, 
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}=require('../controller/blog')
const {SuccessModel,ErrorModel}=require('../model/resModel')
const handleBlogRouter = (req, res) => {
    const method = req.method
    const id=req.query.id
    
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author=req.query.author||''
        const keyword=req.query.keyword||''
        // const listData=getList(author,keyword)
        // return new SuccessModel(listData)
        const result=getList(author,keyword)
        return result.then(listData=>{
            return new SuccessModel(listData)
        })
    }
    //get the detail of blog
    if (method === 'GET' && req.path === '/api/blog/detail') {
        // const details=getDetail(id)
        // return new SuccessModel(details)
        const result=getDetail(id)
        return result.then(data=>{
            return new SuccessModel(data)
        })
    }
    if (method === 'POST' && req.path === '/api/blog/new') {
        // const data=newBlog(req.body)
        // return new SuccessModel(data)
        
        req.body.author='silly'
        const result=newBlog(req.body)
        return result.then(data=>{
            return new SuccessModel(data)
        })
    }
    if (method === 'POST' && req.path === '/api/blog/update') {
        const result=updateBlog(id,req.body)
        return result.then(val=>{
            if(val){
                return new SuccessModel()
            }else{
                return new ErrorModel('Update fail')
            }
        }) 
    }
    if (method === 'POST' && req.path === '/api/blog/del') {
        const author='333'
        const result=deleteBlog(id,author)
        return result.then(val=>{
            if(val){
                return new SuccessModel()
            }else{
                return new ErrorModel('delete fail')
            }
        })  
    }
}
module.exports=handleBlogRouter