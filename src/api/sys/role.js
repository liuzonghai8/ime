import { stringify } from 'qs'

//根据Id查找
export async function fetchObj (param) {
    return await axios.request({
        method: 'get',
        url: 'upms/sys/menu/' + param
    })
}

//获取menuTree
export async function getMenuTree () {
    return await axios.request({
        method: 'get',
        url: 'upms/sys/menu/tree'
    })
}

//删除
export async function deleteObj (param) {
    return await axios.request({
        method: 'delete',
        url: 'upms/sys/menu/' + param
    })
}

//添加
export async function addObj (param) {
    return await axios.request({
        method: 'post',
        url: 'upms/sys/menu/',
        data: stringify(param)//param
    })
}
//更新
export async function putObj (param) {
    return await axios.request({
        method: 'put',
        url: 'upms/sys/menu/',
        data: stringify(param)
    })
}