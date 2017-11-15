/*------------------------------------资源类型配置----------------------------------------------*/
INSERT INTO t_resource_type (id, name) VALUES ("A0","系统管理");
INSERT INTO t_resource_type (id, name) VALUES ("A1","用户管理");
INSERT INTO t_resource_type (id, name) VALUES ("A2","角色管理");
INSERT INTO t_resource_type (id, name) VALUES ("A3","权限管理");
INSERT INTO t_resource_type (id, name) VALUES ("A4","资源管理");
INSERT INTO t_resource_type (id, name) VALUES ("A5","词条管理");

INSERT INTO t_resources (resources_id, resources_name, resources_url, resources_type, des) VALUES (1, "系统管理主页", "/admin/index", "A0", "系统管理主页，只有系统管理员可以进入。");