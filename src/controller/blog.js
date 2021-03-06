const { exec } = require('../db/mysql')
const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `//1=1用来占位 永远成立
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
    return exec(sql)
}

const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`
    return exec(sql).then(row => { return row[0] })

}

const newBlog = (blogData = {}) => {
    const title = blogData.title
    const content = blogData.content
    const createtime = Date.now()
    const author = blogData.author

    const sql = `
    insert into blogs (title,content,createtime,author)
    values ('${title}','${content}','${createtime},'${author}');`
    return exec(sql).then(insertData => {
        console.log('insertData is ', insertData)
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {

    const title = blogData.title
    const content = blogData.content
    let sql = `
    update blogs set title='${title}',content='${content}' where id=${id}`
    return exec(sql).then(updateData => {
        console.log('update data is ', updateData)
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const deleteBlog = (id, author) => {
    let sql = `
   delete from blogs where id='${id}' and author='${author}'`
    return exec(sql).then(deleteData => {
        if (deleteData.affectedRows > 0) {
            return true
        }
        return false
    })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}