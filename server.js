const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

console.log('Starting server on port:', PORT);

app.get('/', (req, res) => {
  res.send('FoodSave Server Running!');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
