/*
  Warnings:

  - Added the required column `imagen` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Producto" ADD COLUMN     "imagen" TEXT NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL;


-- Agregar productos 
INSERT INTO "Producto" ("nombre", "descripcion", "clasificacion", "precio", "stock", "imagen") VALUES
  ('AL-1535', 'Kit de accesorios AL-1535 para puertas de mueble.', 'Carros', 12000.00, 50,'/imagenes/al1535.jpg'),
  ('Bisagra 10 cm inox', 'Bisagra carrosera bronzen en acero inoxidable.', 'Bisagras', 5000.00, 25,'/imagenes/bisagrainox.jpg'),
  ('Bisagra 13 cm doble ala', 'Bisagra doble ala de 13 cm hierro forjado.', 'Bisagras', 3500.00, 200, '/imagenes/bisdobleala.jpg'),
  ('Bisagra 20 cm', 'Bisagra doble ala de 20 cm hierro forjado.', 'Bisagras', 4000.00, 150, '/imagenes/bisdobleala2.jpg'),
  ('Carro de porton', 'Carro de porton corredizo arena.', 'Carros', 14500.00, 10, '/imagenes/carroarena.jpg'),
  ('Cerradura kallay 5002', 'Cerradura para puerta corrediza kallay 5002.', 'Cerraduras', 50000.00, 75, '/imagenes/cerraduracorrediza.jpg'),
  ('Cierra puertas', 'Cierra puertas aereo.', 'Aereos', 19000.00, 30, '/imagenes/cierrapuerta.jpg'),
  ('Falleba', 'Falleba de bronce de aplicar o embutir.', 'Manijas', 6000.00, 80, '/imagenes/falleba.jpg'),
  ('Carros para kit granero', 'Par de carros para kit granero.', 'Carros', 20000.00, 60, '/imagenes/grampas.jpg'),
  ('Kit de puerta granero', 'Kit de puerta tipo granero.', 'Carros', 49000.00, 40, '/imagenes/kitgranero.jpg'),
  ('Kit de portón corredizo', 'Kit de portón corredizo Arena.', 'Carros', 190000.00, 20, '/imagenes/kitportonarena.jpg'),
  ('Manija d/b acero inoxidable', 'Manija d/b acero inoxidable Bronzen 1050.', 'Manijas', 11000.00, 15, '/imagenes/manija1050.jpg'),
  ('Manijon forjado', 'Manijon forjado para porton.', 'Manijas', 12000.00, 5, '/imagenes/manijaforjada.jpg'),
  ('Manija NYX', 'Manija d/b NYX aluminio.', 'Manijas', 13000.00, 2, '/imagenes/manijanyx.jpg'),
  ('Manija Tropea', 'Manija d/b Tropea Currao en acero inoxidable .', 'Manijas', 24000.00, 1, '/imagenes/manijatropea.jpg'),
  ('Pasador de hierro forjado', 'Pasador de hierro forjado 25 cm.', 'Pasadores', 15000.00, 100, '/imagenes/pasadorforjado.jpg'),
  ('Pasador de chapa', 'Pasador de chapa 10 cm.', 'Pasadores', 5000.00, 90, '/imagenes/pasadorchapa.jpg'),
  ('Pasador de hierro forjado 5cm', 'Pasador de hierro forjado 5 cm.', 'Pasadores', 7500.00, 80, '/imagenes/pasadores.jpg'),
  ('Expulsor metalico', 'Expulsor metalico bronzen.', 'Pasadores', 3500.00, 70, '/imagenes/poe.jpg'),
  ('Tira de puntas', 'Tira de puntas de 1 mt.', 'Manijas', 26000.00, 60, '/imagenes/puntas.jpg'),
  ('Rueda 166', 'Rueda 166 roma.', 'Carros', 5500.00, 50, '/imagenes/rueda166.jpg'),
  ('Kit de herrajes para puerta', 'Kit de cerradura, pomo y 3 bisagras para puerta.', 'Manijas', 5000.00, 40, '/imagenes/set.webp');
