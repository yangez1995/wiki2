package com.yez.wiki.entity.user;

import java.util.List;

public class UserRolesId {
	private int userId;
	private List<Integer> rolesId;
	
	
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public List<Integer> getRolesId() {
		return rolesId;
	}
	public void setRolesId(List<Integer> rolesId) {
		this.rolesId = rolesId;
	}
	@Override
	public String toString() {
		System.out.println(userId);
		for(Integer i : rolesId) {
			System.out.println(i.intValue());
		}
		return "RoleAuthsId [roleId=" + userId + ", authsId=" + rolesId + "]";
	}
}
