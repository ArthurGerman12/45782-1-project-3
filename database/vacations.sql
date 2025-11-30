-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Nov 30, 2025 at 06:37 PM
-- Server version: 9.5.0
-- PHP Version: 8.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--
CREATE DATABASE IF NOT EXISTS `vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `vacations`;

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `vacation_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `follows`
--

INSERT INTO `follows` (`user_id`, `vacation_id`, `created_at`, `updated_at`) VALUES
('07d3eaf6-fb90-4d7d-885b-ef8b70186a07', '31e9694a-0ef1-4060-9b7f-1cd4d93c0c37', '2025-11-29 20:29:02', '2025-11-29 20:29:02'),
('07d3eaf6-fb90-4d7d-885b-ef8b70186a07', '3b481721-2cfa-4bf5-a97f-450b67f73cec', '2025-11-29 20:28:43', '2025-11-29 20:28:43'),
('07d3eaf6-fb90-4d7d-885b-ef8b70186a07', '4a7cd2fd-ff13-4dad-82bb-d96b9a5b9fc9', '2025-11-28 19:16:18', '2025-11-28 19:16:18'),
('18b1ed99-a99a-4e4b-a88b-e39d4c85e108', '31e9694a-0ef1-4060-9b7f-1cd4d93c0c37', '2025-11-22 05:06:18', '2025-11-22 05:06:18'),
('292fcd3a-2593-48b7-bf83-d7a1b8c2e109', '3b481721-2cfa-4bf5-a97f-450b67f73cec', '2025-11-22 00:45:16', '2025-11-22 00:45:16'),
('3ab9f95c-8080-491f-8db8-937a7c1fc10a', '4a7cd2fd-ff13-4dad-82bb-d96b9a5b9fc9', '2025-11-22 00:45:16', '2025-11-22 00:45:16'),
('4d59e6cd-7e93-4c0a-92d6-44c32ea9d20b', '558ec663-3d44-4ad3-8edf-df95419a7e8e', '2025-11-22 00:45:16', '2025-11-22 00:45:16'),
('5e736ff0-2e9d-45f1-92ea-c0b1227d621c', '6c4e5c0a-0b73-4cb0-8513-9ca6f1be4b88', '2025-11-22 00:45:16', '2025-11-22 00:45:16'),
('63dc90b4-2c62-448e-8ddc-912f9da5621d', '71e9f0df-2c9d-411e-b188-8f900c05eb8e', '2025-11-22 00:45:16', '2025-11-22 00:45:16'),
('7a11b6ef-7e44-4a13-a0e0-23613839e21e', '7e1f2f67-4e10-4a1a-8b7c-1f4fd0c8a6b1', '2025-11-22 00:45:16', '2025-11-22 00:45:16'),
('89c147a0-5129-461d-8f82-748e23ebf21f', 'b184f1bb-13f6-4e77-92ad-d44da96dc8cd', '2025-11-22 00:45:16', '2025-11-22 00:45:16'),
('90f0a8bd-6c9d-4ea6-bd0d-7f19ebd1c320', 'cd94a0d3-e7c0-4f46-b726-7b92bc4a8620', '2025-11-22 00:45:16', '2025-11-22 00:45:16'),
('a122fbfb-74f6-4be2-965d-2b080b855321', 'e356d61e-09f4-4d02-b651-e8770dff8bf3', '2025-11-22 00:45:16', '2025-11-22 00:45:16'),
('b3394b90-6963-4d7e-888f-d29823a5c422', 'e68dfc8f-7a9d-4e22-bf4d-c66957d69542', '2025-11-22 00:45:16', '2025-11-22 00:45:16');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `role`, `last_name`, `email`, `password`, `created_at`, `updated_at`) VALUES
('07d3eaf6-fb90-4d7d-885b-ef8b70186a07', 'Ethan', 'user', 'Brooks', 'ethan.brooks@example.com', '8b26432374ea81ae09db2f3875e30f37d079c2aa15f5ce705107e8a43003ff86', '2025-11-22 00:24:31', '2025-11-22 00:24:31'),
('18b1ed99-a99a-4e4b-a88b-e39d4c85e108', 'Luna', 'admin', 'Silva', 'luna.silva@example.com', '8b26432374ea81ae09db2f3875e30f37d079c2aa15f5ce705107e8a43003ff86', '2025-11-22 00:24:31', '2025-11-22 00:24:31'),
('292fcd3a-2593-48b7-bf83-d7a1b8c2e109', 'Oliver', 'user', 'Martinez', 'oliver.martinez@example.com', '8b26432374ea81ae09db2f3875e30f37d079c2aa15f5ce705107e8a43003ff86', '2025-11-22 00:24:31', '2025-11-22 00:24:31'),
('3ab9f95c-8080-491f-8db8-937a7c1fc10a', 'Chloe', 'user', 'Reed', 'chloe.reed@example.com', '8b26432374ea81ae09db2f3875e30f37d079c2aa15f5ce705107e8a43003ff86', '2025-11-22 00:24:31', '2025-11-22 00:24:31'),
('4d59e6cd-7e93-4c0a-92d6-44c32ea9d20b', 'Henry', 'user', 'Fischer', 'henry.fischer@example.com', '8b26432374ea81ae09db2f3875e30f37d079c2aa15f5ce705107e8a43003ff86', '2025-11-22 00:24:31', '2025-11-22 00:24:31'),
('4f83f7ea-6a51-4f7c-a8b1-1c57db0bad01', 'Daniel', 'user', 'Rivers', 'daniel.rivers@example.com', '8b26432374ea81ae09db2f3875e30f37d079c2aa15f5ce705107e8a43003ff86', '2025-11-22 00:24:31', '2025-11-22 00:24:31'),
('5e736ff0-2e9d-45f1-92ea-c0b1227d621c', 'Zoe', 'user', 'Adams', 'zoe.adams@example.com', '8b26432374ea81ae09db2f3875e30f37d079c2aa15f5ce705107e8a43003ff86', '2025-11-22 00:24:31', '2025-11-22 00:24:31'),
('63dc90b4-2c62-448e-8ddc-912f9da5621d', 'Leo', 'user', 'Patel', 'leo.patel@example.com', '8b26432374ea81ae09db2f3875e30f37d079c2aa15f5ce705107e8a43003ff86', '2025-11-22 00:24:31', '2025-11-22 00:24:31'),
('7a11b6ef-7e44-4a13-a0e0-23613839e21e', 'Mila', 'user', 'Hassan', 'mila.hassan@example.com', '8b26432374ea81ae09db2f3875e30f37d079c2aa15f5ce705107e8a43003ff86', '2025-11-22 00:24:31', '2025-11-22 00:24:31'),
('89c147a0-5129-461d-8f82-748e23ebf21f', 'James', 'user', 'Walker', 'james.walker@example.com', '8b26432374ea81ae09db2f3875e30f37d079c2aa15f5ce705107e8a43003ff86', '2025-11-22 00:24:31', '2025-11-22 00:24:31'),
('90f0a8bd-6c9d-4ea6-bd0d-7f19ebd1c320', 'Ava', 'user', 'Nguyen', 'ava.nguyen@example.com', '8b26432374ea81ae09db2f3875e30f37d079c2aa15f5ce705107e8a43003ff86', '2025-11-22 00:24:31', '2025-11-22 00:24:31'),
('a122fbfb-74f6-4be2-965d-2b080b855321', 'Gabriel', 'user', 'Stone', 'gabriel.stone@example.com', '8b26432374ea81ae09db2f3875e30f37d079c2aa15f5ce705107e8a43003ff86', '2025-11-22 00:24:31', '2025-11-22 00:24:31'),
('b3394b90-6963-4d7e-888f-d29823a5c422', 'Ella', 'user', 'Baker', 'ella.baker@example.com', '8b26432374ea81ae09db2f3875e30f37d079c2aa15f5ce705107e8a43003ff86', '2025-11-22 00:24:31', '2025-11-22 00:24:31'),
('b5e7ea17-84f4-4c62-868d-118066f35e02', 'Maya', 'user', 'Lopez', 'maya.lopez@example.com', '8b26432374ea81ae09db2f3875e30f37d079c2aa15f5ce705107e8a43003ff86', '2025-11-22 00:24:31', '2025-11-22 00:24:31'),
('c4f3ddcc-5e80-4519-b573-fab9df4f1433', 'Jack', 'user', 'Romero', 'jack.romero@example.com', '8b26432374ea81ae09db2f3875e30f37d079c2aa15f5ce705107e8a43003ff86', '2025-11-22 00:24:31', '2025-11-22 00:24:31'),
('caa42a93-5988-41e7-b987-c8de622bd403', 'Liam', 'user', 'Turner', 'liam.turner@example.com', '8b26432374ea81ae09db2f3875e30f37d079c2aa15f5ce705107e8a43003ff86', '2025-11-22 00:24:31', '2025-11-22 00:24:31'),
('d3f831b7-d65a-4e7e-8cc3-5f4e53f63604', 'Sophie', 'user', 'Wong', 'sophie.wong@example.com', '8b26432374ea81ae09db2f3875e30f37d079c2aa15f5ce705107e8a43003ff86', '2025-11-22 00:24:31', '2025-11-22 00:24:31'),
('d50d9e3f-cb6b-4f77-97d2-a74e6d6d6544', 'Nova', 'user', 'Shaw', 'nova.shaw@example.com', '8b26432374ea81ae09db2f3875e30f37d079c2aa15f5ce705107e8a43003ff86', '2025-11-22 00:24:31', '2025-11-22 00:24:31'),
('e6987f83-41bd-4f12-9df1-ec4a5e4d3c05', 'Noah', 'user', 'Kim', 'noah.kim@example.com', '8b26432374ea81ae09db2f3875e30f37d079c2aa15f5ce705107e8a43003ff86', '2025-11-22 00:24:31', '2025-11-22 00:24:31'),
('ff29d5c2-f93b-4b8c-bd15-60d6427cc606', 'Aria', 'user', 'Cohen', 'aria.cohen@example.com', '8b26432374ea81ae09db2f3875e30f37d079c2aa15f5ce705107e8a43003ff86', '2025-11-22 00:24:31', '2025-11-22 00:24:31');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacation_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `destination` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `price` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacation_id`, `destination`, `description`, `start_date`, `end_date`, `price`, `created_at`, `updated_at`, `image`) VALUES
('2fc2032b-3736-46bf-b665-6d0700f8fedf', 'PHUKET, THAILAND', 'A beach paradise offering clear waters, exciting excursions, flavorful cuisine, and peaceful island life.', '2026-11-10 00:00:00', '2026-11-18 00:00:00', 2100, '2025-11-22 00:28:54', '2025-11-30 08:58:05', 'http://localhost:4566/vacation-images/e49e1f25-5f6b-4b45-9a02-912a5b3a0ab0.jpg'),
('31e9694a-0ef1-4060-9b7f-1cd4d93c0c37', 'CAPE TOWN, SOUTH AFRICA', 'A scenic destination offering mountains, wildlife, beautiful coastlines, and unforgettable outdoor activities.', '2026-01-15 00:00:00', '2026-01-25 00:00:00', 2700, '2025-11-22 00:28:54', '2025-11-30 09:00:51', 'http://localhost:4566/vacation-images/7cae1d8f-efc7-421a-a747-0513fb97a06a.jpeg'),
('3b481721-2cfa-4bf5-a97f-450b67f73cec', 'ROME, ITALY', 'A historical city filled with ancient ruins, delicious cuisine, art, and warm Mediterranean atmosphere.', '2025-11-30 00:00:00', '2025-12-24 00:00:00', 2000, '2025-11-22 00:28:54', '2025-11-30 09:01:03', 'http://localhost:4566/vacation-images/36db2504-2265-4c41-8868-a9587c08d409.jpg'),
('4a7cd2fd-ff13-4dad-82bb-d96b9a5b9fc9', 'BALI, INDONESIA', 'A tropical destination with lush jungles, peaceful temples, scenic beaches, and relaxing island vibes all year.', '2026-06-01 00:00:00', '2026-06-10 00:00:00', 2200, '2025-11-22 00:28:54', '2025-11-30 09:01:17', 'http://localhost:4566/vacation-images/3986c326-c16e-4fb1-bf6e-5bd703da9341.jpg'),
('558ec663-3d44-4ad3-8edf-df95419a7e8e', 'REYKJAVIK, ICELAND', 'A Nordic adventure destination known for waterfalls, volcanoes, glaciers, and stunning northern landscapes.', '2026-02-10 00:00:00', '2026-02-17 00:00:00', 3100, '2025-11-22 00:28:54', '2025-11-30 09:01:24', 'http://localhost:4566/vacation-images/476521c1-bb6b-4f1d-9691-336d30f89250.jpeg'),
('6c4e5c0a-0b73-4cb0-8513-9ca6f1be4b88', 'TOKYO, JAPAN', 'A vibrant modern city filled with neon streets, incredible food culture, and unique attractions travelers love.', '2026-05-05 00:00:00', '2026-05-15 00:00:00', 2400, '2025-11-22 00:28:54', '2025-11-30 09:01:30', 'http://localhost:4566/vacation-images/0821301e-6daf-4481-a53d-e204889caab3.jpg'),
('71e9f0df-2c9d-411e-b188-8f900c05eb8e', 'ZURICH, SWITZERLAND', 'A gorgeous European city surrounded by lakes and mountains, perfect for scenic and relaxing vacations.', '2026-12-05 00:00:00', '2026-12-12 00:00:00', 3500, '2025-11-22 00:28:54', '2025-11-30 09:01:37', 'http://localhost:4566/vacation-images/00834321-9925-4013-bd71-d91f88ef3f0b.jpeg'),
('7e1f2f67-4e10-4a1a-8b7c-1f4fd0c8a6b1', 'RHODES, GREECE', 'A relaxing island escape known for historic ruins, crystal waters, and sunny beaches perfect for week-long vacations.', '2026-04-10 00:00:00', '2026-04-17 00:00:00', 1800, '2025-11-22 00:28:54', '2025-11-30 09:01:44', 'http://localhost:4566/vacation-images/c9229a9e-2e23-4b39-83e3-d43a7d06aaa5.jpg'),
('b184f1bb-13f6-4e77-92ad-d44da96dc8cd', 'PARIS, FRANCE', 'A romantic European city filled with iconic sights, cafes, museums, and charming neighborhoods to explore.', '2026-03-20 00:00:00', '2026-03-27 00:00:00', 2600, '2025-11-22 00:28:54', '2025-11-30 09:01:58', 'http://localhost:4566/vacation-images/99ac9536-9140-49e4-a6d1-a3f445969c6a.jpg'),
('cd94a0d3-e7c0-4f46-b726-7b92bc4a8620', 'NEW YORK, USA', 'A bustling city offering iconic landmarks, diverse food, Broadway shows, and endless cultural experiences.', '2026-08-01 00:00:00', '2026-08-08 00:00:00', 2300, '2025-11-22 00:28:54', '2025-11-30 09:02:07', 'http://localhost:4566/vacation-images/1f919294-8469-47d3-ab19-3b00ebded27a.jpg'),
('e356d61e-09f4-4d02-b651-e8770dff8bf3', 'SYDNEY, AUSTRALIA', 'A coastal city famous for the Sydney Opera House, beaches, wildlife, and unforgettable outdoor adventures.', '2026-07-10 00:00:00', '2026-07-20 00:00:00', 2900, '2025-11-22 00:28:54', '2025-11-30 09:02:15', 'http://localhost:4566/vacation-images/83319143-e396-4fff-a16e-d6a37f953aa6.jpg'),
('e68dfc8f-7a9d-4e22-bf4d-c66957d69542', 'BARCELONA, SPAIN', 'A vibrant coastal city with unique architecture, warm beaches, delicious tapas, and lively cultural events.', '2026-04-18 00:00:00', '2026-04-26 00:00:00', 1900, '2025-11-22 00:28:54', '2025-11-30 09:02:24', 'http://localhost:4566/vacation-images/44a73ee5-8823-4715-9ba1-e1c6fedd702a.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`user_id`,`vacation_id`),
  ADD UNIQUE KEY `follows_vacationId_userId_unique` (`user_id`,`vacation_id`),
  ADD KEY `vacation_id` (`vacation_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacation_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`vacation_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
