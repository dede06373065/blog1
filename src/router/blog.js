const {getList}=require('../controller/blog')
const {SuccessModel,ErrorModel}=require('../model/resModel')
const handleBlogRouter = (req, res) => {
    const method = req.method
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author=req.query.author||''
        const keyword=req.query.keyword||''
        const listData=getList(author,keyword)

        return new SuccessModel(listData)
    }
    //get the detail of blog
    if (method === 'GET' && req.path === '/api/blog/detail') {
        return {
            msg: 'this is the detail port'
        }
    }
    if (method === 'POST' && req.path === '/api/blog/new') {
        return {
            msg: 'this is a new blog port'
        }
    }
    if (method === 'POST' && req.path === '/api/blog/update') {
        return {
            msg: 'this is an update blog port'
        }
    }
    if (method === 'POST' && req.path === '/api/blog/del') {
        return {
            msg: 'this is a delete port'
        }
    }
}
module.exports=handleBlogRouter