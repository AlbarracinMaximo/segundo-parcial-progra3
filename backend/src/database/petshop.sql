--ESTE DOCUMENTO FUE CREADO DESDE MYSQL WORKBECK, EXPORTANDO LA DATA DE LA 
--BASE DE DATOS CREADA DE FORMA MANUAL POR NOSOTROS


-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: petshop
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `administradores`
--

CREATE DATABASE IF NOT EXISTS petshop;

USE petshop;

DROP TABLE IF EXISTS `administradores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administradores` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `usuario` (`usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Dumping data for table `administradores`
--

LOCK TABLES `administradores` WRITE;
/*!40000 ALTER TABLE `administradores` DISABLE KEYS */;
/*!40000 ALTER TABLE `administradores` ENABLE KEYS */;
UNLOCK TABLES;

INSERT INTO administradores
(usuario, password)
VALUES
('admin1', 'admin123'),
('admin2', 'admin456');

--
-- Table structure for table `detalle_venta`
--

DROP TABLE IF EXISTS `detalle_venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_venta` (
  `id_detalle` int NOT NULL AUTO_INCREMENT,
  `id_venta` int NOT NULL,
  `id_producto` int NOT NULL,
  `cantidad` int NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `fk_detalle_venta` (`id_venta`),
  KEY `fk_detalle_producto` (`id_producto`),
  CONSTRAINT `fk_detalle_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`),
  CONSTRAINT `fk_detalle_venta` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id_venta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_venta`
--

LOCK TABLES `detalle_venta` WRITE;
/*!40000 ALTER TABLE `detalle_venta` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `imagen` varchar(255) NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `especie` varchar(50) NOT NULL,
  `edad` varchar(50) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Dog Chow Cachorro 21kg','Alimento balanceado para cachorros de razas medianas y grandes.',45000.00,15,'dogchow-cachorro.jpg','Alimentos','Perro','Cachorro',1),(2,'Dog Chow Adulto 21kg','Alimento balanceado para perros adultos.',47000.00,20,'dogchow-adulto.jpg','Alimentos','Perro','Adulto',1),(3,'Excellent Senior 15kg','Alimento premium para perros senior.',52000.00,10,'excellent-senior.jpg','Alimentos','Perro','Senior',1),(4,'Cat Chow Gatito 8kg','Alimento balanceado para gatitos.',28000.00,18,'catchow-gatito.jpg','Alimentos','Gato','Cachorro',1),(5,'Cat Chow Adulto 8kg','Alimento balanceado para gatos adultos.',29500.00,14,'catchow-adulto.jpg','Alimentos','Gato','Adulto',1),(6,'Excellent Gato Senior 7.5kg','Alimento premium para gatos senior.',34000.00,9,'excellent-gato-senior.jpg','Alimentos','Gato','Senior',1),(7,'Correa Regulable','Correa reforzada para perros medianos.',7500.00,30,'correa.jpg','Accesorios','Perro','Todos',1),(8,'Cucha Mediana','Cucha resistente para perros.',28500.00,6,'cucha.jpg','Accesorios','Perro','Todos',1),(9,'Rascador Premium','Rascador con plataforma para gatos.',18000.00,12,'rascador.jpg','Accesorios','Gato','Todos',1),(10,'Arenero Cubierto','Arenero cerrado con filtro anti olores.',22000.00,8,'arenero.jpg','Accesorios','Gato','Todos',1),(11,'Pro Plan Puppy Razas Medianas 15kg','Alimento premium para cachorros de razas medianas.',68500.00,12,'proplan-puppy.jpg','Alimentos','Perro','Cachorro',1),(12,'Royal Canin Mini Adult 8kg','Alimento premium para perros adultos de raza pequeña.',61500.00,8,'royal-mini-adult.jpg','Alimentos','Perro','Adulto',1),(13,'Vitalcan Senior 15kg','Alimento balanceado para perros mayores.',49500.00,11,'vitalcan-senior.jpg','Alimentos','Perro','Senior',1),(14,'Pro Plan Kitten 7.5kg','Alimento premium para gatitos en crecimiento.',52500.00,9,'proplan-kitten.jpg','Alimentos','Gato','Cachorro',1),(15,'Royal Canin Indoor Adult 7.5kg','Alimento para gatos adultos de interior.',57000.00,7,'royal-indoor.jpg','Alimentos','Gato','Adulto',1),(16,'Transportadora Mediana','Transportadora plástica para viajes y visitas al veterinario.',31500.00,6,'transportadora.jpg','Accesorios','Perro','Todos',1),(17,'Cepillo Deslanador','Cepillo para retirar pelo muerto y nudos.',8900.00,18,'cepillo.jpg','Accesorios','Perro','Todos',1),(18,'Fuente de Agua Automatica','Fuente eléctrica para estimular la hidratación.',27500.00,10,'fuente-agua.jpg','Accesorios','Gato','Todos',1),(19,'Juguete Raton Interactivo','Juguete con sonido y movimiento para gatos.',7200.00,25,'raton-interactivo.jpg','Accesorios','Gato','Todos',1),(20,'Cama Redonda Plush','Cama acolchada suave para mascotas pequeñas.',19500.00,14,'cama-plush.jpg','Accesorios','Gato','Todos',1),(21,'Producto Inactivo Prueba','Producto para testear baja lógica.',1000.00,0,'prueba.jpg','Accesorios','Perro','Todos',0);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas` (
  `id_venta` int NOT NULL AUTO_INCREMENT,
  `nombre_cliente` varchar(100) NOT NULL,
  `fecha` datetime NOT NULL,
  `total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_venta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-04 22:08:31
