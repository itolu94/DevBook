CREATE DATABASE IF NOT EXISTS jrdevbook_db;
USE jrdevbook_db;

DROP TABLE IF EXISTS members;

CREATE TABLE userInfo (
userId int NOT NULL,
first_name varchar(255) NOT NULL,
last_name varchar(255) NOT NULL,
email varchar(255) NOT NULL,
birthday DATE NOT NULL,
signup_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (userId)
);

CREATE TABLE memberInfo (
id int NOT NULL AUTO_INCREMENT,
username varchar(255) NOT NULL,
password varchar(255) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE postInfo (
post varchar(255) NOT NULL
date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
authorId int NOT NULL,
postId int NOT NULL AUTO_INCREMENT,
PRIMARY KEY (postId)
);

CREATE TABLE comments (
comments varchar(355) NOT NULL
date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
commentId int NOT NULL,
PRIMARY KEY (commentId)
);


