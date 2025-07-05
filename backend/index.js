
//como comento todo el codigo?
// Para comentar todo el código en un archivo JavaScript, puedes usar comentarios de bloque.


/*const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const port = 3000;
const cors = require('cors');

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Endpoint de prueba
app.get('/api/hello', (req, res) => {
  res.json({ mensaje: 'Hola desde Node.js' });
});

// Obtener todos los productos
app.get('/api/productos', async (req, res) => {
  try {
    const productos = await prisma.producto.findMany();
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener un producto por ID
app.get('/api/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await prisma.producto.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json(producto);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
})*/
