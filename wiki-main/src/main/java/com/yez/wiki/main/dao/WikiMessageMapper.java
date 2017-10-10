package com.yez.wiki.main.dao;

import java.util.List;
import java.util.Map;

public interface WikiMessageMapper {
	public List<Object> getPage(Map<String, Object> map);
	public int getNumber(Map<String, Object> map);
}
