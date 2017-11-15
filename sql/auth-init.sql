/*系统管理权限*/
INSERT INTO t_authority (authority_id, authority_name, authority_mark, des) VALUES (1, "超级系统管理权限", "SUPER_ADMIN", "最高级系统管理权限");
INSERT INTO t_authority (authority_id, authority_name, authority_mark, des) VALUES (2, "高级系统管理权限", "SYS_ADMIN_SENIOR", "较高级系统管理权限");
INSERT INTO t_authority (authority_id, authority_name, authority_mark, des) VALUES (3, "系统管理权限", "SYS_ADMIN", "普通系统管理权限");

/*用户权限*/
INSERT INTO t_authority (authority_id, authority_name, authority_mark, des) VALUES (4, "普通用户权限", "USER", "最普通用户权限");