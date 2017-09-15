package com.yez.wiki.entity.user;

import java.util.List;

public class ResourceAuthority {
	private int id;
	private String name;
	private String url;
	private List<Authority> auths;
	
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
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public List<Authority> getAuths() {
		return auths;
	}
	public void setAuths(List<Authority> auths) {
		this.auths = auths;
	}
	
	
}
