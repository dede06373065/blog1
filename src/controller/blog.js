const {exec}=require('../db/mysql')
const getList = (author, keyword) => {
    let sql=`select * from blogs where 1=1 `//1=1用来占位 永远成立
    if(author){
        sql+=`and author='${author}' `
    }
    if(keyword){
        sql+=`and title like '%${keyword}%' `
    }
    sql+=`order by createtime desc;`
    return exec(sql) 
}

const getDetail = (id) => {
    return {
        id: 1,
        title: 'title A',
        content: 'content a',
        createTime: 1627521360068,
        author: 'aaaa'
    }
}

const newBlog = (blogData = {}) => {
    console.log('newblog data...', blogData)
    return {
        id: 3
    }
}

const updateBlog = (id, blogData = {}) => {
    console.log('update blog', id, blogData)
    return true
}

const deleteBlog = (id) => {
    console.log('delete blog')
    return true
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}