package com.yez.wiki.entity.user;
/**
 * 角色类
 * @author 杨恩哲
 */
public class Role {
	private int id;//角色id
	private String name;//角色名
	private String describe;//角色描述
	
	public Role() {}
	public Role(String name, String describe) {
		this.name = name;
		this.describe = describe;
	}
	public Role(int id, String name, String describe) {
		this.id = id;
		this.name = name;
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
	public String getDescribe() {
		return describe;
	}
	public void setDescribe(String describe) {
		this.describe = describe;
	}
	
	@Override
	public String toString() {
		return "Role [id=" + id + ", name=" + name + ", describe=" + describe + "]";
	}
}
