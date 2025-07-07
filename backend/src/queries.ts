import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient();

async function main() {
  const nuevoProducto = await prisma.producto.create({
    data: {
      nombre: 'Taladro Eléctrico',
      descripcion: 'Taladro de alta potencia con batería recargable',
      clasificacion: 'Herramientas Eléctricas',
      precio: 14999.99,
      stock: 25,
      imagen: 'taladro.jpg',
    },
  });

  console.log('Producto creado:', nuevoProducto);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
