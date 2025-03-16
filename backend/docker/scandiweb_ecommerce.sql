-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: scandiweb_ecommerce
-- ------------------------------------------------------
-- Server version	5.6.51

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
-- Table structure for table `attribute_items`
--

DROP TABLE IF EXISTS `attribute_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attribute_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `display_value` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `attribute_set_id` int(11) NOT NULL,
  `__typename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `attribute_set_id` (`attribute_set_id`),
  CONSTRAINT `attribute_items_ibfk_1` FOREIGN KEY (`attribute_set_id`) REFERENCES `attribute_sets` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=246 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attribute_items`
--

LOCK TABLES `attribute_items` WRITE;
/*!40000 ALTER TABLE `attribute_items` DISABLE KEYS */;
INSERT INTO `attribute_items` VALUES (211,'40','40',45,'AttributeItem'),(212,'41','41',45,'AttributeItem'),(213,'42','42',45,'AttributeItem'),(214,'43','43',45,'AttributeItem'),(215,'Small','S',46,'AttributeItem'),(216,'Medium','M',46,'AttributeItem'),(217,'Large','L',46,'AttributeItem'),(218,'Extra Large','XL',46,'AttributeItem'),(219,'Green','#44FF03',47,'AttributeItem'),(220,'Cyan','#03FFF7',47,'AttributeItem'),(221,'Blue','#030BFF',47,'AttributeItem'),(222,'Black','#000000',47,'AttributeItem'),(223,'White','#FFFFFF',47,'AttributeItem'),(224,'512G','512G',48,'AttributeItem'),(225,'1T','1T',48,'AttributeItem'),(226,'Green','#44FF03',49,'AttributeItem'),(227,'Cyan','#03FFF7',49,'AttributeItem'),(228,'Blue','#030BFF',49,'AttributeItem'),(229,'Black','#000000',49,'AttributeItem'),(230,'White','#FFFFFF',49,'AttributeItem'),(231,'512G','512G',50,'AttributeItem'),(232,'1T','1T',50,'AttributeItem'),(233,'256GB','256GB',51,'AttributeItem'),(234,'512GB','512GB',51,'AttributeItem'),(235,'Yes','Yes',52,'AttributeItem'),(236,'No','No',52,'AttributeItem'),(237,'Yes','Yes',53,'AttributeItem'),(238,'No','No',53,'AttributeItem'),(239,'512G','512G',54,'AttributeItem'),(240,'1T','1T',54,'AttributeItem'),(241,'Green','#44FF03',55,'AttributeItem'),(242,'Cyan','#03FFF7',55,'AttributeItem'),(243,'Blue','#030BFF',55,'AttributeItem'),(244,'Black','#000000',55,'AttributeItem'),(245,'White','#FFFFFF',55,'AttributeItem');
/*!40000 ALTER TABLE `attribute_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attribute_sets`
--

DROP TABLE IF EXISTS `attribute_sets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attribute_sets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` varchar(100) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `__typename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `attribute_sets_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attribute_sets`
--

