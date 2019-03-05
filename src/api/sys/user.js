import { stringify } from 'qs'

//查询 分页
export async function fetchObjs2 (params) {
    console.log(params)
    return await axios.request({
        method: 'get',
        url: 'upms/sys/user/page',
        data: stringify(params)
    })
}

export function fetchObjs (params) {
    console.log(params)
    return axios.request({
        method: 'get',
        url: 'upms/sys/user/page',
        data: stringify(params)
    })
}

//根据Id查询
export async function getObj (id) {
    return await axios.request({
        method: 'get',
        url: 'upms/sys/user/' + id,
    })
}

//删除
export async function deleteObj (param) {
    return await axios.request({
        method: 'delete',
        url: 'upms/sys/user/' + param
    })
}

//添加
export async function addObj (param) {
    return await axios.request({
        method: 'post',
        url: '/upms/sys/user',
        data: stringify(param)//param
    })
}
//更新
export async function putObj (param) {
    return await axios.request({
        method: 'put',
        url: '/upms/sys/user',
        data: stringify(param)
    })
}