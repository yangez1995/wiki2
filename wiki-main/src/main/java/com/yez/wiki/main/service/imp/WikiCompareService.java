package com.yez.wiki.main.service.imp;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.main.dao.WikiCompareMapper;
import com.yez.wiki.main.service.IWikiCompareService;

@Service
public class WikiCompareService implements IWikiCompareService {
	@Autowired
	private WikiCompareMapper wikiCompareMapper;
	
	@Override
	public ResponseMessage card(Map<String, Object> map) {
		return ResponseMessage.success(wikiCompareMapper.card(map));
	}

	@Override
	public ResponseMessage label(Map<String, Object> map) {
		return ResponseMessage.success(wikiCompareMapper.label(map));
	}

	@Override
	public ResponseMessage catal(Map<String, Object> map) {
		return ResponseMessage.success(wikiCompareMapper.catal(map));
	}

	@Override
	public ResponseMessage chapter(Map<String, Object> map) {
		Map<String, Object> chapter = wikiCompareMapper.chapter(map);
		map.put("parentId", chapter.get("chapterId"));
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("chapter", chapter);
		resultMap.put("childs", wikiCompareMapper.child(map));
		return ResponseMessage.success(resultMap);
	}

}
