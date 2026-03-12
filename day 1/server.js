const express = require('express');

const app = express();
const PORT = 3000;

// Basic GET route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Error handling for server startup
const server = app.listen(PORT, (error) => {
  if (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
  console.log(`Express server running on port ${PORT}`);
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
  process.exit(1);
});

module.exports = app;