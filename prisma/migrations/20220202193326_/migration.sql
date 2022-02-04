/*
  Warnings:

  - You are about to drop the `_especialidadeTomedico` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nome]` on the table `especialidade` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `_especialidadeTomedico` DROP FOREIGN KEY `_especialidadeTomedico_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_especialidadeTomedico` DROP FOREIGN KEY `_especialidadeTomedico_ibfk_2`;

-- AlterTable
ALTER TABLE `medico` ADD COLUMN `deletado` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `_especialidadeTomedico`;

-- CreateTable
CREATE TABLE `_especialidadetomedico` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_especialidadetomedico_AB_unique`(`A`, `B`),
    INDEX `_especialidadetomedico_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `especialidade_nome_key` ON `especialidade`(`nome`);

-- AddForeignKey
ALTER TABLE `_especialidadetomedico` ADD FOREIGN KEY (`A`) REFERENCES `especialidade`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_especialidadetomedico` ADD FOREIGN KEY (`B`) REFERENCES `medico`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
