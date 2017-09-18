package com.yez.wiki.entity.user;

import java.util.List;

public class OneToMoreIds {
	private int id;
	private List<Integer> ids;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public List<Integer> getIds() {
		return ids;
	}
	public void setIds(List<Integer> ids) {
		this.ids = ids;
	}
}
