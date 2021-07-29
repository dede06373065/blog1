const handleBlogRouter = (req, res) => {
    const method = req.method
    if (method === 'GET' && req.path === '/api/blog/list') {
        return {
            msg: 'this is the blog list port'
        }
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