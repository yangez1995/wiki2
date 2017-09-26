package com.yez.wiki.main.service.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.entity.wiki.AnimeWiki;
import com.yez.wiki.entity.wiki.SimpleWiki;
import com.yez.wiki.entity.wiki.StandardWiki;
import com.yez.wiki.main.dao.WikiMapper;
import com.yez.wiki.main.service.IWikiService;

@Service
public class WikiService implements IWikiService {
	@Autowired
	private WikiMapper wikiMapper;

	@Override
	public StandardWiki getStandardWiki(int id) {
		return wikiMapper.getStandardWiki(id);
	}

	@Override
	public AnimeWiki getAnimeWiki(int id) {
		return wikiMapper.getAnimeWiki(id);
	}

	@Override
	public SimpleWiki getSimpleWiki(int id) {
		return wikiMapper.getSimpleWiki(id);
	}
}
