/*------------------------------------角色配置----------------------------------------------*/

/*系统管理员*/
INSERT INTO t_role (role_id, role_name, des) VALUES (1, "超级管理员", "最高权限管理员");
INSERT INTO t_role (role_id, role_name, des) VALUES (2, "高级系统管理员", "拥有较高权限的系统管理员");
INSERT INTO t_role (role_id, role_name, des) VALUES (3, "系统管理员", "普通的系统管理员");

/*用户*/
INSERT INTO t_role (role_name, des) VALUES (4, "普通用户","最基础的用户角色");


/*------------------------------------角色权限配置----------------------------------------------*/

/*系统管理员权限*/
INSERT INTO t_role_authorities (role_id, authority_id) VALUES (1, 1);--超级管理员>超级系统管理权限
INSERT INTO t_role_authorities (role_id, authority_id) VALUES (2, 2);--高级系统管理员>高级系统管理权限
INSERT INTO t_role_authorities (role_id, authority_id) VALUES (3, 3);--系统管理员>系统管理权限

/*用户权限*/
INSERT INTO t_role_authorities (role_id, authority_id) VALUES (4, 4);--普通用户>普通用户权限