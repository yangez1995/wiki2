package com.yez.wiki.entity.user;

import java.util.List;

/**
 * 用户对应角色集合类
 * @author 杨恩哲
 */
public class UserRole {
	private int id;//用户id
	private String username;//用户名
	private List<Role> roles;//用户对应角色列表
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public List<Role> getRoles() {
		return roles;
	}
	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}
	@Override
	public String toString() {
		return "UserRole [id=" + id + ", username=" + username + ", roles=" + roles + "]";
	}
}
