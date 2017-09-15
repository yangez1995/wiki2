package com.yez.wiki.main.dao;

import java.util.List;
import java.util.Map;

public interface WikiHistoryMapper {
	public List<Object> getHistoryByWikiId(Map<String, Object> map);
}
