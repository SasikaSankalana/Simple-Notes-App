CREATE DATABASE IF NOT EXISTS `notesDB`;
USE `notesDB`;


CREATE TABLE IF NOT EXISTS `notes` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    note mediumtext,
    created_date date,
    modified_date date
);