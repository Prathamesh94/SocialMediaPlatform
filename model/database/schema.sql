CREATE DATABASE users_db;
use users_db;
DROP TABLE users;
CREATE TABLE users(
user_id varchar(255) NOT NULL ,
first_name varchar(255) NOT NULL,
last_name  varchar(255) NOT NULL,
avatar_file_path  mediumtext,
PRIMARY KEY(user_id));
CREATE TABLE friends(
user_id varchar(255) NOT NULL,
friend_id varchar(255) NOT NULL,
relationship_id varchar(255) NOT NULL,
FOREIGN KEY (user_id) REFERENCES users(user_id),
FOREIGN KEY (friend_id) REFERENCES users(user_id),
PRIMARY KEY(relationship_id)
)


use users_db;
DROP TABLE friends;
DROP TABLE users;
CREATE TABLE users(
user_id varchar(255) NOT NULL ,
first_name varchar(255) NOT NULL,
last_name  varchar(255) NOT NULL,
avatar_file_path  mediumtext,
PRIMARY KEY(user_id));
CREATE TABLE friends(
user_id varchar(255) NOT NULL,
friend_id varchar(255) NOT NULL,
relationship_id varchar(255) NOT NULL,
FOREIGN KEY (user_id) REFERENCES users(user_id),
FOREIGN KEY (friend_id) REFERENCES users(user_id),
PRIMARY KEY(relationship_id)
);