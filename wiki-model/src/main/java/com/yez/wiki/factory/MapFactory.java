package com.yez.wiki.factory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.yez.wiki.entity.user.OneToMoreIds;
import com.yez.wiki.entity.wiki.StandardWiki;
import com.yez.wiki.util.PageUtil;
import com.yez.wiki.util.StringUtil;
import com.yez.wiki.util.TimeUtil;

public class MapFactory {
	public static Map<String, Object> pageMap(int pageIndex, int pageSize) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("startIndex", PageUtil.pageIndexToStartIndex(pageIndex, pageSize));
		map.put("pageSize", pageSize);
		return map;
	}
	
	//新增String
	public static void machiningString(Map<String, Object> map, String key, String value) {
		if(!StringUtil.isEmpty(value)) {
			map.put(key, value);
		}
	}
	//新增int
	public static void machiningInt(Map<String, Object> map, String key, String value) {
		if(!StringUtil.isEmpty(value) && StringUtil.isInteger(value)) {
			map.put(key, Integer.parseInt(value));
		}
	}
	
	//新增list
	public static <T> void machiningList(Map<String, Object> map, String key, List<T> list) {
		if(list != null && !list.isEmpty()) {
			map.put(key, list);
		}
	}
	
	public static Map<String, Object> oneToMoreIdsMap(OneToMoreIds ids) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", ids.getId());
		map.put("list", ids.getIds());
		return map;
	}
	
	public static Map<String, Object> standardWikiMap(StandardWiki wiki) {
		Map<String, Object> map = new HashMap<String, Object>();
		machiningInt(map, "id", wiki.getId() + "");
		machiningString(map, "title", wiki.getTitle());
		machiningString(map, "synonym", wiki.getSynonym());
		machiningString(map, "subTitle", wiki.getSubTitle());
		machiningString(map, "describe", wiki.getDescribe());
		machiningList(map, "labels", wiki.getLabels());
		machiningList(map, "gene", wiki.getGene());
		machiningList(map, "chapters", wiki.getChapters());
		machiningInt(map, "version", wiki.getVersion() + "");
		machiningInt(map, "createBy", wiki.getCreateBy() + "");
		return map;
	}
	
	public static Map<String, Object> wikiHistoryMap(int wikiId, int version, String changeTable, int editBy) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("wikiId", wikiId);
		map.put("version", version);
		map.put("changeTable", changeTable);
		map.put("editBy", editBy);
		map.put("editTime", TimeUtil.getNowTime());
		return map;
	}
}
