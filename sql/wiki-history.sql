CREATE TABLE t_wiki_history(
  id INT PRIMARY KEY AUTO_INCREMENT,
  wiki_id INT NOT NULL,
  version INT NOT NULL,
  change_table VARCHAR(30) NOT NULL,
  edit_by INT NOT NULL,
  edit_time DATETIME NOT NULL
);
ALTER TABLE t_wiki_history ADD CONSTRAINT del_wiki_history FOREIGN KEY (wiki_id) REFERENCES t_wiki(id) ON DELETE CASCADE;

CREATE TABLE t_card_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  wiki_id INT NOT NULL,
  history_id INT NOT NULL,
  sub_title VARCHAR(30),
  des VARCHAR(500),
  version INT NOT NULL
);
ALTER TABLE t_card_history ADD CONSTRAINT del_card_history FOREIGN KEY (wiki_id) REFERENCES t_wiki(id) ON DELETE CASCADE;

CREATE TABLE t_label_history(
  id INT PRIMARY KEY AUTO_INCREMENT,
  wiki_id INT NOT NULL,
  label_id INT NOT NULL,
  history_id INT NOT NULL,
  version INT NOT NULL,
  ser_num TINYINT NOT NULL,
  change_type TINYINT NOT NULL,
  name VARCHAR(6) NOT NULL,
  content VARCHAR(20) NOT NULL
);
ALTER TABLE t_label_history ADD CONSTRAINT del_label_history FOREIGN KEY (wiki_id) REFERENCES t_wiki(id) ON DELETE CASCADE;

CREATE TABLE t_chapter_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  wiki_id INT NOT NULL,
  chapter_id INT NOT NULL,
  history_id INT NOT NULL,
  version INT NOT NULL,
  change_type TINYINT NOT NULL，
  ser_num TINYINT NOT NULL,
  title VARCHAR(30) NOT NULL,
  content VARCHAR(2000),
);
ALTER TABLE t_chapter_history ADD CONSTRAINT del_chapter_history FOREIGN KEY (wiki_id) REFERENCES t_wiki(id) ON DELETE CASCADE;

CREATE TABLE t_chapter_child_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  parent_id INT NOT NULL,
  child_id INT NOT NULL,
  history_id INT NOT NULL,
  version INT NOT NULL,
  ser_num TINYINT NOT NULL,
  change_type TINYINT NOT NULL
  title VARCHAR(30) NOT NULL,
  content VARCHAR(2000),
);
ALTER TABLE t_chapter_child_history ADD CONSTRAINT del_chapter_child_history FOREIGN KEY (parent_id) REFERENCES t_chapter(id) ON DELETE CASCADE;