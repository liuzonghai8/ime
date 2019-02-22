module.exports = {
    //默认 @ 指向src目录
    devServer: {
        host: '192.168.1.106',
        port: '3030',
        overlay: {
            warnings: false,
            errors: false
        },
    }
}
// module.exports = {
//     devServer: {
//         // 设置主机地址
//         host: 'localhost',
//         // 设置默认端口
//         port: 8080,
//         // 设置代理
//         proxy: {
//             '/api': {
//                 // 目标 API 地址
//                 target: 'https://www.baidu.com',
//                 // 如果要代理 websockets
//                 ws: true,
//                 // 将主机标头的原点更改为目标URL
//                 changeOrigin: true
//             }
//         }
//     }
// }
