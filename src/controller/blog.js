const getList = (author, keyword) => {
    //先返回假数据因为没有数据库，保证格式正确
    return [
        {
            id: 1,
            title: 'title A',
            content: 'content a',
            createTime: 1627521360068,
            author: 'aaaa'
        }, 
        {id: 1,
            title: 'title b',
            content: 'content b',
            createTime: 1627521360168,
            author: 'bbb'
        }
    ]
}

const getDetail=(id)=>{
    return {
        id: 1,
        title: 'title A',
        content: 'content a',
        createTime: 1627521360068,
        author: 'aaaa'
    }
}

const newBlog=(blogData={})=>{
    console.log('newblog data...',blogData)
    return{
        id:3
    }
}

const updateBlog=(id,blogData={})=>{
    console.log('update blog',id,blogData)
    return true
}

const deleteBlog=(id)=>{
    console.log('delete blog')
    return true
}
module.exports={
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}