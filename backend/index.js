const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());

app.get('/api/hello', (req, res) => {
  res.json({ mensaje: 'Hola desde Node.js' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
