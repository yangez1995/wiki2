USE wiki;

CREATE TABLE t_search_log (
	id int PRIMARY KEY AUTO_INCREMENT,
	user_id int NOT NULL,
	content VARCHAR(30) NOT NULL,
	search_time DATETIME NOT NULL
);