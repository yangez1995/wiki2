package com.yez.wiki.main.dao;

import java.util.List;
import java.util.Map;

public interface WikiCompareMapper {
	public List<Object> card(Map<String, Object> map);
	public List<Object> label(Map<String, Object> map);
	public List<Object> catal(Map<String, Object> map);
	public Map<String, Object> chapter(Map<String, Object> map);
	public List<Object> child(Map<String, Object> map);
}
