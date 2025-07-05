import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const productosData = [
  {
    nombre: "Laptop Ultrabook X1",
    descripcion: "Potente laptop con procesador de última generación y diseño ultradelgado, ideal para profesionales.",
    clasificacion: "Electrónica",
    precio: 1250.00,
    stock: 50,
    imagen: "https://example.com/imagen/laptop_ultrabook_x1.jpg"
  },
  {
    nombre: "Smartphone Nova Pro",
    descripcion: "Cámara triple de alta resolución, pantalla AMOLED y batería de larga duración para el día a día.",
    clasificacion: "Electrónica",
    precio: 899.99,
    stock: 120,
    imagen: "https://example.com/imagen/smartphone_nova_pro.jpg"
  },
  {
    nombre: "Teclado Mecánico RGB",
    descripcion: "Teclado gamer con switches táctiles, retroiluminación RGB personalizable y reposamuñecas ergonómico.",
    clasificacion: "Periféricos",
    precio: 85.50,
    stock: 200,
    imagen: "https://example.com/imagen/teclado_mecanico_rgb.jpg"
  },
  {
    nombre: "Mouse Inalámbrico Ergonómico",
    descripcion: "Mouse silencioso y cómodo, ideal para largas jornadas de trabajo, con conectividad Bluetooth.",
    clasificacion: "Periféricos",
    precio: 25.00,
    stock: 350,
    imagen: "https://example.com/imagen/mouse_inalambrico.jpg"
  },
  {
    nombre: "Monitor Curvo 27 pulgadas",
    descripcion: "Monitor Full HD con panel VA, tasa de refresco de 144Hz, perfecto para gaming y multimedia.",
    clasificacion: "Monitores",
    precio: 299.99,
    stock: 75,
    imagen: "https://example.com/imagen/monitor_curvo_27.jpg"
  },
  {
    nombre: "Auriculares Bluetooth Noise Cancelling",
    descripcion: "Sonido de alta fidelidad con cancelación activa de ruido, ideal para viajes y concentración.",
    clasificacion: "Audio",
    precio: 150.00,
    stock: 100,
    imagen: "https://example.com/imagen/auriculares_bluetooth.jpg"
  },
  {
    nombre: "Smartwatch Deportivo Lite",
    descripcion: "Monitor de frecuencia cardíaca, contador de pasos, notificaciones y resistencia al agua.",
    clasificacion: "Wearables",
    precio: 75.99,
    stock: 180,
    imagen: "https://example.com/imagen/smartwatch_deportivo.jpg"
  },
  {
    nombre: "Impresora Multifunción Láser",
    descripcion: "Imprime, escanea y copia con alta velocidad y eficiencia, ideal para oficina en casa.",
    clasificacion: "Impresoras",
    precio: 220.00,
    stock: 40,
    imagen: "https://example.com/imagen/impresora_laser.jpg"
  },
  {
    nombre: "Disco Duro Externo 2TB",
    descripcion: "Almacenamiento portátil de gran capacidad, con conexión USB 3.0 para transferencias rápidas.",
    clasificacion: "Almacenamiento",
    precio: 70.00,
    stock: 250,
    imagen: "https://example.com/imagen/disco_duro_externo.jpg"
  },
  {
    nombre: "Webcam Full HD con Micrófono",
    descripcion: "Ideal para videollamadas y streaming, con autoenfoque y corrección automática de luz.",
    clasificacion: "Periféricos",
    precio: 45.00,
    stock: 150,
    imagen: "https://example.com/imagen/webcam_fullhd.jpg"
  },
  {
    nombre: "Router Wi-Fi 6 de Doble Banda",
    descripcion: "Maximiza la velocidad y el alcance de tu red doméstica con la última tecnología Wi-Fi 6.",
    clasificacion: "Redes",
    precio: 95.00,
    stock: 60,
    imagen: "https://example.com/imagen/router_wifi6.jpg"
  },
  {
    nombre: "Altavoz Inteligente con Asistente",
    descripcion: "Controla tu hogar inteligente, reproduce música y obtén respuestas con comandos de voz.",
    clasificacion: "Audio",
    precio: 65.00,
    stock: 90,
    imagen: "https://example.com/imagen/altavoz_inteligente.jpg"
  },
  {
    nombre: "Tableta Gráfica Profesional",
    descripcion: "Ideal para diseñadores y artistas digitales, con alta sensibilidad a la presión y área de trabajo amplia.",
    clasificacion: "Periféricos",
    precio: 350.00,
    stock: 30,
    imagen: "https://example.com/imagen/tableta_grafica.jpg"
  },
  {
    nombre: "Cámara de Seguridad IP 1080p",
    descripcion: "Vigilancia HD con visión nocturna, detección de movimiento y acceso remoto desde el móvil.",
    clasificacion: "Seguridad",
    precio: 55.00,
    stock: 80,
    imagen: "https://example.com/imagen/camara_seguridad_ip.jpg"
  },
  {
    nombre: "Silla Gamer Ergonómica",
    descripcion: "Diseño ergonómico para largas sesiones de juego, con soporte lumbar y reposabrazos ajustables.",
    clasificacion: "Mobiliario",
    precio: 180.00,
    stock: 25,
    imagen: "https://example.com/imagen/silla_gamer.jpg"
  },
  {
    nombre: "Mochila Antirrobo para Laptop",
    descripcion: "Mochila resistente al agua con compartimentos ocultos y puerto de carga USB.",
    clasificacion: "Accesorios",
    precio: 40.00,
    stock: 110,
    imagen: "https://example.com/imagen/mochila_antirrobo.jpg"
  },
  {
    nombre: "Hub USB-C 7 en 1",
    descripcion: "Expande la conectividad de tu laptop con puertos USB, HDMI, lector de tarjetas y Ethernet.",
    clasificacion: "Accesorios",
    precio: 30.00,
    stock: 170,
    imagen: "https://example.com/imagen/hub_usbc.jpg"
  },
  {
    nombre: "Estación de Carga Inalámbrica 3 en 1",
    descripcion: "Carga tu smartphone, smartwatch y auriculares simultáneamente de forma inalámbrica.",
    clasificacion: "Accesorios",
    precio: 49.99,
    stock: 95,
    imagen: "https://example.com/imagen/estacion_carga_inalambrica.jpg"
  },
  {
    nombre: "Drone Plegable con Cámara 4K",
    descripcion: "Fácil de transportar, con cámara de alta calidad y modos de vuelo inteligente para principiantes.",
    clasificacion: "Hobbies",
    precio: 450.00,
    stock: 15,
    imagen: "https://example.com/imagen/drone_plegable.jpg"
  },
  {
    nombre: "Lector de Libros Electrónicos",
    descripcion: "Pantalla sin reflejos, luz frontal ajustable y batería de semanas de duración para la lectura.",
    clasificacion: "Lectura",
    precio: 110.00,
    stock: 65,
    imagen: "https://example.com/imagen/lector_ebooks.jpg"
  }
];

async function main() {
  console.log('Iniciando el seed...');
  for (const p of productosData) {
    await prisma.producto.create({
      data: p,
    });
  }
  console.log('Seed completado.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });