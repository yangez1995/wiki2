package com.yez.wiki.main.service.imp;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.entity.wiki.AnimeWiki;
import com.yez.wiki.entity.wiki.StandardWiki;
import com.yez.wiki.main.dao.WikiMapper;
import com.yez.wiki.main.service.IWikiService;

@Service
public class WikiService implements IWikiService {
	@Autowired
	private WikiMapper wikiMapper;
	
	@Override
	public int newSimpleWiki(Map<String, Object> map) {
		wikiMapper.newSimpleWiki(map);
		return (int)map.get("id");
	}

	@Override
	public StandardWiki getWikiById(int id) {
		return wikiMapper.getWikiById(id);
	}

	@Override
	public AnimeWiki getAnimeWiki(int id) {
		return wikiMapper.getAnimeWiki(id);
	}
}
