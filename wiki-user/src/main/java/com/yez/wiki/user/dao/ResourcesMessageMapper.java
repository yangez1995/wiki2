package com.yez.wiki.user.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.yez.wiki.entity.user.Resource;

public interface ResourcesMessageMapper {
	public void insert(Resource resource);
	public void delete(@Param("id")int id);
	public void update(Resource resource);
	public List<Object> getPage(Map<String, Object> map);
	public int getNumber(Map<String, Object> map);
	public List<Object> getType();
}
