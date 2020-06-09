CREATE database TODO;
use TODO;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(20) NOT NULL,
  password varchar(100) NOT NULL,
  email varchar(50),
  primary key (id)
);

CREATE TABLE `todo`.`todos` todos(
  id INT NOT NULL AUTO_INCREMENT,
  description VARCHAR(200) NOT NULL,
  dueDate DATETIME NOT NULL,
  creationDate DATETIME NOT NULL DEFAULT now(),
  complete TINYINT NOT NULL DEFAULT 0,
  userId INT NULL,users
  PRIMARY KEY (id))
ENGINE = InnoDB;