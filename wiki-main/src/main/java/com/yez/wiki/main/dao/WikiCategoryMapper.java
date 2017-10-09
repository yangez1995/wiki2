package com.yez.wiki.main.dao;

import java.util.List;
import java.util.Map;

public interface WikiCategoryMapper {
	public void insert(Map<String, Object> map);
	public List<Object> getPage(Map<String, Object> map);
}
