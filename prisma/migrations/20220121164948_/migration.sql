-- CreateTable
CREATE TABLE `medico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `crm` INTEGER NOT NULL,
    `telefone_fixo` INTEGER NOT NULL,
    `telefone_celular` INTEGER NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NULL,
    `cidade` VARCHAR(191) NULL,
    `rua` VARCHAR(191) NULL,
    `bairro` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `especialidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_especialidadeTomedico` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_especialidadeTomedico_AB_unique`(`A`, `B`),
    INDEX `_especialidadeTomedico_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_especialidadeTomedico` ADD FOREIGN KEY (`A`) REFERENCES `especialidade`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_especialidadeTomedico` ADD FOREIGN KEY (`B`) REFERENCES `medico`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
