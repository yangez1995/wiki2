package com.yez.wiki.main.service;

import com.yez.wiki.entity.wiki.AnimeWiki;
import com.yez.wiki.entity.wiki.SimpleWiki;
import com.yez.wiki.entity.wiki.StandardWiki;

public interface IWikiService {
	public StandardWiki getStandardWiki(int id);
	public AnimeWiki getAnimeWiki(int id);
	public SimpleWiki getSimpleWiki(int id);
}
