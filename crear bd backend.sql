CREATE SCHEMA IF NOT EXISTS `backend` DEFAULT CHARACTER SET utf8 ;
USE `backend` ;

create table if not exists `persona` (
`dni` INT  NOT NULL,
`nombre` varchar(30) NOT NULL,
`apellido` varchar(30) NOT NULL,
PRIMARY KEY(`dni`));

create table if not exists `usuario` (
`mail` varchar(40)  NOT NULL,
`nickname` varchar(20) NOT NULL,
`password` varchar(20) NOT NULL,
PRIMARY KEY(`mail`));