package com.yez.wiki.main.service.imp;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.main.dao.WikiHistoryMapper;
import com.yez.wiki.main.service.IWikiHistoryService;

@Service
public class WikiHistoryService implements IWikiHistoryService {
	@Autowired
	private WikiHistoryMapper wikiHistoryMapper;
	
	@Override
	public List<Object> getHistorys(Map<String, Object> map) {
		return wikiHistoryMapper.getHistoryByWikiId(map);
	}

}
