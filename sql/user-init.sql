USE wiki;

CREATE TABLE t_resources (
  resources_id INT PRIMARY KEY AUTO_INCREMENT,
  resources_name VARCHAR(30) NOT NULL,
  resources_url VARCHAR(30) NOT NULL,
  resources_type CHAR(2) NOT NULL,
  des VARCHAR(100)
);

CREATE TABLE t_resource_type (
  id CHAR(2) PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE t_active_user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  number INT NOT NULL,
  date VARCHAR(10) NOT NULL
);