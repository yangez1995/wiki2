package com.yez.wiki.user.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.yez.wiki.entity.user.Authority;

public interface ResourceAuthMapper {
	public void addAuths(Map<String, Object> map);
	public void deleteAuths(Map<String, Object> map);
	public void deleteAllAuths(@Param("resourceId")int resourceId);
	
	public List<Object> searchPage(Map<String, Object> map);
	public int searchNumber(Map<String, Object> map);
	public List<Authority> getOtherAuths(List<Integer> list);
	public List<Object> getAllAuths();
	public List<Integer> getAuthsId(@Param("resourceId") int resourceId);
}
