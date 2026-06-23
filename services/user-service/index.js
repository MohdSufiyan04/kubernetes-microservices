const express = require('express');
const app = express();
const PORT = 3001;

// Simple in-memory data — no database needed for this project
const users = [
  { id: 1, name: "Mohd Sufiyan", role: "DevOps Engineer" },
  { id: 2, name: "John Doe", role: "Developer" },
  { id: 3, name: "Jane Smith", role: "Cloud Architect" }
];

// Health check endpoint — Kubernetes uses this to know if app is alive
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'user-service' });
});

// Get all users
app.get('/users', (req, res) => {
  res.json({
    service: 'user-service',
    data: users
  });
});

// Get user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ service: 'user-service', data: user });
});

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});