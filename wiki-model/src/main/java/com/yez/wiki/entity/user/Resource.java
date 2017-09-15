package com.yez.wiki.entity.user;

public class Resource {
	private int id;
	private String name;
	private String type;
	private String url;
	private String describe;
	
	public Resource() {}
	public Resource(String name, String type, String url, String describe) {
		this.name = name;
		this.type = type;
		this.url = url;
		this.describe = describe;
	}
	public Resource(int id, String name, String type, String url, String describe) {
		this.id = id;
		this.name = name;
		this.type = type;
		this.url = url;
		this.describe = describe;
	}
	
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
	@Override
	public String toString() {
		return "Resource [id=" + id + ", name=" + name + ", type=" + type + ", url=" + url + ", describe=" + describe
				+ "]";
	}
}
