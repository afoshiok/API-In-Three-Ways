-- CreateTable
CREATE TABLE `Barber` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `barberFirstName` VARCHAR(191) NULL,
    `barberLastName` VARCHAR(191) NULL,
    `barberPhoneNum` VARCHAR(22) NULL,
    `barberStatus` ENUM('ACTIVE', 'INACTIVE') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `custFirstName` VARCHAR(25) NULL,
    `custLastName` VARCHAR(25) NULL,
    `custPhoneNum` VARCHAR(22) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `serviceName` VARCHAR(191) NOT NULL,
    `servicePrice` DECIMAL(5, 2) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Appointment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `custId` INTEGER NOT NULL,
    `barberId` INTEGER NOT NULL,
    `apptTime` DATETIME(3) NULL,
    `serviceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_custId_fkey` FOREIGN KEY (`custId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_barberId_fkey` FOREIGN KEY (`barberId`) REFERENCES `Barber`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
