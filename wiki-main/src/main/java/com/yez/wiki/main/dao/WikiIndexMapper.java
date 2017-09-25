package com.yez.wiki.main.dao;

import java.util.List;
import java.util.Map;

public interface WikiIndexMapper {
	public List<Object> getPage(Map<String, Object> map);
}
