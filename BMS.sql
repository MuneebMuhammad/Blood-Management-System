-- MySQL dump 10.13  Distrib 8.0.27, for macos11 (x86_64)
--
-- Host: localhost    Database: wep
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blood`
--

DROP TABLE IF EXISTS `blood`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blood` (
  `blood_id` int NOT NULL AUTO_INCREMENT,
  `blood_type_id` int NOT NULL,
  `submission_date` datetime NOT NULL,
  `expiration_date` datetime NOT NULL,
  `hid` int NOT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`blood_id`),
  UNIQUE KEY `blood_id_UNIQUE` (`blood_id`),
  KEY `hid_idx` (`hid`),
  KEY `blood_type_id_idx` (`blood_type_id`),
  CONSTRAINT `blood_ibfk_1` FOREIGN KEY (`hid`) REFERENCES `hospitals` (`h_id`) ON UPDATE CASCADE,
  CONSTRAINT `bloodtype_id` FOREIGN KEY (`blood_type_id`) REFERENCES `bloodtypes` (`bloodtype_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bloodtypes`
--

DROP TABLE IF EXISTS `bloodtypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bloodtypes` (
  `bloodtype_id` int NOT NULL AUTO_INCREMENT,
  `blood_type` varchar(3) NOT NULL,
  PRIMARY KEY (`bloodtype_id`),
  UNIQUE KEY `bloodtype_id_UNIQUE` (`bloodtype_id`),
  UNIQUE KEY `blood_type_UNIQUE` (`blood_type`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `care`
--

DROP TABLE IF EXISTS `care`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `care` (
  `care_id` int NOT NULL AUTO_INCREMENT,
  `care_name` varchar(45) NOT NULL,
  PRIMARY KEY (`care_id`),
  UNIQUE KEY `care_id_UNIQUE` (`care_id`),
  UNIQUE KEY `care_name_UNIQUE` (`care_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hospitals`
--

DROP TABLE IF EXISTS `hospitals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hospitals` (
  `h_id` int NOT NULL,
  `h_name` varchar(45) NOT NULL,
  `h_address` varchar(45) NOT NULL,
  `h_city` varchar(45) NOT NULL,
  `care_id` int NOT NULL,
  `username` varchar(90) NOT NULL,
  `password` varchar(45) NOT NULL,
  `contact` int DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  PRIMARY KEY (`h_id`),
  UNIQUE KEY `verification_id_UNIQUE` (`h_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `careid_idx` (`care_id`),
  CONSTRAINT `care_id` FOREIGN KEY (`care_id`) REFERENCES `care` (`care_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requests` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `receiver_hid` int NOT NULL,
  `request_datetime` datetime NOT NULL,
  `quantity` int NOT NULL,
  `acceptance_status` int NOT NULL DEFAULT '0',
  `blood_type_id` int NOT NULL,
  `needBefore` date DEFAULT NULL,
  PRIMARY KEY (`request_id`),
  UNIQUE KEY `request_id_UNIQUE` (`request_id`),
  KEY `h_id_idx` (`receiver_hid`),
  KEY `blood_type_id_idx` (`blood_type_id`),
  CONSTRAINT `blood_type_id` FOREIGN KEY (`blood_type_id`) REFERENCES `bloodtypes` (`bloodtype_id`),
  CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`receiver_hid`) REFERENCES `hospitals` (`h_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sender`
--

DROP TABLE IF EXISTS `sender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sender` (
  `request_id` int NOT NULL,
  `sender_id` int NOT NULL,
  `accepted` int DEFAULT '0',
  PRIMARY KEY (`request_id`,`sender_id`),
  KEY `sender_id` (`sender_id`),
  CONSTRAINT `sender_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `requests` (`request_id`),
  CONSTRAINT `sender_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `hospitals` (`h_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `tid` int NOT NULL AUTO_INCREMENT,
  `sender_hid` int NOT NULL,
  `receiver_hid` int NOT NULL,
  `t_datetime` datetime NOT NULL,
  `delivery_status` int NOT NULL,
  `request_id` int NOT NULL,
  PRIMARY KEY (`tid`),
  UNIQUE KEY `tid_UNIQUE` (`tid`),
  UNIQUE KEY `request_id_UNIQUE` (`request_id`),
  KEY `sender_id_idx` (`sender_hid`),
  KEY `reciever_hid_idx` (`receiver_hid`),
  CONSTRAINT `reciever_hid` FOREIGN KEY (`receiver_hid`) REFERENCES `requests` (`receiver_hid`),
  CONSTRAINT `request_id` FOREIGN KEY (`request_id`) REFERENCES `requests` (`request_id`),
  CONSTRAINT `sender_hid` FOREIGN KEY (`sender_hid`) REFERENCES `hospitals` (`h_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-03 11:59:44
