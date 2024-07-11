-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2024 at 02:49 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `usermanagementdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `for_whom` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `due` date NOT NULL,
  `title` varchar(255) NOT NULL,
  `instruction` text NOT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assignments`
--

INSERT INTO `assignments` (`id`, `user_id`, `for_whom`, `department`, `due`, `title`, `instruction`, `attachment`, `created_at`, `updated_at`) VALUES
(1, 0, 'drew', '', '2024-05-23', 'try', 'try lang', 'uploads/Activity 7 – Linux Unhatched.pdf', '2024-05-21 06:33:03', '2024-05-21 06:33:03'),
(2, 0, 'drew', '', '2024-05-23', 'try 2', 'try lang', 'uploads/Eullaran_FinalCaseStudy.pdf', '2024-05-21 06:36:21', '2024-05-21 06:36:21'),
(3, 0, 'harbi', '', '2024-05-24', 'matolog', 'sleepwell', 'uploads/Quiz 4 - Linux Essentials ss.png', '2024-05-21 07:13:25', '2024-05-21 07:13:25'),
(4, 3, 'drew', '', '2024-05-23', 'try', 'tulogs', 'uploads/Screenshot 2024-05-09 142135.png', '2024-05-22 02:16:49', '2024-05-22 02:16:49');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `department` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `img_path` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `role_type` varchar(255) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `contact`, `img_path`, `password`, `status`, `role_type`) VALUES
(3, 'haein', 'eullaranczraharvey.ccs@gmail.com', '+639201691687', '', '$2y$10$VzFxuT3hp8Lun/goSzNAluHej8Fw43QSG6qNDMXyEA0kWE4XxCiTy', 1, 'admin'),
(12, 'ewan', 'ewan@gmail.com', '+639201691687', '', '$2y$10$z9.Z6fIeGD3M6UINTbtG7uA6EM3PHmDXts1aqs2dx3GMiXDjVzFxG', 1, 'user'),
(22, 'drew', 'drew@gmail.com', '+639201691687', '', '$2y$10$yE2LwyuYLYyPttLEtlCl6uaOmcJnSeYykxZgsimFo/C3HbO62uRRW', 0, 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assignments`
--
ALTER TABLE `assignments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
