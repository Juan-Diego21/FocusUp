-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-07-2025 a las 21:24:50
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `focus_up`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alertas`
--

CREATE TABLE `alertas` (
  `idAlertas` int(11) NOT NULL,
  `tipo_alerta` enum('Recordatorio','Descanso','FinSesion') NOT NULL,
  `mensaje_alerta` varchar(45) DEFAULT NULL,
  `fecha_alerta` date DEFAULT NULL,
  `hora_alerta` time DEFAULT NULL,
  `id_sesion_concentracion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aplicacionesrestringidas`
--

CREATE TABLE `aplicacionesrestringidas` (
  `idAplicacionesRestringidas` int(11) NOT NULL,
  `nombre_aplicacion` varchar(45) NOT NULL,
  `hora_restriccion` time DEFAULT NULL,
  `fecha_restriccion` date DEFAULT NULL,
  `Usuario_id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `beneficios`
--

CREATE TABLE `beneficios` (
  `idBeneficios` int(11) NOT NULL,
  `descripcion_beneficio` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `beneficios_has_bibliotecametodosestudio`
--

CREATE TABLE `beneficios_has_bibliotecametodosestudio` (
  `Beneficios_idBeneficios` int(11) NOT NULL,
  `BibliotecaMetodosEstudio_id_metodo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bibliotecametodosestudio`
--

CREATE TABLE `bibliotecametodosestudio` (
  `id_metodo` int(11) NOT NULL,
  `nombre_metodo` varchar(45) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `Beneficios_idBeneficios` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bibliotecamusica`
--

CREATE TABLE `bibliotecamusica` (
  `id_musica` int(11) NOT NULL,
  `nombre_cancion` text NOT NULL,
  `artista_cancion` varchar(45) DEFAULT NULL,
  `genero_cancion` varchar(45) DEFAULT NULL,
  `album` varchar(20) DEFAULT NULL,
  `categoria` enum('Relajación','Concentración','Ambiental','Clásica') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `distracciones`
--

CREATE TABLE `distracciones` (
  `idDistracciones` int(11) NOT NULL,
  `nombre_distraccion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `distracciones`
--

INSERT INTO `distracciones` (`idDistracciones`, `nombre_distraccion`) VALUES
(1, 'Redes sociales'),
(2, 'Mensajería instantánea'),
(3, 'Notificaciones del teléfono'),
(4, 'Correo electrónico'),
(5, 'Plataformas de video'),
(6, 'Videojuegos'),
(7, 'Scroll infinito'),
(8, 'Compras online'),
(9, 'Ruidos externos'),
(10, 'Interrupciones de otras personas'),
(11, 'Hambre o sed'),
(12, 'Falta de comodidad'),
(13, 'Desorden en el espacio'),
(14, 'Mascotas'),
(15, 'Pensamientos intrusivos'),
(16, 'Sueño/fatiga'),
(17, 'Aburrimiento'),
(18, 'Multitarea'),
(19, 'Día soñando despierto'),
(20, 'Estrés o ansiedad');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `idEventos` int(11) NOT NULL,
  `nombre_evento` text NOT NULL,
  `fecha_evento` date DEFAULT NULL,
  `hora_evento` time DEFAULT NULL,
  `descripcion_evento` varchar(50) DEFAULT NULL,
  `id_metodo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `objetivoestudio`
--

CREATE TABLE `objetivoestudio` (
  `id_objetivoEstudio` int(11) NOT NULL,
  `nombre_objetivo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `objetivoestudio`
--

INSERT INTO `objetivoestudio` (`id_objetivoEstudio`, `nombre_objetivo`) VALUES
(1, 'Estudio y Aprendizaje'),
(2, 'Trabajo y Productividad'),
(3, 'Tareas Domésticas'),
(4, 'Creatividad y Proyectos Personales'),
(5, 'Salud Mental y Bienestar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportes_semanales`
--

CREATE TABLE `reportes_semanales` (
  `idreportes_semanales` int(11) NOT NULL,
  `mensaje` text DEFAULT NULL,
  `sesiones_realizadas` int(11) DEFAULT NULL,
  `sesiones_no_iniciadas` int(11) DEFAULT NULL,
  `sesiones_no_terminadas` int(11) DEFAULT NULL,
  `musica_usada` text DEFAULT NULL,
  `metodo_usado` text DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `avance_actual` decimal(5,2) DEFAULT NULL,
  `Usuario_id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesionesconcentracion`
--

CREATE TABLE `sesionesconcentracion` (
  `idSesionesConcentracion` int(11) NOT NULL,
  `nombre_sesion` text NOT NULL,
  `duracion_sesion` time DEFAULT NULL,
  `metodo_estudio_usado` varchar(45) DEFAULT NULL,
  `id_metodo` int(11) DEFAULT NULL,
  `nombre_cancion` text DEFAULT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombres` varchar(45) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `horario_fav` time DEFAULT NULL,
  `idObjetivoEstudio_idObjetivos` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_has_distraccion`
--

CREATE TABLE `usuario_has_distraccion` (
  `Usuario_id_usuario` int(11) NOT NULL,
  `id_distracciones` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alertas`
--
ALTER TABLE `alertas`
  ADD PRIMARY KEY (`idAlertas`),
  ADD KEY `id_sesion_concentracion` (`id_sesion_concentracion`);

--
-- Indices de la tabla `aplicacionesrestringidas`
--
ALTER TABLE `aplicacionesrestringidas`
  ADD PRIMARY KEY (`idAplicacionesRestringidas`),
  ADD KEY `Usuario_id_usuario` (`Usuario_id_usuario`);

--
-- Indices de la tabla `beneficios`
--
ALTER TABLE `beneficios`
  ADD PRIMARY KEY (`idBeneficios`);

--
-- Indices de la tabla `beneficios_has_bibliotecametodosestudio`
--
ALTER TABLE `beneficios_has_bibliotecametodosestudio`
  ADD PRIMARY KEY (`Beneficios_idBeneficios`,`BibliotecaMetodosEstudio_id_metodo`),
  ADD KEY `BibliotecaMetodosEstudio_id_metodo` (`BibliotecaMetodosEstudio_id_metodo`);

--
-- Indices de la tabla `bibliotecametodosestudio`
--
ALTER TABLE `bibliotecametodosestudio`
  ADD PRIMARY KEY (`id_metodo`),
  ADD KEY `Beneficios_idBeneficios` (`Beneficios_idBeneficios`);

--
-- Indices de la tabla `bibliotecamusica`
--
ALTER TABLE `bibliotecamusica`
  ADD PRIMARY KEY (`id_musica`);

--
-- Indices de la tabla `distracciones`
--
ALTER TABLE `distracciones`
  ADD PRIMARY KEY (`idDistracciones`);

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`idEventos`),
  ADD KEY `id_metodo` (`id_metodo`);

--
-- Indices de la tabla `objetivoestudio`
--
ALTER TABLE `objetivoestudio`
  ADD PRIMARY KEY (`id_objetivoEstudio`);

--
-- Indices de la tabla `reportes_semanales`
--
ALTER TABLE `reportes_semanales`
  ADD PRIMARY KEY (`idreportes_semanales`),
  ADD KEY `Usuario_id_usuario` (`Usuario_id_usuario`);

--
-- Indices de la tabla `sesionesconcentracion`
--
ALTER TABLE `sesionesconcentracion`
  ADD PRIMARY KEY (`idSesionesConcentracion`),
  ADD KEY `id_metodo` (`id_metodo`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `idObjetivoEstudio_idObjetivos` (`idObjetivoEstudio_idObjetivos`);

--
-- Indices de la tabla `usuario_has_distraccion`
--
ALTER TABLE `usuario_has_distraccion`
  ADD PRIMARY KEY (`Usuario_id_usuario`,`id_distracciones`),
  ADD KEY `id_distracciones` (`id_distracciones`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alertas`
--
ALTER TABLE `alertas`
  MODIFY `idAlertas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `aplicacionesrestringidas`
--
ALTER TABLE `aplicacionesrestringidas`
  MODIFY `idAplicacionesRestringidas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `beneficios`
--
ALTER TABLE `beneficios`
  MODIFY `idBeneficios` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `bibliotecametodosestudio`
--
ALTER TABLE `bibliotecametodosestudio`
  MODIFY `id_metodo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `bibliotecamusica`
--
ALTER TABLE `bibliotecamusica`
  MODIFY `id_musica` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `distracciones`
--
ALTER TABLE `distracciones`
  MODIFY `idDistracciones` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `idEventos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `objetivoestudio`
--
ALTER TABLE `objetivoestudio`
  MODIFY `id_objetivoEstudio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `reportes_semanales`
--
ALTER TABLE `reportes_semanales`
  MODIFY `idreportes_semanales` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sesionesconcentracion`
--
ALTER TABLE `sesionesconcentracion`
  MODIFY `idSesionesConcentracion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alertas`
--
ALTER TABLE `alertas`
  ADD CONSTRAINT `alertas_ibfk_1` FOREIGN KEY (`id_sesion_concentracion`) REFERENCES `sesionesconcentracion` (`idSesionesConcentracion`);

--
-- Filtros para la tabla `aplicacionesrestringidas`
--
ALTER TABLE `aplicacionesrestringidas`
  ADD CONSTRAINT `aplicacionesrestringidas_ibfk_1` FOREIGN KEY (`Usuario_id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `beneficios_has_bibliotecametodosestudio`
--
ALTER TABLE `beneficios_has_bibliotecametodosestudio`
  ADD CONSTRAINT `beneficios_has_bibliotecametodosestudio_ibfk_1` FOREIGN KEY (`Beneficios_idBeneficios`) REFERENCES `beneficios` (`idBeneficios`),
  ADD CONSTRAINT `beneficios_has_bibliotecametodosestudio_ibfk_2` FOREIGN KEY (`BibliotecaMetodosEstudio_id_metodo`) REFERENCES `bibliotecametodosestudio` (`id_metodo`);

--
-- Filtros para la tabla `bibliotecametodosestudio`
--
ALTER TABLE `bibliotecametodosestudio`
  ADD CONSTRAINT `bibliotecametodosestudio_ibfk_1` FOREIGN KEY (`Beneficios_idBeneficios`) REFERENCES `beneficios` (`idBeneficios`);

--
-- Filtros para la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD CONSTRAINT `eventos_ibfk_2` FOREIGN KEY (`id_metodo`) REFERENCES `bibliotecametodosestudio` (`id_metodo`);

--
-- Filtros para la tabla `reportes_semanales`
--
ALTER TABLE `reportes_semanales`
  ADD CONSTRAINT `reportes_semanales_ibfk_1` FOREIGN KEY (`Usuario_id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `sesionesconcentracion`
--
ALTER TABLE `sesionesconcentracion`
  ADD CONSTRAINT `sesionesconcentracion_ibfk_1` FOREIGN KEY (`id_metodo`) REFERENCES `bibliotecametodosestudio` (`id_metodo`),
  ADD CONSTRAINT `sesionesconcentracion_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`idObjetivoEstudio_idObjetivos`) REFERENCES `objetivoestudio` (`id_objetivoEstudio`);

--
-- Filtros para la tabla `usuario_has_distraccion`
--
ALTER TABLE `usuario_has_distraccion`
  ADD CONSTRAINT `usuario_has_distraccion_ibfk_1` FOREIGN KEY (`Usuario_id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `usuario_has_distraccion_ibfk_2` FOREIGN KEY (`id_distracciones`) REFERENCES `distracciones` (`idDistracciones`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
