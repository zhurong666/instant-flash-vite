// api/proxy.js
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (req, res) => {
    console.log("我被重写了")
    let target = ''
    // 根据请求路径，设置代理目标地址
    if (req.url.startsWith('/backend')) {
        target = 'http://139.9.87.80:8080' // 替换成实际的 API 地址
    }

    // 使用代理中间件转发请求
    createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: {
            '^/backend/': '/', // 重写路径，把 `/backend` 移除
        },
    })(req, res)
}
