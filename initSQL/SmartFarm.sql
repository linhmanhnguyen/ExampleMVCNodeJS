CREATE TABLE `province` (
  `province_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(64)
);

CREATE TABLE `district` (
  `district_id` int PRIMARY KEY AUTO_INCREMENT,
  `province_id` int,
  `name` varchar(64)
);

CREATE TABLE `wards` (
  `wards_id` int PRIMARY KEY AUTO_INCREMENT,
  `district_id` int,
  `name` varchar(64)
);

CREATE TABLE `roles` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `roleName` varchar(255)
);

CREATE TABLE `user_accounts` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255),
  `password` varchar(255),
  `createDate` datetime,
  `userDetail_id` int,
  `refreshToken` varchar(255)
);

CREATE TABLE `user_details` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `fullName` varchar(255),
  `dateOfBirth` date,
  `gender` varchar(255),
  `citizenIdentification_id` varchar(255),
  `ward_id` int,
  `addressDetail` text,
  `email` varchar(255),
  `phoneNumber` varchar(255)
);

CREATE TABLE `user_roles` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `userAccount_id` int,
  `role_id` int,
  `createDate` datetime,
  `status` boolean
);

CREATE TABLE `user_farms` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `userAccount_id` int,
  `farm_id` int,
  `createDate` datetime,
  `status` boolean
);

CREATE TABLE `animal_types` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `typeName` varchar(255),
  `imgPath` varchar(255)
);

CREATE TABLE `farms` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `farmName` varchar(255),
  `creationDate` datetime,
  `status` boolean,
  `animalType_id` int,
  `animalDensity` int,
  `ward_id` int,
  `addressDetail` text,
  `lastModified` datetime
);

CREATE TABLE `cages` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `cageName` varchar(255),
  `farm_id` int,
  `location` varchar(255),
  `manager_id` int
);

CREATE TABLE `animals` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `cage_id` int,
  `type` varchar(255),
  `genderAnimal` varchar(255),
  `weight` float,
  `entryDate` datetime,
  `status` enum('normal','sick','dead','') 
);

CREATE TABLE `cage_employees` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `cage_id` int,
  `employee_id` int,
  `dateStart` datetime,
  `status` boolean,
  `lastModified` datetime
);

CREATE TABLE `supplies` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `supplyName` varchar(255),
  `unitPrice` double
);

CREATE TABLE `foods` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `foodName` varchar(255),
  `description` text,
  `manufacturer` varchar(255),
  `instructions` text,
  `netWeight` float,
  `unit_id` int
);

CREATE TABLE `farm_foods` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `farm_id` int,
  `food_id` int,
  `originalQuantity` int,
  `currentQuantity` int
);

CREATE TABLE `history_buy_foods` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `food_id` int,
  `user_id` int,
  `quantity` int,
  `unitPrice` float,
  `totalPrice` float,
  `dateAction` datetime
);

CREATE TABLE `type_medicines` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `typeName` int
);

CREATE TABLE `medicines` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `medicineName` varchar(255),
  `typeMedicine_id` int,
  `description` text,
  `manufacturer` varchar(255),
  `instructions` text,
  `netWeight` float,
  `unit_id` int
);

CREATE TABLE `history_buy_medicines` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `medicine_id` int,
  `user_id` int,
  `quantity` int,
  `unitPrice` float,
  `totalPrice` float,
  `dateAction` datetime
);

CREATE TABLE `farm_medicines` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `farm_id` int,
  `medicine_id` int,
  `originalQuantity` int,
  `currentQuantity` int
);

CREATE TABLE `history_animal_death` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `animal_id` int,
  `employee_id` int,
  `typeCause` varchar(255),
  `reason` text,
  `dateOccurrence` datetime
);

CREATE TABLE `history_animal_weight` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `typeAction` varchar(255),
  `animal_id` int,
  `employee_id` int,
  `weight` float,
  `content` text,
  `dateAction` datetime
);

CREATE TABLE `history_animal_food` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `typeAction` varchar(255),
  `animal_id` int,
  `employee_id` int,
  `food_id` int,
  `foodAmount` float,
  `unit_id` int,
  `content` text,
  `dateAction` datetime
);

CREATE TABLE `history_animal_medicine` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `typeAction` varchar(255),
  `animal_id` int,
  `employee_id` int,
  `medicine_id` int,
  `dosage` float,
  `unit_id` int,
  `content` text,
  `dateAction` datetime
);

CREATE TABLE `history_animal_transfer_cage` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `animal_id` int,
  `originalCage_id` int,
  `transferCage_id` int,
  `employee_id` int,
  `content` text,
  `dateAction` datetime
);

CREATE TABLE `history_cage_entry` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `farm_id` int,
  `typeAnimal_id` int,
  `animalQuantity` int,
  `weightOfAnimal` float,
  `unitPrice` float,
  `dateAction` datetime,
  `supplier_id` int,
  `event_id` int
);

CREATE TABLE `suppliers` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `phone` varchar(255),
  `ward_id` int,
  `addressDetail` text
);

CREATE TABLE `units` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(25)
);

CREATE TABLE `events` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `startDate` datetime,
  `endDate` datetime,
  `status` boolean,
  `farm_id` int
);

ALTER TABLE `user_accounts` ADD FOREIGN KEY (`userDetail_id`) REFERENCES `user_details` (`id`);

ALTER TABLE `user_details` ADD FOREIGN KEY (`ward_id`) REFERENCES `wards` (`wards_id`);

ALTER TABLE `user_roles` ADD FOREIGN KEY (`userAccount_id`) REFERENCES `user_accounts` (`id`);

ALTER TABLE `user_roles` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

ALTER TABLE `user_farms` ADD FOREIGN KEY (`userAccount_id`) REFERENCES `user_accounts` (`id`);

ALTER TABLE `user_farms` ADD FOREIGN KEY (`farm_id`) REFERENCES `farms` (`id`);

ALTER TABLE `farms` ADD FOREIGN KEY (`animalType_id`) REFERENCES `animal_types` (`id`);

ALTER TABLE `farms` ADD FOREIGN KEY (`ward_id`) REFERENCES `wards` (`wards_id`);

ALTER TABLE `cages` ADD FOREIGN KEY (`farm_id`) REFERENCES `farms` (`id`);

ALTER TABLE `cages` ADD FOREIGN KEY (`manager_id`) REFERENCES `user_accounts` (`id`);

ALTER TABLE `animals` ADD FOREIGN KEY (`cage_id`) REFERENCES `cages` (`id`);

ALTER TABLE `cage_employees` ADD FOREIGN KEY (`cage_id`) REFERENCES `cages` (`id`);

ALTER TABLE `cage_employees` ADD FOREIGN KEY (`employee_id`) REFERENCES `user_accounts` (`id`);

ALTER TABLE `foods` ADD FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`);

