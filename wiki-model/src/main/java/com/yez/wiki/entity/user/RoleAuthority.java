package com.yez.wiki.entity.user;

import java.util.List;

public class RoleAuthority {
	private int id;
	private String name;
	private List<Authority> authorities;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<Authority> getAuthorities() {
		return authorities;
	}
	public void setAuthorities(List<Authority> authorities) {
		this.authorities = authorities;
	}
	@Override
	public String toString() {
		return "RoleAuthority [id=" + id + ", name=" + name + ", authorities=" + authorities + "]";
	}
}
