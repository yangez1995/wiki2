package com.yez.wiki.main.service.imp;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.main.dao.WikiIndexMapper;
import com.yez.wiki.main.service.IWikiIndexService;

@Service
public class WikiIndexService implements IWikiIndexService {
	@Autowired
	private WikiIndexMapper wikiIndexMapper;
	
	@Override
	public ResponseMessage getPage(Map<String, Object> map) {
		return ResponseMessage.success(wikiIndexMapper.getPage(map));
	}

}
