package com.yez.wiki.user.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

public interface AdminRoleMapper {
	public List<Integer> getUserIdByRoleId(@Param("roleId")int id);
}
