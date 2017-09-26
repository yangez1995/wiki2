package com.yez.wiki.main.service.imp;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.entity.wiki.Wiki;
import com.yez.wiki.main.dao.WikiCreateMapper;
import com.yez.wiki.main.service.IWIkiCreateService;
import com.yez.wiki.util.StringUtil;

@Service
public class WIkiCreateService implements IWIkiCreateService {
	@Autowired
	private WikiCreateMapper wikiCreateMapper;
	
	@Override
	public ResponseMessage newSimpleWiki(Wiki wiki) {
		if(StringUtil.isEmpty(wiki.getTitle())) {
			return ResponseMessage.fail("标题不能为空");
		}
		wikiCreateMapper.newWiki(wiki);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("wikiId", wiki.getId());
		map.put("title", "点击编辑按钮编辑章节");
		map.put("serNum", 1);
		wikiCreateMapper.newChapter(map);
		return ResponseMessage.success();
	}

	@Override
	public ResponseMessage newStandardWiki(Wiki wiki) {
		if(StringUtil.isEmpty(wiki.getTitle())) {
			return ResponseMessage.fail("标题不能为空");
		}
		wikiCreateMapper.newWiki(wiki);
		return ResponseMessage.success();
	}

	@Override
	public ResponseMessage newAnimeWiki(Wiki wiki) {
		if(StringUtil.isEmpty(wiki.getTitle())) {
			return ResponseMessage.fail("标题不能为空");
		}
		wikiCreateMapper.newWiki(wiki);
		return ResponseMessage.success();
	}
}
