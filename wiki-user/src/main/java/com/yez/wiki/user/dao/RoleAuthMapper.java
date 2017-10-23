package com.yez.wiki.user.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.yez.wiki.entity.user.Authority;
import com.yez.wiki.entity.user.RoleAuthority;

public interface RoleAuthMapper {
	public void addAuths(Map<String, Object> map);
	public void deleteAuths(Map<String, Object> map);
	public void deleteAllAuths(@Param("roleId")int roleId);
	public List<RoleAuthority> getPage(Map<String, Object> map);
	public int getCount(Map<String, Object> map);
	public List<Authority> getOtherAuths(List<Integer> list);
	public List<Integer> getAuthsId(@Param("roleId")int roleId);
	public List<Object> getAuths();
}
