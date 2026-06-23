const express = require('express');
const app = express();
const PORT = 3002;

const products = [
  { id: 1, name: "Laptop", price: 999, category: "Electronics" },
  { id: 2, name: "Keyboard", price: 79, category: "Electronics" },
  { id: 3, name: "Monitor", price: 299, category: "Electronics" }
];

// Health check — Kubernetes pings this to know service is alive
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'product-service' });
});

// Get all products
app.get('/products', (req, res) => {
  res.json({
    service: 'product-service',
    data: products
  });
});

// Get product by ID
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json({ service: 'product-service', data: product });
});

app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});