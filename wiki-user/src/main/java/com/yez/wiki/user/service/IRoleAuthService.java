package com.yez.wiki.user.service;

import java.util.List;
import java.util.Map;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.entity.user.Authority;
import com.yez.wiki.entity.user.RoleAuthority;
import com.yez.wiki.entity.user.RoleAuthsId;

public interface IRoleAuthService {
	public List<RoleAuthority> getPage(Map<String, Object> map);
	public int getCount(Map<String, Object> map);
	public List<Authority> getOtherAuths(List<Integer> list);
	public ResponseMessage update(RoleAuthsId ids);
	/*public List<RoleAuthority> selectRoleAuthority(int pageIndex, int pageSize);
	public boolean checkRoleNameExist(String name);
	public boolean removeRoleAuth(int roleId, int authId);
	public boolean addRoleAuth(int roleId, int authId);*/
}
