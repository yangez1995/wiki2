package com.yez.wiki.user.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface ResourceTypeMapper {
	public void insert(Map<String, Object> map);
	public void delete(@Param("id")String id);
	public void update(Map<String, Object> map);
	public List<Object> getPage(Map<String, Object> map);
	public int getNumber(Map<String, Object> map);
}
