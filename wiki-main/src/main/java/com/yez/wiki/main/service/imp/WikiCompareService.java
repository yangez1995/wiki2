package com.yez.wiki.main.service.imp;

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

}
