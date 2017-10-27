package com.yez.wiki.user.service;

public interface IAdminRoleService {
	public boolean isHasAuthority(int onLoginId, int updateId);
}
