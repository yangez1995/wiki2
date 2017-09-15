package com.yez.wiki.entity.user;

import java.util.List;

public class RoleAuthsId {
	private int roleId;
	private List<Integer> authsId;
	
	public int getRoleId() {
		return roleId;
	}
	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}
	public List<Integer> getAuthsId() {
		return authsId;
	}
	public void setAuthsId(List<Integer> authsId) {
		this.authsId = authsId;
	}
	@Override
	public String toString() {
		System.out.println(roleId);
		for(Integer i : authsId) {
			System.out.println(i.intValue());
		}
		return "RoleAuthsId [roleId=" + roleId + ", authsId=" + authsId + "]";
	}
}
