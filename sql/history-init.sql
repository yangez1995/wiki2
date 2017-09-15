CREATE TABLE t_wiki_history(
  id INT PRIMARY KEY AUTO_INCREMENT,
  wiki_id INT,
  version INT,
  change_table VARCHAR(30),
  edit_by INT,
  edit_time CHAR(20)
);
ALTER TABLE t_wiki_history ADD CONSTRAINT del_wiki_history FOREIGN KEY (wiki_id) REFERENCES t_wiki(id) ON DELETE CASCADE;

CREATE TABLE t_card_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  wiki_id INT,
  history_id INT,
  sub_title VARCHAR(30),
  des VARCHAR(500),
  version INT
);
ALTER TABLE t_card_history ADD CONSTRAINT del_card_history FOREIGN KEY (wiki_id) REFERENCES t_wiki(id) ON DELETE CASCADE;

CREATE TABLE t_label_history(
  id INT PRIMARY KEY AUTO_INCREMENT,
  wiki_id INT,
  label_id INT,
  history_id INT,
  version INT,
  ser_num INT,
  name VARCHAR(6),
  content VARCHAR(20),
  change_type VARCHAR(10)
);
ALTER TABLE t_label_history ADD CONSTRAINT del_label_history FOREIGN KEY (wiki_id) REFERENCES t_wiki(id) ON DELETE CASCADE;

CREATE TABLE t_chapter_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  wiki_id INT,
  chapter_id INT,
  history_id INT,
  ser_num INT,
  title VARCHAR(30),
  content VARCHAR(2000),
  version INT,
  change_type VARCHAR(10)
);
ALTER TABLE t_chapter_history ADD CONSTRAINT del_chapter_history FOREIGN KEY (wiki_id) REFERENCES t_wiki(id) ON DELETE CASCADE;

CREATE TABLE t_chapter_child_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  parent_id INT,
  child_id INT,
  history_id INT,
  ser_num INT,
  title VARCHAR(30),
  content VARCHAR(2000),
  version INT,
  change_type VARCHAR(10)
);
ALTER TABLE t_chapter_child_history ADD CONSTRAINT del_chapter_child_history FOREIGN KEY (parent_id) REFERENCES t_chapter(id) ON DELETE CASCADE;