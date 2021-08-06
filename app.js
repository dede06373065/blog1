const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getCookieExpire=()=>{
    const d=new Date()
    d.setTime(d.getTime()+(24*60*60*1000))
    return d.toGMTString()

}
//session data
const SESSION_DATA = {}
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

    //解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''//k1=v1;k2=v2;
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    });
    console.log('req is cookie is ', req.cookie)

    //解析session
    let needSessionCookie=false
    let userId = req.cookie.userid
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        }
    }else{
        needSessionCookie=true
        userId=`${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]



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
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                if(needSessionCookie){
                    res.setHeader('Set-Cookie',`userid=${userId}; path=/ ; httpOnly; expires='${getCookieExpire()}'`)
                }
                res.end(
                    JSON.stringify(blogData)//return JSON string字符串
                )
            })
            return
        }

        //deal with userRouter
        // const userData = handleUserRouter(req, res)
        // if (userData) {
        //     res.end(
        //         JSON.stringify(userData)
        //     )
        //     return
        // }
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                if(needSessionCookie){
                    res.setHeader('Set-Cookie',`userid=${userId}; path=/ ; httpOnly; expires='${getCookieExpire()}'`)
                }
                res.end()
                JSON.stringify(userData)
            })
            return
        }
        //not found
        res.writeHead(404, { "Content-type": "text/plain" })
        res.write("404 Not Found\n")
        res.end()
    })
}

module.exports = serverHandle