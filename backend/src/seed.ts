import { PrismaClient } from '../generated/prisma';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

const productosData = [
  {
    nombre: 'AL-1535',
    descripcion: 'Kit de accesorios AL-1535 para puertas de mueble.',
    clasificacion: 'Carros',
    precio: 12000.00,
    stock: 50,
    imagen: '/imagenes/al1535.jpg'
  },
  {
    nombre: 'Bisagra 10 cm inox',
    descripcion: 'Bisagra carrosera bronzen en acero inoxidable.',
    clasificacion: 'Bisagras',
    precio: 5000.00,
    stock: 25,
    imagen: '/imagenes/bisagrainox.jpg'
  },
  {
    nombre: 'Bisagra 13 cm doble ala',
    descripcion: 'Bisagra doble ala de 13 cm hierro forjado.',
    clasificacion: 'Bisagras',
    precio: 3500.00,
    stock: 200,
    imagen: '/imagenes/bisdobleala.jpg'
  },
  {
    nombre: 'Bisagra 20 cm',
    descripcion: 'Bisagra doble ala de 20 cm hierro forjado.',
    clasificacion: 'Bisagras',
    precio: 4000.00,
    stock: 150,
    imagen: '/imagenes/bisdobleala2.jpg'
  },
  {
    nombre: 'Carro de porton',
    descripcion: 'Carro de porton corredizo arena.',
    clasificacion: 'Carros',
    precio: 14500.00,
    stock: 10,
    imagen: '/imagenes/carroarena.jpg'
  },
  {
    nombre: 'Cerradura kallay 5002',
    descripcion: 'Cerradura para puerta corrediza kallay 5002.',
    clasificacion: 'Cerraduras',
    precio: 50000.00,
    stock: 75,
    imagen: '/imagenes/cerraduracorrediza.jpg'
  },
  {
    nombre: 'Cierra puertas',
    descripcion: 'Cierra puertas aereo.',
    clasificacion: 'Aereos',
    precio: 19000.00,
    stock: 30,
    imagen: '/imagenes/cierrapuerta.jpg'
  },
  {
    nombre: 'Falleba',
    descripcion: 'Falleba de bronce de aplicar o embutir.',
    clasificacion: 'Manijas',
    precio: 6000.00,
    stock: 80,
    imagen: '/imagenes/falleba.jpg'
  },
  {
    nombre: 'Carros para kit granero',
    descripcion: 'Par de carros para kit granero.',
    clasificacion: 'Carros',
    precio: 20000.00,
    stock: 60,
    imagen: '/imagenes/grampas.jpg'
  },
  {
    nombre: 'Kit de puerta granero',
    descripcion: 'Kit de puerta tipo granero.',
    clasificacion: 'Carros',
    precio: 49000.00,
    stock: 40,
    imagen: '/imagenes/kitgranero.jpg'
  },
  {
    nombre: 'Kit de portón corredizo',
    descripcion: 'Kit de portón corredizo Arena.',
    clasificacion: 'Carros',
    precio: 190000.00,
    stock: 20,
    imagen: '/imagenes/kitportonarena.jpg'
  },
  {
    nombre: 'Manija d/b acero inoxidable',
    descripcion: 'Manija d/b acero inoxidable Bronzen 1050.',
    clasificacion: 'Manijas',
    precio: 11000.00,
    stock: 15,
    imagen: '/imagenes/manija1050.jpg'
  },
  {
    nombre: 'Manijon forjado',
    descripcion: 'Manijon forjado para porton.',
    clasificacion: 'Manijas',
    precio: 12000.00,
    stock: 5,
    imagen: '/imagenes/manijaforjada.jpg'
  },
  {
    nombre: 'Manija NYX',
    descripcion: 'Manija d/b NYX aluminio.',
    clasificacion: 'Manijas',
    precio: 13000.00,
    stock: 2,
    imagen: '/imagenes/manijanyx.jpg'
  },
  {
    nombre: 'Manija Tropea',
    descripcion: 'Manija d/b Tropea Currao en acero inoxidable .',
    clasificacion: 'Manijas',
    precio: 24000.00,
    stock: 1,
    imagen: '/imagenes/manijatropea.jpg'
  },
  {
    nombre: 'Pasador de hierro forjado',
    descripcion: 'Pasador de hierro forjado 25 cm.',
    clasificacion: 'Pasadores',
    precio: 15000.00,
    stock: 100,
    imagen: '/imagenes/pasadorforjado.jpg'
  },
  {
    nombre: 'Pasador de chapa',
    descripcion: 'Pasador de chapa 10 cm.',
    clasificacion: 'Pasadores',
    precio: 5000.00,
    stock: 90,
    imagen: '/imagenes/pasadorchapa.jpg'
  },
  {
    nombre: 'Pasador de hierro forjado 5cm',
    descripcion: 'Pasador de hierro forjado 5 cm.',
    clasificacion: 'Pasadores',
    precio: 7500.00,
    stock: 80,
    imagen: '/imagenes/pasadores.jpg'
  },
  {
    nombre: 'Expulsor metalico',
    descripcion: 'Expulsor metalico bronzen.',
    clasificacion: 'Pasadores',
    precio: 3500.00,
    stock: 70,
    imagen: '/imagenes/poe.jpg'
  },
  {
    nombre: 'Tira de puntas',
    descripcion: 'Tira de puntas de 1 mt.',
    clasificacion: 'Manijas',
    precio: 26000.00,
    stock: 60,
    imagen: '/imagenes/puntas.jpg'
  },
  {
    nombre: 'Rueda 166',
    descripcion: 'Rueda 166 roma.',
    clasificacion: 'Carros',
    precio: 5500.00,
    stock: 50,
    imagen: '/imagenes/rueda166.jpg'
  },
  {
    nombre: 'Kit de herrajes para puerta',
    descripcion: 'Kit de cerradura, pomo y 3 bisagras para puerta.',
    clasificacion: 'Manijas',
    precio: 5000.00,
    stock: 40,
    imagen: '/imagenes/set.webp'
  }
];

async function main() {
  console.log('Iniciando el seed...');
  try {
    await prisma.producto.deleteMany({});
    for (const p of productosData) {
      console.log(`Creando producto: ${p.nombre}`);
      await prisma.producto.create({ data: p });
    }
    console.log('Seed completado.');
  } catch (e) {
    console.error('Error durante el seed:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
