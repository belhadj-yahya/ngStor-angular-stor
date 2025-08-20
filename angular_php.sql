-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 20, 2025 at 12:35 PM
-- Server version: 8.4.3
-- PHP Version: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `angular_php`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `order_date` date NOT NULL,
  `order_status` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `order_date`, `order_status`) VALUES
(2, 1, '2025-08-15', 'done'),
(15, 6, '2025-08-18', 'pending'),
(17, 1, '2025-08-18', 'pending'),
(18, 14, '2025-08-19', 'pending'),
(19, 6, '2025-08-19', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `details_id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `amount` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`details_id`, `order_id`, `product_id`, `amount`) VALUES
(2, 2, 2, 2),
(3, 2, 5, 1),
(19, 15, 2, 1),
(20, 15, 5, 1),
(22, 17, 13, 1),
(23, 18, 4, 1),
(24, 18, 6, 1),
(25, 19, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `product_name` varchar(200) DEFAULT NULL,
  `product_price` decimal(10,2) DEFAULT NULL,
  `product_quantity` int DEFAULT NULL,
  `out_of_order` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `user_id`, `product_name`, `product_price`, `product_quantity`, `out_of_order`) VALUES
(1, 1, 'usb', 20.20, 0, 'Yes'),
(2, 2, 'Laptop Backpack', 35.50, 5, 'No'),
(3, 1, 'shorts', 100.00, 50, 'Yes'),
(4, 3, 'Smart LED Desk Lamp', 28.00, 61, 'No'),
(5, 2, 'Portable Power Bank', 45.00, 104, 'No'),
(6, 4, 'Noise-Canceling Headphones', 129.99, 38, 'No'),
(7, 3, 'Mechanical Keyboard', 89.99, 0, 'Yes'),
(9, 4, 'HDMI to VGA Adapter', 19.99, 5, 'No'),
(13, 6, 'gaming Pc', 2000.20, 2, 'No'),
(14, 1, 'table', 100.40, 3, 'No'),
(15, 1, 'mouse', 150.00, 10, 'No'),
(16, 1, 'T-shirt', 50.50, 20, 'No'),
(17, 6, 'boots', 120.50, 4, 'No');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `user_f_name` varchar(100) DEFAULT NULL,
  `user_l_name` varchar(100) DEFAULT NULL,
  `user_email` varchar(225) DEFAULT NULL,
  `user_password` varchar(225) DEFAULT NULL,
  `role` varchar(225) NOT NULL,
  `blooked` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_f_name`, `user_l_name`, `user_email`, `user_password`, `role`, `blooked`) VALUES
(1, 'John', 'Doe', 'john.doe@example.com', '$2y$10$KZ216DBy9HArKQ2t.HE30udzm70X4wQlW6b9FGX08eCWb3N1jIiUS', 'client', 'No'),
(2, 'Jane', 'Smith', 'jane.smith@example.com', '$2y$10$zByfnShx698x08iBS3q02ucjZbDVgFKM20Ez6oJmWJpsl3tlk/8Y2', 'client', 'No'),
(3, 'Alice', 'Johnson', 'alice.johnson@example.com', '$2y$10$fU9LPyNttfY/9xndSWhQL.dwj6jtQY/vPlCTpYnJpiwc.P8a9VQFG', 'client', 'No'),
(4, 'Bob', 'Brown', 'bob.brown@example.com', '$2y$10$m0NwrYzGd9fNjkPZVmGlgePGXmnOaJX6iayb7tQqP5gsHKvK6zHOO', 'client', 'No'),
(5, 'yahya', 'belhadj', 'yahya@gmail.com', '$2y$10$qHs7jCEC/8d2hbgsyIYYluVLgb3l7RuleZmlDZGOE71v5DF956x6W', 'admin', 'No'),
(6, 'sami', 'belhadj', 'sami@gmail.com', '$2y$10$kive.rLBafdZ59JsBAJ1.uS9Krjju1K3M.3UW0fRAKzIku4VdhLYO', 'client', 'Yes'),
(14, 'brahim', 'taib', 'brahim@gmail.com', '$2y$10$Wn9nycGzO3/.muuYW.pLmu7tzW/Sn.79c6r.cHWBRWpwrE9B./3ri', 'client', 'No');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`details_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `details_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
