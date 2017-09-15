package com.yez.wiki.entity.user;

/**
 * 用户权限类
 * @author 杨恩哲
 */
public class Authority {
	private int id;//权限id
	private String name;//权限名
	private String mark;//权限代号
	private String describe;//描述
	
	public Authority() {}
	public Authority(String name, String mark, String describe) {
		this.name = name;
		this.mark = mark;
		this.describe = describe;
	}
	public Authority(int id, String name, String mark, String describe) {
		this.id = id;
		this.name = name;
		this.mark = mark;
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
	public String getMark() {
		return mark;
	}
	public void setMark(String mark) {
		this.mark = mark;
	}
	public String getDescribe() {
		return describe;
	}
	public void setDescribe(String describe) {
		this.describe = describe;
	}
	@Override
	public String toString() {
		return "Authority [id=" + id + ", name=" + name + ", mark=" + mark + ", describe=" + describe + "]";
	}
}
