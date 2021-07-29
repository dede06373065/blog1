const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const serverHandle = (req, res) => {
    //setup the return JSON
    res.setHeader('Content-type', 'application/json')//返回是字符串但是是JSON格式的
    const url = req.url
    req.path = url.split('?')[0]
    //deal with the blog router
    const blogData = handleBlogRouter(req, res)
    if (blogData) {
        res.end(
            JSON.stringify(blogData)//return JSON string
        )
        return
    }
    //deal with userRouter
    const userData=handleUserRouter(req,res)
    if(userData){
        res.end(
            JSON.stringify(userData)
        )
        return
    }
    //not found
    res.writeHead(404,{"Content-type":"text/plain"})
    res.write("404 Not Found\n")
    res.end()
}

module.exports = serverHandle