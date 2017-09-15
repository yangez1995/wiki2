package com.yez.wiki.user.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface ResourceAuthMapper {
	public List<Object> searchPage(Map<String, Object> map);
	public int searchNumber(Map<String, Object> map);
	public List<Object> getOtherAuths(@Param("id")int id);
	public List<Object> getAuthsByResourceId(@Param("id")int id);
	public List<Object> getAllAuths();
	public void delete(Map<String, Object> map);
	public void insert(Map<String, Object> map);
}
