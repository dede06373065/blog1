const { resolve } = require('path')
const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
//用于处理postdata
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type' !== 'application/json']) {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}
const serverHandle = (req, res) => {
    //setup the return JSON
    res.setHeader('Content-type', 'application/json')//返回是字符串但是是JSON格式的
    const url = req.url
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])//以对象的形式放在query中

    getPostData(req).then(postData => {
        req.body = postData
         //deal with the blog router
        // const blogData = handleBlogRouter(req, res)
        // if (blogData) {
        //     res.end(
        //         JSON.stringify(blogData)//return JSON string字符串
        //     )
        //     return
        // }
        const blogResult= handleBlogRouter(req, res)
        if(blogResult){
            blogResult.then(blogData=>{
                res.end(
                    JSON.stringify(blogData)//return JSON string字符串
                )
            })
            return
        }
        
        //deal with userRouter
        const userData = handleUserRouter(req, res)
        if (userData) {
            res.end(
                JSON.stringify(userData)
            )
            return
        }
        //not found
        res.writeHead(404, { "Content-type": "text/plain" })
        res.write("404 Not Found\n")
        res.end()
    })
}

module.exports = serverHandle