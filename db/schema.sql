CREATE DATABASE IF NOT EXISTS jrdevbook_db;
USE jrdevbook_db;

DROP TABLE IF EXISTS members;

CREATE TABLE memberInfo (
id int NOT NULL AUTO_INCREMENT,
username varchar(255) NOT NULL,
password varchar(255) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE userInfo (
user_id int NOT NULL,
first_name varchar(255) NOT NULL,
last_name varchar(255) NOT NULL,
email varchar(255) NOT NULL,
birthday DATE NOT NULL,
signup_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);


CREATE TABLE postInfo (
id INT NOT NULL AUTO_INCREMENT,
post varchar(255) NOT NULL,
date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
authorId int NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE comments (
comments varchar(355) NOT NULL,
date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
commentId int NOT NULL,
PRIMARY KEY (commentId)
);


