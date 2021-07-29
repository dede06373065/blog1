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
module.exports={
    getList
}