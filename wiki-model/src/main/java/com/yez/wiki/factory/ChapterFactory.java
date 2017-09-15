package com.yez.wiki.factory;

import java.util.HashMap;
import java.util.Map;

import com.yez.wiki.entity.wiki.Chapter;

public class ChapterFactory {
	public static Chapter product() {
		return new Chapter();
	}
	
	public static Chapter product(int id, int wikiId, int serNum, String title, String content) {
		return new Chapter(id, wikiId, serNum, title, content);
	}
	
	public static Chapter product(Map<String, Object> map) {
		int id = (int)map.get("id");
		int wikiId = (int)map.get("wikiId");
		int serNum = (int)map.get("serNum");
		String title = (String)map.get("title");
		String content = (String)map.get("content");
		return new Chapter(id, wikiId, serNum, title, content);
	}
	
	public static Map<String, Object> decomposeHistory(Chapter chapter) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("chapterId", chapter.getId());
		map.put("wikiId", chapter.getWikiId());
		map.put("serNum", chapter.getSerNum());
		map.put("title", chapter.getTitle());
		map.put("content", chapter.getContent());
		return map;
	}
}
