package com.yez.wiki.factory;

import java.util.HashMap;
import java.util.Map;

import com.yez.wiki.entity.wiki.ChildChapter;

public class ChildChapterFactory {
	public static ChildChapter product() {
		return new ChildChapter();
	}
	
	public static ChildChapter product(int id, int parentId, int serNum, String title, String content) {
		return new ChildChapter(id, parentId, serNum, title, content);
	}
	
	public static Map<String, Object> decomposeHistory(ChildChapter child) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("childId", child.getId());
		map.put("parentId", child.getParentId());
		map.put("serNum", child.getSerNum());
		map.put("title", child.getTitle());
		map.put("content", child.getContent());
		return map;
	}
}
