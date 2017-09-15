package com.yez.wiki.entity.security;

import java.util.Collection;

import org.springframework.security.access.ConfigAttribute;

public class SecurityResources {
	private int id;
	private String name;
	private String type;
	private String url;
	private String describe;
	private Collection<ConfigAttribute> authorities;
	
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
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getDescribe() {
		return describe;
	}
	public void setDescribe(String describe) {
		this.describe = describe;
	}
	public Collection<ConfigAttribute> getAuthorities() {
		return authorities;
	}
	public void setAuthorities(Collection<ConfigAttribute> authorities) {
		this.authorities = authorities;
	}
}
