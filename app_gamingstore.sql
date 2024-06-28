-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: app_gamingstore
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `urlImagen` varchar(256) DEFAULT NULL,
  `deleted` tinyint DEFAULT NULL,
  `descripcion` varchar(400) DEFAULT NULL,
  `urlyoutube` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Mortal Kombat 11',60.00,'https://raw.githubusercontent.com/yahyayatusabe/imagenes-app_gamingstore/main/Mk11.webp',1,NULL,NULL),(2,'Elden Ring',50.00,'https://github.com/yahyayatusabe/imagenes-app_gamingstore/blob/main/EldenRing.jpg?raw=true',0,NULL,NULL),(3,'Inazuma Eleven',60.00,'https://github.com/yahyayatusabe/imagenes-app_gamingstore/blob/main/inazumaeleven.jpg?raw=true',0,'¡Ayuda a Mark Evans a ganar el torneo Football Frontier reclutando y entrenando jugadores, incluyendo al talentoso Axel Blaze! Participa en partidos y pachangas para mejorar habilidades, y utiliza supertécnicas para vencer a tus rivales.','<iframe width=\"1128\" height=\"635\" src=\"https://www.youtube.com/embed/9YEQPU5RvfA\" title=\"Inazuma Eleven - Tráiler (Nintendo 3DS)\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>'),(4,'God of War',40.00,'https://raw.githubusercontent.com/yahyayatusabe/imagenes-app_gamingstore/main/godofwar.avif',0,'Tras cobrarse venganza de los dioses del Olimpo, Kratos ahora vive en el reino de las deidades y los monstruos nórdicos. En este mundo hostil y despiadado, debe luchar por sobrevivir y enseñarle a su hijo a hacer lo mismo… pero sin repetir los errores que mancharon de sangre las manos del Fantasma de Esparta.','<iframe width=\"1128\" height=\"635\" src=\"https://www.youtube.com/embed/dK42JGgkoF8\" title=\"GOD OF WAR - Tráiler de la HISTORIA en ESPAÑOL | PlayStation España\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>'),(5,'Call of duty',30.00,'https://raw.githubusercontent.com/yahyayatusabe/imagenes-app_gamingstore/main/COD.avif',0,NULL,NULL),(6,'Apex Legends',0.00,'https://raw.githubusercontent.com/yahyayatusabe/imagenes-app_gamingstore/main/apexlegends.avif',0,NULL,NULL),(7,'Dragon Ball Kakarot',55.00,'https://github.com/yahyayatusabe/imagenes-app_gamingstore/blob/main/dragonballkakarot.jpeg?raw=true',0,NULL,NULL),(8,'Tekken 8',45.00,'https://raw.githubusercontent.com/yahyayatusabe/imagenes-app_gamingstore/main/Tekken%208.avif',1,NULL,NULL),(9,'Horizon',35.00,'https://raw.githubusercontent.com/yahyayatusabe/imagenes-app_gamingstore/main/Horizon.avif',0,NULL,NULL),(10,'Rainbow Six Siege',30.00,'https://github.com/yahyayatusabe/imagenes-app_gamingstore/blob/main/Rainbow%20Six%20Siege.jpg?raw=true',0,NULL,NULL),(11,'Minecraft',60.00,'https://raw.githubusercontent.com/yahyayatusabe/imagenes-app_gamingstore/main/minecraft.avif',0,NULL,NULL),(12,'GTA V',45.55,'https://github.com/yahyayatusabe/imagenes-app_gamingstore/blob/main/GTAV.jpg?raw=true',0,NULL,NULL);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idusuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `emial` varchar(45) DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`idusuario`,`password`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'admin','admin@admin.com','$2a$04$4W3L7xc0rHhleSpUaPx9NOBghsRVWPt30o5WVmeqAMbskzSIa7A5a');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-12  1:12:37
