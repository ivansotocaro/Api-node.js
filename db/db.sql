CREATE DATABASE db;
USE db;

CREATE TABLE person(
    id int(10) PRIMARY KEY AUTO_INCREMENT,
    name varchar(200) NOT NULL,
    age int(10) NOT NULL,
    document  bigint NOT NULL
); 