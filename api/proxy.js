// api/proxy.js
import { createProxyMiddleware } from 'http-proxy-middleware';

const proxyHandler = (req, res) => {
    let target = '';
    // 根据请求路径，设置代理目标地址
    if (req.url.startsWith('/backend')) {
        target = 'http://139.9.87.80:8080'; // 替换成实际的 API 地址
    }
    console.log("我被重写了", target);
    // 使用代理中间件转发请求
    createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: {
            '^/backend/': '/', // 重写路径，把 `/backend` 移除
        },
    })(req, res);
};

export default proxyHandler;