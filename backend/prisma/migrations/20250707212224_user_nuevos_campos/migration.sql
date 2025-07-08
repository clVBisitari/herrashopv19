/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `ciudad` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigo_postal` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `direccion` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pais` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "createdAt",
ADD COLUMN     "ciudad" TEXT NOT NULL,
ADD COLUMN     "codigo_postal" TEXT NOT NULL,
ADD COLUMN     "direccion" TEXT NOT NULL,
ADD COLUMN     "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "pais" TEXT NOT NULL,
ADD COLUMN     "rol" TEXT NOT NULL DEFAULT 'user',
ADD COLUMN     "telefono" INTEGER NOT NULL;

INSERT INTO "Usuario" (
  nombre,
  email,
  password,
  telefono,
  direccion,
  ciudad,
  pais,
  codigo_postal,
  fecha_registro,
  rol
)
VALUES
(
  'Juan Pérez',
  'juan.perez@example.com',
  '$2b$10$eW5cIhFjGyN8/U91lOqK5.dVnA7xQYv84PMbyA3HZJzboTxZyuvUy', -- contraseña: "123456"
  1133445566,
  'Calle Falsa 123',
  'Buenos Aires',
  'Argentina',
  '1001',
  CURRENT_TIMESTAMP,
  'user'
),
(
  'Ana González',
  'ana.gonzalez@example.com',
  '$2b$10$4vY3QOkH50EAGI1EZaPLcujX81/miT5z9M8BhJYoK6HiUgcuv1Hfa', -- contraseña: "admin123"
  1199887766,
  'Av. Siempreviva 742',
  'Córdoba',
  'Argentina',
  '5000',
  CURRENT_TIMESTAMP,
  'admin'
);
