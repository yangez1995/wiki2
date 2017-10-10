package com.yez.wiki.main.service.imp;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.factory.MapFactory;
import com.yez.wiki.main.dao.WikiMessageMapper;
import com.yez.wiki.main.service.IWikiMessageService;

@Service
public class WikiMessageService implements IWikiMessageService {
	@Autowired
	private WikiMessageMapper wikiMessageMapper;
	
	@Override
	public ResponseMessage getPage(Map<String, Object> map) {
		return ResponseMessage.success(MapFactory.pageAndSize(wikiMessageMapper.getPage(map), wikiMessageMapper.getNumber(map)));
	}

}