ALTER TABLE `farm_foods` ADD FOREIGN KEY (`farm_id`) REFERENCES `farms` (`id`);

ALTER TABLE `farm_foods` ADD FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`);

ALTER TABLE `history_buy_foods` ADD FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`);

ALTER TABLE `history_buy_foods` ADD FOREIGN KEY (`user_id`) REFERENCES `user_accounts` (`id`);

ALTER TABLE `medicines` ADD FOREIGN KEY (`typeMedicine_id`) REFERENCES `type_medicines` (`id`);

ALTER TABLE `medicines` ADD FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`);

ALTER TABLE `history_buy_medicines` ADD FOREIGN KEY (`medicine_id`) REFERENCES `medicines` (`id`);

ALTER TABLE `history_buy_medicines` ADD FOREIGN KEY (`user_id`) REFERENCES `user_accounts` (`id`);

ALTER TABLE `farm_medicines` ADD FOREIGN KEY (`farm_id`) REFERENCES `farms` (`id`);

ALTER TABLE `farm_medicines` ADD FOREIGN KEY (`medicine_id`) REFERENCES `medicines` (`id`);

ALTER TABLE `history_animal_death` ADD FOREIGN KEY (`animal_id`) REFERENCES `animals` (`id`);

ALTER TABLE `history_animal_death` ADD FOREIGN KEY (`employee_id`) REFERENCES `user_accounts` (`id`);

ALTER TABLE `history_animal_weight` ADD FOREIGN KEY (`animal_id`) REFERENCES `animals` (`id`);

ALTER TABLE `history_animal_weight` ADD FOREIGN KEY (`employee_id`) REFERENCES `user_accounts` (`id`);

ALTER TABLE `history_animal_food` ADD FOREIGN KEY (`animal_id`) REFERENCES `animals` (`id`);

ALTER TABLE `history_animal_food` ADD FOREIGN KEY (`employee_id`) REFERENCES `user_accounts` (`id`);

ALTER TABLE `history_animal_food` ADD FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`);

ALTER TABLE `history_animal_food` ADD FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`);

ALTER TABLE `history_animal_medicine` ADD FOREIGN KEY (`animal_id`) REFERENCES `animals` (`id`);

ALTER TABLE `history_animal_medicine` ADD FOREIGN KEY (`employee_id`) REFERENCES `user_accounts` (`id`);

ALTER TABLE `history_animal_medicine` ADD FOREIGN KEY (`medicine_id`) REFERENCES `medicines` (`id`);

ALTER TABLE `history_animal_medicine` ADD FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`);

ALTER TABLE `history_animal_transfer_cage` ADD FOREIGN KEY (`animal_id`) REFERENCES `animals` (`id`);

ALTER TABLE `history_animal_transfer_cage` ADD FOREIGN KEY (`originalCage_id`) REFERENCES `cages` (`id`);

ALTER TABLE `history_animal_transfer_cage` ADD FOREIGN KEY (`transferCage_id`) REFERENCES `cages` (`id`);

ALTER TABLE `history_animal_transfer_cage` ADD FOREIGN KEY (`employee_id`) REFERENCES `user_accounts` (`id`);

ALTER TABLE `history_cage_entry` ADD FOREIGN KEY (`user_id`) REFERENCES `user_accounts` (`id`);

ALTER TABLE `history_cage_entry` ADD FOREIGN KEY (`farm_id`) REFERENCES `farms` (`id`);

ALTER TABLE `history_cage_entry` ADD FOREIGN KEY (`typeAnimal_id`) REFERENCES `animal_types` (`id`);

ALTER TABLE `history_cage_entry` ADD FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`);

ALTER TABLE `history_cage_entry` ADD FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

ALTER TABLE `suppliers` ADD FOREIGN KEY (`ward_id`) REFERENCES `wards` (`wards_id`);

ALTER TABLE `events` ADD FOREIGN KEY (`farm_id`) REFERENCES `farms` (`id`);
