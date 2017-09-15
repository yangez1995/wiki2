package com.yez.wiki.factory;

import java.util.HashMap;
import java.util.Map;

import com.yez.wiki.entity.wiki.Label;

public class LabelFactory {
	public static Label product() {
		return new Label();
	}
	
	public static Label product(int id, int wikiId, int serNum, String name, String content) {
		return new Label(id, wikiId, serNum, name, content);
	}
	
	public static Label product(Map<String, Object> map) {
		int id = (int)map.get("id");
		int wikiId = (int)map.get("wikiId");
		int serNum = (int)map.get("serNum");
		String name = (String)map.get("name");
		String content = (String)map.get("content");
		return new Label(id, wikiId, serNum, name, content);
	}
	
	public static Map<String, Object> decompose(Label label) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", label.getId());
		map.put("wikiId", label.getWikiId());
		map.put("serNum", label.getSerNum());
		map.put("name", label.getName());
		map.put("content", label.getContent());
		return map;
	}
	
	public static Map<String, Object> decomposeHistory(Label label) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("labelId", label.getId());
		map.put("wikiId", label.getWikiId());
		map.put("serNum", label.getSerNum());
		map.put("name", label.getName());
		map.put("content", label.getContent());
		return map;
	}
}
