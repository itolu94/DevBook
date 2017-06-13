CREATE DATABASE IF NOT EXISTS jrdevbook_db;
USE jrdevbook_db;

DROP TABLE IF EXISTS members;

<<<<<<< HEAD
CREATE TABLE memberInfo (
id int NOT NULL AUTO_INCREMENT,
username varchar(255) NOT NULL,
password varchar(255) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE userInfo (
user_id int NOT NULL,
=======
CREATE TABLE userInfo (
userId int NOT NULL,
>>>>>>> b79bc29bf1151fa7811c74e236030fb9d016c766
first_name varchar(255) NOT NULL,
last_name varchar(255) NOT NULL,
email varchar(255) NOT NULL,
birthday DATE NOT NULL,
signup_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
<<<<<<< HEAD
=======
PRIMARY KEY (userId)
>>>>>>> b79bc29bf1151fa7811c74e236030fb9d016c766
);


CREATE TABLE postInfo (
id INT NOT NULL AUTO_INCREMENT,
post varchar(255) NOT NULL,
date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
authorId int NOT NULL,
<<<<<<< HEAD
PRIMARY KEY (id)
=======
postId int NOT NULL AUTO_INCREMENT,
PRIMARY KEY (postId)
>>>>>>> b79bc29bf1151fa7811c74e236030fb9d016c766
);

CREATE TABLE comments (
comments varchar(355) NOT NULL,
date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
commentId int NOT NULL,
PRIMARY KEY (commentId)
);


