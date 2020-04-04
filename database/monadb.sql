-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-04-2020 a las 00:31:41
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cookipad`
--
CREATE DATABASE IF NOT EXISTS `cookipad` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `cookipad`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recetas`
--

CREATE TABLE `recetas` (
  `rec_id` int(11) NOT NULL,
  `rec_titulo` varchar(50) NOT NULL,
  `rec_ingredientes` varchar(500) NOT NULL,
  `rec_usr_id` int(11) NOT NULL,
  `rec_foto` varchar(30) NOT NULL,
  `rec_puntuacion` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `recetas`
--

INSERT INTO `recetas` (`rec_id`, `rec_titulo`, `rec_ingredientes`, `rec_usr_id`, `rec_foto`, `rec_puntuacion`) VALUES
(1, 'Pan integral con pasas y nueces (panificadora)', '550 ml agua, 36 ml aceite de oliva virgen extra, 300 gr harina de espelta integral, 300 gr harina de centeno integral', 1, 'foto_rec1.png', 4),
(2, 'Fideos caseros', '1/2 kilo harina 000, 3 huevos, 1 cda aceite', 1, 'foto_rec2.png', 3),
(3, 'Cookies', '250 g harina 0000, 1 cucharadita polvo de hornear (Si gustan)', 2, 'foto_rec3.png', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recetas_tags`
--

CREATE TABLE `recetas_tags` (
  `rectag_rec_id` int(11) NOT NULL,
  `rectag_tag_id` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `recetas_tags`
--

INSERT INTO `recetas_tags` (`rectag_rec_id`, `rectag_tag_id`) VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tags`
--

CREATE TABLE `tags` (
  `tag_id` smallint(6) NOT NULL,
  `tag_nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tags`
--

INSERT INTO `tags` (`tag_id`, `tag_nombre`) VALUES
(1, 'Salado'),
(2, 'Dulce');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usr_id` int(11) NOT NULL,
  `usr_nombre` varchar(10) NOT NULL,
  `usr_email` varchar(30) NOT NULL,
  `usr_password` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usr_id`, `usr_nombre`, `usr_email`, `usr_password`) VALUES
(1, 'Pepe', 'pepe@gmail.com', '123456'),
(2, 'Maria', 'maria@gmail.com', '1234');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `recetas`
--
ALTER TABLE `recetas`
  ADD PRIMARY KEY (`rec_id`),
  ADD UNIQUE KEY `rec_titulo` (`rec_titulo`),
  ADD KEY `rec_usr_id` (`rec_usr_id`);

--
-- Indices de la tabla `recetas_tags`
--
ALTER TABLE `recetas_tags`
  ADD PRIMARY KEY (`rectag_rec_id`,`rectag_tag_id`),
  ADD KEY `rectag_tag_id` (`rectag_tag_id`);

--
-- Indices de la tabla `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`tag_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usr_id`),
  ADD UNIQUE KEY `usr_nombre` (`usr_nombre`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `recetas`
--
ALTER TABLE `recetas`
  MODIFY `rec_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tags`
--
ALTER TABLE `tags`
  MODIFY `tag_id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `recetas`
--
ALTER TABLE `recetas`
  ADD CONSTRAINT `recetas_ibfk_1` FOREIGN KEY (`rec_usr_id`) REFERENCES `usuarios` (`usr_id`);

--
-- Filtros para la tabla `recetas_tags`
--
ALTER TABLE `recetas_tags`
  ADD CONSTRAINT `recetas_tags_ibfk_1` FOREIGN KEY (`rectag_rec_id`) REFERENCES `recetas` (`rec_id`),
  ADD CONSTRAINT `recetas_tags_ibfk_2` FOREIGN KEY (`rectag_tag_id`) REFERENCES `tags` (`tag_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
