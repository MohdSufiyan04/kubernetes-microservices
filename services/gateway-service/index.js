const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = 3000;

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'gateway-service' });
});

app.use('/api/users', createProxyMiddleware({
  target: process.env.USER_SERVICE_URL || 'http://127.0.0.1:3001',
  changeOrigin: true,
  pathRewrite: { '^/api/users': '/users' },
  on: {
    error: (err, req, res) => {
      res.status(500).json({ error: 'Proxy error', details: err.message });
    }
  }
}));

app.use('/api/products', createProxyMiddleware({
  target: process.env.PRODUCT_SERVICE_URL || 'http://127.0.0.1:3002',
  changeOrigin: true,
  pathRewrite: { '^/api/products': '/products' },
  on: {
    error: (err, req, res) => {
      res.status(500).json({ error: 'Proxy error', details: err.message });
    }
  }
}));

app.listen(PORT, () => {
  console.log(`Gateway Service running on port ${PORT}`);
});