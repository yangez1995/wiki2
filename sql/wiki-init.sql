USE wiki;

CREATE TABLE t_wiki (
  id INT PRIMARY KEY AUTO_INCREMENT,
  main_title VARCHAR(30),
  synonym_title VARCHAR(300),
  sub_title VARCHAR(30),
  des VARCHAR(500),
  level CHAR(1),
  version INT,
  create_by INT,
  create_date CHAR(20)
);

CREATE TABLE t_label (
  id INT PRIMARY KEY AUTO_INCREMENT,
  wiki_id INT,
  ser_num INT,
  name VARCHAR(6),
  content VARCHAR(20)
);
ALTER TABLE t_label ADD CONSTRAINT del_label FOREIGN KEY (wiki_id) REFERENCES t_wiki(id) ON DELETE CASCADE;

CREATE TABLE t_gene (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(10)
);

CREATE TABLE t_wiki_gene (
  id INT PRIMARY KEY AUTO_INCREMENT,
  wiki_id INT,
  gene_id INT
);
ALTER TABLE t_wiki_gene ADD CONSTRAINT del_wiki_gene FOREIGN KEY (wiki_id) REFERENCES t_wiki(id) ON DELETE CASCADE;

CREATE TABLE t_chapter (
  id INT PRIMARY KEY AUTO_INCREMENT,
  wiki_id INT,
  ser_num INT,
  title VARCHAR(30),
  content VARCHAR(2000)
);
ALTER TABLE t_chapter ADD CONSTRAINT del_chapter FOREIGN KEY (wiki_id) REFERENCES t_wiki(id) ON DELETE CASCADE;

CREATE TABLE t_chapter_child (
  id INT PRIMARY KEY AUTO_INCREMENT,
  parent_id INT,
  ser_num INT,
  title VARCHAR(30),
  content VARCHAR(2000)
);
ALTER TABLE t_chapter_child ADD CONSTRAINT del_chapter_child FOREIGN KEY (parent_id) REFERENCES t_chapter(id) ON DELETE CASCADE;