LOCK TABLES `attribute_sets` WRITE;
/*!40000 ALTER TABLE `attribute_sets` DISABLE KEYS */;
INSERT INTO `attribute_sets` VALUES (45,'Size','text','huarache-x-stussy-le','AttributeSet'),(46,'Size','text','jacket-canada-goosee','AttributeSet'),(47,'Color','swatch','ps-5','AttributeSet'),(48,'Capacity','text','ps-5','AttributeSet'),(49,'Color','swatch','xbox-series-s','AttributeSet'),(50,'Capacity','text','xbox-series-s','AttributeSet'),(51,'Capacity','text','apple-imac-2021','AttributeSet'),(52,'With USB 3 ports','text','apple-imac-2021','AttributeSet'),(53,'Touch ID in keyboard','text','apple-imac-2021','AttributeSet'),(54,'Capacity','text','apple-iphone-12-pro','AttributeSet'),(55,'Color','swatch','apple-iphone-12-pro','AttributeSet');
/*!40000 ALTER TABLE `attribute_sets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attributes`
--

DROP TABLE IF EXISTS `attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attributes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(50) NOT NULL,
  `__typename` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attributes`
--

LOCK TABLES `attributes` WRITE;
/*!40000 ALTER TABLE `attributes` DISABLE KEYS */;
INSERT INTO `attributes` VALUES (16,'huarache-x-stussy-le','Size','text',''),(17,'ps-5','Color','swatch',''),(18,'ps-5','Capacity','text',''),(19,'apple-imac-2021','With USB 3 ports','text',''),(20,'apple-imac-2021','Touch ID in keyboard','text','');
/*!40000 ALTER TABLE `attributes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `__typename` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'all','Category'),(2,'clothes','Category'),(3,'tech','Category');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gallery` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` varchar(50) DEFAULT NULL,
  `image_url` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=427 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery`
--

LOCK TABLES `gallery` WRITE;
/*!40000 ALTER TABLE `gallery` DISABLE KEYS */;
INSERT INTO `gallery` VALUES (401,'huarache-x-stussy-le','https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087'),(402,'huarache-x-stussy-le','https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087'),(403,'huarache-x-stussy-le','https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087'),(404,'huarache-x-stussy-le','https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087'),(405,'huarache-x-stussy-le','https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087'),(406,'jacket-canada-goosee','https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg'),(407,'jacket-canada-goosee','https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg'),(408,'jacket-canada-goosee','https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg'),(409,'jacket-canada-goosee','https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg'),(410,'jacket-canada-goosee','https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg'),(411,'jacket-canada-goosee','https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png'),(412,'jacket-canada-goosee','https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png'),(413,'ps-5','https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg'),(414,'ps-5','https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg'),(415,'ps-5','https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg'),(416,'ps-5','https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg'),(417,'ps-5','https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg'),(418,'xbox-series-s','https://images-na.ssl-images-amazon.com/images/I/71vPCX0bS-L._SL1500_.jpg'),(419,'xbox-series-s','https://images-na.ssl-images-amazon.com/images/I/71q7JTbRTpL._SL1500_.jpg'),(420,'xbox-series-s','https://images-na.ssl-images-amazon.com/images/I/71iQ4HGHtsL._SL1500_.jpg'),(421,'xbox-series-s','https://images-na.ssl-images-amazon.com/images/I/61IYrCrBzxL._SL1500_.jpg'),(422,'xbox-series-s','https://images-na.ssl-images-amazon.com/images/I/61RnXmpAmIL._SL1500_.jpg'),(423,'apple-imac-2021','https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000'),(424,'apple-iphone-12-pro','https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=80&amp;.v=1604021663000'),(425,'apple-airpods-pro','https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1591634795000'),(426,'apple-airtag','https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000');
/*!40000 ALTER TABLE `gallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` char(36) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (57,'a51f343d-5bec-414d-a792-0f0039a8b55d','jacket-canada-goosee','Jacket',25,518.47),(58,'a587cf92-aa08-4e64-a95b-d3eb7a88e8a1','apple-imac-2021','iMac 2021',3,1688.03),(59,'a587cf92-aa08-4e64-a95b-d3eb7a88e8a1','jacket-canada-goosee','Jacket',1,518.47),(60,'a587cf92-aa08-4e64-a95b-d3eb7a88e8a1','huarache-x-stussy-le','Nike Air Huarache Le',1,144.69),(61,'a587cf92-aa08-4e64-a95b-d3eb7a88e8a1','apple-iphone-12-pro','iPhone 12 Pro',1,1000.76),(62,'a587cf92-aa08-4e64-a95b-d3eb7a88e8a1','ps-5','PlayStation 5',1,844.02),(63,'0bc1a3bd-00d3-4573-9013-deb1c81c98ae','apple-imac-2021','iMac 2021',2,1688.03),(64,'0bc1a3bd-00d3-4573-9013-deb1c81c98ae','apple-airtag','AirTag',2,120.57),(65,'79f2d465-df14-4b37-ab1e-cf015c0273a5','apple-imac-2021','iMac 2021',1,1688.03),(66,'79f2d465-df14-4b37-ab1e-cf015c0273a5','apple-airtag','AirTag',1,120.57),(67,'79f2d465-df14-4b37-ab1e-cf015c0273a5','huarache-x-stussy-le','Nike Air Huarache Le',1,144.69),(68,'79f2d465-df14-4b37-ab1e-cf015c0273a5','jacket-canada-goosee','Jacket',1,518.47),(69,'49eba742-c975-4bfa-9d46-f9688542d4bf','ps-5','PlayStation 5',1,844.02),(70,'4e3cf2b2-c29f-495d-8495-943e4ecaa316','apple-airtag','AirTag',3,120.57),(71,'171a926e-d171-424d-8a0f-547bd696702d','apple-imac-2021','iMac 2021',1,1688.03),(72,'171a926e-d171-424d-8a0f-547bd696702d','apple-airtag','AirTag',1,120.57),(73,'171a926e-d171-424d-8a0f-547bd696702d','huarache-x-stussy-le','Nike Air Huarache Le',1,144.69),(74,'171a926e-d171-424d-8a0f-547bd696702d','jacket-canada-goosee','Jacket',1,518.47),(75,'ba334dfd-3a7f-483a-9e02-df5184e82efb','apple-airtag','AirTag',1,120.57),(76,'ba334dfd-3a7f-483a-9e02-df5184e82efb','apple-imac-2021','iMac 2021',1,1688.03),(77,'ba334dfd-3a7f-483a-9e02-df5184e82efb','apple-iphone-12-pro','iPhone 12 Pro',1,1000.76),(78,'ba334dfd-3a7f-483a-9e02-df5184e82efb','ps-5','PlayStation 5',1,844.02),(79,'c1ccbfad-49f4-4e47-80c0-f6d0c6751ff6','apple-airtag','AirTag',1,120.57),(80,'76d66b20-0001-4acb-b009-24b70c5060c1','jacket-canada-goosee','Jacket',6,518.47),(81,'0d50a7eb-808e-4cbe-ac47-1dce3d1e4c98','apple-airtag','AirTag',1,120.57),(82,'b90458b6-aa08-4d6f-82d1-5cc3a4cb13f9','huarache-x-stussy-le','Nike Air Huarache Le',4,144.69),(83,'b90458b6-aa08-4d6f-82d1-5cc3a4cb13f9','jacket-canada-goosee','Jacket',4,518.47),(84,'c97443fc-dbf1-4ce6-93a1-969a32c84427','huarache-x-stussy-le','Nike Air Huarache Le',3,144.69),(85,'a58c8254-da19-40ae-9166-57831c57e03b','apple-imac-2021','iMac 2021',1,1688.03),(86,'a58c8254-da19-40ae-9166-57831c57e03b','apple-airtag','AirTag',1,120.57),(87,'959db951-b795-44da-a32b-e544c9a8ef90','apple-imac-2021','iMac 2021',2,1688.03),(88,'959db951-b795-44da-a32b-e544c9a8ef90','apple-airtag','AirTag',2,120.57),(89,'959db951-b795-44da-a32b-e544c9a8ef90','jacket-canada-goosee','Jacket',4,518.47),(90,'f4deaa1f-3346-424a-8766-ca8090b1226c','jacket-canada-goosee','Jacket',1,518.47),(91,'ccf15dda-969f-4883-aa7f-6ddbb30b40df','apple-imac-2021','iMac 2021',6,1688.03),(92,'ccf15dda-969f-4883-aa7f-6ddbb30b40df','apple-airtag','AirTag',1,120.57),(93,'ccf15dda-969f-4883-aa7f-6ddbb30b40df','huarache-x-stussy-le','Nike Air Huarache Le',1,144.69),(94,'ccf15dda-969f-4883-aa7f-6ddbb30b40df','jacket-canada-goosee','Jacket',1,518.47),(95,'f18704d4-bbf4-4abc-90c5-af2cb7b524bd','apple-airtag','AirTag',1,120.57),(96,'b4bf024e-7bcc-46a6-b1d6-4bd9fa218eb7','apple-airtag','AirTag',1,120.57),(97,'ef5c8e01-c122-4d6e-bd84-c4becc674f22','jacket-canada-goosee','Jacket',1,518.47),(98,'ef5c8e01-c122-4d6e-bd84-c4becc674f22','huarache-x-stussy-le','Nike Air Huarache Le',1,144.69),(99,'052243bb-cc32-4583-ad8f-c74d773f8e7f','huarache-x-stussy-le','Nike Air Huarache Le',1,144.69),(100,'54b3b653-cc55-45fe-a2d6-717d18ec3846','apple-airtag','AirTag',1,1200.57),(101,'82c626fc-c049-4ff4-b402-10eae8359821','apple-imac-2021','iMac 2021',1,1688.03),(102,'93075d08-e934-422f-872a-e5de933cdcd7','apple-airtag','AirTag',1,1200.57),(103,'aefd8df0-3632-4f49-a4a4-7587dcd058a9','apple-airtag','AirTag',1,1200.57),(104,'31a0ad85-4a31-4a52-acbd-fe470f82a06f','jacket-canada-goosee','Winter Jacket',1,518.47),(105,'d3b9ccfe-8533-432b-b384-ca701645914b','apple-airtag','AirTag',1,120.57),(106,'d3b9ccfe-8533-432b-b384-ca701645914b','apple-imac-2021','iMac 2021',1,1688.03),(107,'632fce0b-9759-49f3-9679-f2419a5dfc26','apple-airtag','AirTag',1,120.57),(108,'632fce0b-9759-49f3-9679-f2419a5dfc26','apple-imac-2021','iMac 2021',1,1688.03),(109,'632fce0b-9759-49f3-9679-f2419a5dfc26','jacket-canada-goosee','Jacket',1,518.47),(110,'f7df5c21-1271-42e1-bc7e-66fc02cc08d3','apple-imac-2021','iMac 2021',1,1688.03),(111,'f7df5c21-1271-42e1-bc7e-66fc02cc08d3','ps-5','PlayStation 5',1,844.02),(112,'f7df5c21-1271-42e1-bc7e-66fc02cc08d3','ps-5','PlayStation 5',1,844.02),(113,'a1d462c4-2aca-4a11-a252-2f5afbc57d13','apple-airtag','AirTag',1,120.57),(114,'a1d462c4-2aca-4a11-a252-2f5afbc57d13','apple-imac-2021','iMac 2021',1,1688.03),(115,'dc15117a-d358-4950-b777-eaaa24488aff','huarache-x-stussy-le','Nike Air Huarache Le',1,144.69),(116,'dc15117a-d358-4950-b777-eaaa24488aff','huarache-x-stussy-le','Nike Air Huarache Le',1,144.69),(117,'896521d8-2a4c-4f91-92f0-aac7bbe0fd84','apple-imac-2021','iMac 2021',1,1688.03),(118,'f113627a-9eae-40b7-a7fb-4e11226c91b3','apple-imac-2021','iMac 2021',8,1688.03),(119,'12dbcc9d-e5f5-4f78-80fa-c4d812736101','apple-imac-2021','iMac 2021',2,1688.03),(120,'c0d6e6c0-0332-4209-8bed-8321b9d2a079','apple-imac-2021','iMac 2021',1,1688.03),(121,'c0d6e6c0-0332-4209-8bed-8321b9d2a079','apple-airtag','AirTag',3,120.57),(122,'c9450db0-a98c-4b3a-bc5f-ecdeaa39c363','apple-imac-2021','iMac 2021',1,1688.03),(123,'c9450db0-a98c-4b3a-bc5f-ecdeaa39c363','apple-airtag','AirTag',1,120.57),(124,'c9450db0-a98c-4b3a-bc5f-ecdeaa39c363','huarache-x-stussy-le','Nike Air Huarache Le',1,144.69),(125,'c9450db0-a98c-4b3a-bc5f-ecdeaa39c363','jacket-canada-goosee','Jacket',1,518.47),(126,'c9450db0-a98c-4b3a-bc5f-ecdeaa39c363','ps-5','PlayStation 5',1,844.02),(127,'c2229163-0408-4766-8207-c2727b230070','ps-5','PlayStation 5',1,844.02),(128,'c2229163-0408-4766-8207-c2727b230070','apple-imac-2021','iMac 2021',1,1688.03),(129,'b2c9ca90-9779-410b-a7cc-765b826a224c','apple-airtag','AirTag',4,120.57),(130,'d79cc68e-81b7-42a2-bd48-fd106c391686','jacket-canada-goosee','Jacket',1,518.47),(131,'f76d2377-e26e-402d-8321-143a835e1e76','apple-airtag','AirTag',1,120.57),(132,'f76d2377-e26e-402d-8321-143a835e1e76','huarache-x-stussy-le','Nike Air Huarache Le',1,144.69),(133,'1dfe6fb4-1a42-47b6-8b40-d6214e05dcab','jacket-canada-goosee','Jacket',1,518.47),(134,'1b7219a2-71e5-4d1f-894b-bab7a69bd269','jacket-canada-goosee','Jacket',1,518.47),(135,'f945f11d-b221-4f61-a456-9255b9b731d2','jacket-canada-goosee','Jacket',1,518.47),(136,'df2ce149-ffc2-406f-926c-76fbdcdad7fb','apple-airtag','AirTag',1,120.57),(137,'9a07454e-544b-4543-b734-c5ebe21b01fa','apple-imac-2021','iMac 2021',1,1688.03),(138,'9a07454e-544b-4543-b734-c5ebe21b01fa','apple-airtag','AirTag',1,120.57),(139,'9a07454e-544b-4543-b734-c5ebe21b01fa','jacket-canada-goosee','Jacket',1,518.47),(140,'9a07454e-544b-4543-b734-c5ebe21b01fa','huarache-x-stussy-le','Nike Air Huarache Le',1,144.69),(141,'9a07454e-544b-4543-b734-c5ebe21b01fa','apple-iphone-12-pro','iPhone 12 Pro',1,1000.76),(142,'9a07454e-544b-4543-b734-c5ebe21b01fa','ps-5','PlayStation 5',1,844.02),(143,'9db59be9-a07a-4098-8c2a-9314ec638554','apple-airtag','AirTag',1,120.57),(144,'9db59be9-a07a-4098-8c2a-9314ec638554','apple-imac-2021','iMac 2021',1,1688.03);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` char(36) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `currency` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('052243bb-cc32-4583-ad8f-c74d773f8e7f',144.69,'USD'),('0bc1a3bd-00d3-4573-9013-deb1c81c98ae',3617.20,'USD'),('0d50a7eb-808e-4cbe-ac47-1dce3d1e4c98',120.57,'USD'),('12dbcc9d-e5f5-4f78-80fa-c4d812736101',3376.06,'USD'),('171a926e-d171-424d-8a0f-547bd696702d',2471.76,'USD'),('1b7219a2-71e5-4d1f-894b-bab7a69bd269',518.47,'USD'),('1dfe6fb4-1a42-47b6-8b40-d6214e05dcab',518.47,'USD'),('31a0ad85-4a31-4a52-acbd-fe470f82a06f',518.47,'USD'),('49eba742-c975-4bfa-9d46-f9688542d4bf',844.02,'USD'),('4e3cf2b2-c29f-495d-8495-943e4ecaa316',361.71,'USD'),('54b3b653-cc55-45fe-a2d6-717d18ec3846',1200.57,'USD'),('632fce0b-9759-49f3-9679-f2419a5dfc26',2327.07,'USD'),('76d66b20-0001-4acb-b009-24b70c5060c1',3110.82,'USD'),('79f2d465-df14-4b37-ab1e-cf015c0273a5',2471.76,'USD'),('82c626fc-c049-4ff4-b402-10eae8359821',1688.03,'USD'),('896521d8-2a4c-4f91-92f0-aac7bbe0fd84',1688.03,'USD'),('93075d08-e934-422f-872a-e5de933cdcd7',1200.57,'USD'),('959db951-b795-44da-a32b-e544c9a8ef90',5691.08,'USD'),('9a07454e-544b-4543-b734-c5ebe21b01fa',4316.54,'USD'),('9db59be9-a07a-4098-8c2a-9314ec638554',1808.60,'USD'),('a1d462c4-2aca-4a11-a252-2f5afbc57d13',1808.60,'USD'),('a51f343d-5bec-414d-a792-0f0039a8b55d',12961.75,'USD'),('a587cf92-aa08-4e64-a95b-d3eb7a88e8a1',7572.03,'USD'),('a58c8254-da19-40ae-9166-57831c57e03b',1808.60,'USD'),('aefd8df0-3632-4f49-a4a4-7587dcd058a9',1200.57,'USD'),('b2c9ca90-9779-410b-a7cc-765b826a224c',482.28,'USD'),('b4bf024e-7bcc-46a6-b1d6-4bd9fa218eb7',120.57,'USD'),('b90458b6-aa08-4d6f-82d1-5cc3a4cb13f9',2652.64,'USD'),('ba334dfd-3a7f-483a-9e02-df5184e82efb',3653.38,'USD'),('c0d6e6c0-0332-4209-8bed-8321b9d2a079',2049.74,'USD'),('c1ccbfad-49f4-4e47-80c0-f6d0c6751ff6',120.57,'USD'),('c2229163-0408-4766-8207-c2727b230070',2532.05,'USD'),('c9450db0-a98c-4b3a-bc5f-ecdeaa39c363',3315.78,'USD'),('c97443fc-dbf1-4ce6-93a1-969a32c84427',434.07,'USD'),('ccf15dda-969f-4883-aa7f-6ddbb30b40df',10911.91,'USD'),('d3b9ccfe-8533-432b-b384-ca701645914b',1808.60,'USD'),('d79cc68e-81b7-42a2-bd48-fd106c391686',518.47,'USD'),('dc15117a-d358-4950-b777-eaaa24488aff',289.38,'USD'),('df2ce149-ffc2-406f-926c-76fbdcdad7fb',120.57,'USD'),('ef5c8e01-c122-4d6e-bd84-c4becc674f22',663.16,'USD'),('f113627a-9eae-40b7-a7fb-4e11226c91b3',13504.24,'USD'),('f18704d4-bbf4-4abc-90c5-af2cb7b524bd',120.57,'USD'),('f4deaa1f-3346-424a-8766-ca8090b1226c',518.47,'USD'),('f76d2377-e26e-402d-8321-143a835e1e76',265.26,'USD'),('f7df5c21-1271-42e1-bc7e-66fc02cc08d3',3376.07,'USD'),('f945f11d-b221-4f61-a456-9255b9b731d2',518.47,'USD');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prices`
--

DROP TABLE IF EXISTS `prices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prices` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `currency_label` varchar(50) NOT NULL,
  `currency_symbol` varchar(10) NOT NULL,
  `__typename` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `fk_product_id` (`product_id`),
  CONSTRAINT `fk_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prices`
--

LOCK TABLES `prices` WRITE;
/*!40000 ALTER TABLE `prices` DISABLE KEYS */;
INSERT INTO `prices` VALUES (121,'huarache-x-stussy-le',144.69,'USD','$','Price'),(122,'jacket-canada-goosee',518.47,'USD','$','Price'),(123,'ps-5',844.02,'USD','$','Price'),(124,'xbox-series-s',333.99,'USD','$','Price'),(125,'apple-imac-2021',1688.03,'USD','$','Price'),(126,'apple-iphone-12-pro',1000.76,'USD','$','Price'),(127,'apple-airpods-pro',300.23,'USD','$','Price'),(128,'apple-airtag',120.57,'USD','$','Price');
/*!40000 ALTER TABLE `prices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `inStock` tinyint(1) NOT NULL,
  `description` text,
  `category_id` int(11) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `__typename` varchar(50) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('apple-airpods-pro','AirPods Pro',0,'<h3>Magic like youve never heard</h3>\n<p>AirPods Pro have been designed to deliver Active Noise Cancellation for immersive sound, Transparency mode so you can hear your surroundings, and a customizable fit for all-day comfort. Just like AirPods, AirPods Pro connect magically to your iPhone or Apple Watch. And theyre ready to use right out of the case.</p>\n\n<h3>Active Noise Cancellation</h3>\n<p>Incredibly light noise-cancelling headphones, AirPods Pro block out your environment so you can focus on what youre listening to. AirPods Pro use two microphones, an outward-facing microphone and an inward-facing microphone, to create superior noise cancellation. By continuously adapting to the geometry of your ear and the fit of the ear tips, Active Noise Cancellation silences the world to keep you fully tuned in to your music, podcasts, and calls.</p>\n\n<h3>Transparency mode</h3>\n<p>Switch to Transparency mode and AirPods Pro let the outside sound in, allowing you to hear and connect to your surroundings. Outward- and inward-facing microphones enable AirPods Pro to undo the sound-isolating effect of the silicone tips so things sound and feel natural, like when youre talking to people around you.</p>\n\n<h3>All-new design</h3>\n<p>AirPods Pro offer a more customizable fit with three sizes of flexible silicone tips to choose from. With an internal taper, they conform to the shape of your ear, securing your AirPods Pro in place and creating an exceptional seal for superior noise cancellation.</p>\n\n<h3>Amazing audio quality</h3>\n<p>A custom-built high-excursion, low-distortion driver delivers powerful bass. A superefficient high dynamic range amplifier produces pure, incredibly clear sound while also extending battery life. And Adaptive EQ automatically tunes music to suit the shape of your ear for a rich, consistent listening experience.</p>\n\n<h3>Even more magical</h3>\n<p>The Apple-designed H1 chip delivers incredibly low audio latency. A force sensor on the stem makes it easy to control music and calls and switch between Active Noise Cancellation and Transparency mode. Announce Messages with Siri gives you the option to have Siri read your messages through your AirPods. And with Audio Sharing, you and a friend can share the same audio stream on two sets of AirPods  so you can play a game, watch a movie, or listen to a song together.</p>',3,'Apple','Product',300.23),('apple-airtag','AirTag',1,'\n<h1>Lose your knack for losing things.</h1>\n<p>AirTag is an easy way to keep track of your stuff. Attach one to your keys, slip another one in your backpack. And just like that, theyâ€™re on your radar in the Find My app. AirTag has your back.</p>\n',3,'Apple','Product',120.57),('apple-imac-2021','iMac 2021',1,'The new iMac!',3,'Apple','Product',1688.03),('apple-iphone-12-pro','iPhone 12 Pro',1,'This is iPhone 12. Nothing else to say.',3,'Apple','Product',1000.76),('huarache-x-stussy-le','Nike Air Huarache Le',1,'<p>Great sneakers for everyday use!</p>',2,'Nike x Stussy','Product',144.69),('jacket-canada-goosee','Jacket',1,'<p>Awesome winter jacket</p>',2,'Canada Goose','Product',518.47),('ps-5','PlayStation 5',1,'<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>',3,'Sony','Product',844.02),('xbox-series-s','Xbox Series S 512GB',0,'\n<div>\n    <ul>\n        <li><span>Hardware-beschleunigtes Raytracing macht dein Spiel noch realistischer</span></li>\n        <li><span>Spiele Games mit bis zu 120 Bilder pro Sekunde</span></li>\n        <li><span>Minimiere Ladezeiten mit einer speziell entwickelten 512GB NVMe SSD und wechsle mit Quick Resume nahtlos zwischen mehreren Spielen.</span></li>\n        <li><span>Xbox Smart Delivery stellt sicher, dass du die beste Version deines Spiels spielst, egal, auf welcher Konsole du spielst</span></li>\n        <li><span>Spiele deine Xbox One-Spiele auf deiner Xbox Series S weiter. Deine Fortschritte, Erfolge und Freundesliste werden automatisch auf das neue System Ã¼bertragen.</span></li>\n        <li><span>Erwecke deine Spiele und Filme mit innovativem 3D Raumklang zum Leben</span></li>\n        <li><span>Der brandneue Xbox Wireless Controller zeichnet sich durch hÃ¶chste PrÃ¤zision, eine neue Share-Taste und verbesserte Ergonomie aus</span></li>\n        <li><span>Ultra-niedrige Latenz verbessert die Reaktionszeit von Controller zum Fernseher</span></li>\n        <li><span>Verwende dein Xbox One-Gaming-ZubehÃ¶r -einschlieÃŸlich Controller, Headsets und mehr</span></li>\n        <li><span>Erweitere deinen Speicher mit der Seagate 1 TB-Erweiterungskarte fÃ¼r Xbox Series X (separat erhÃ¤ltlich) und streame 4K-Videos von Disney+, Netflix, Amazon, Microsoft Movies &amp; TV und mehr</span></li>\n    </ul>\n</div>',3,'Microsoft','Product',333.99);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-16  3:07:46
