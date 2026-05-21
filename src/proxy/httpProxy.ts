import { createProxyMiddleware, Options } from 'http-proxy-middleware';

export function createServiceProxy(target: string, pathRewrite?: Record<string, string>) {
  const options: Options = {
    target,
    changeOrigin: true,
    pathRewrite,
    on: {
      proxyReq: (proxyReq, req) => {
        const requestId = req.headers['x-request-id'];
        if (requestId) proxyReq.setHeader('x-request-id', requestId);
        if ((req as any).user) {
          proxyReq.setHeader('x-user-id', (req as any).user.id);
          proxyReq.setHeader('x-user-role', (req as any).user.role);
        }
      },
    },
  };
  return createProxyMiddleware(options);
}
