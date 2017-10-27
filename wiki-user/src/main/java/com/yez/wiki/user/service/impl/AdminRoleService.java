package com.yez.wiki.user.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.user.config.RoleConfig;
import com.yez.wiki.user.dao.AdminRoleMapper;
import com.yez.wiki.user.service.IAdminRoleService;

@Service
public class AdminRoleService implements IAdminRoleService {
	private static Map<Integer, Integer> adminMap;
	
	@Autowired
	private AdminRoleMapper adminRoleMapper;
	
	private void init() {
		adminMap = new HashMap<Integer, Integer>();
		for(Integer id : getUserIdByRoleId(RoleConfig.SYS_ADMIN_ROLE_ID)) {
			adminMap.put(id, 2);
		}
		for(Integer id : getUserIdByRoleId(RoleConfig.SYS_ADMIN_SENIOR_ROLE_ID)) {
			adminMap.put(id, 1);
		}
		for(Integer id : getUserIdByRoleId(RoleConfig.SUPER_ADMIN_ROLE_ID)) {
			adminMap.put(id, 0);
		}
	}
	
	private List<Integer> getUserIdByRoleId(int roleId) {
		return adminRoleMapper.getUserIdByRoleId(roleId);
	}

	@Override
	public boolean isHasAuthority(int onLoginId, int updateId) {
		if(adminMap == null) {
			init();
		}
		if(adminMap.get(updateId) == null) {
			return true;
		}
		int onLoginRole = adminMap.get(onLoginId);
		int updateRole = adminMap.get(updateId);
		return onLoginRole < updateRole ? true : false;
	}
}
