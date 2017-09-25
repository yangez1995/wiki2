package com.yez.wiki.main.service;

import java.util.Map;

import com.yez.wiki.entity.wiki.AnimeWiki;
import com.yez.wiki.entity.wiki.StandardWiki;

public interface IWikiService {
	public StandardWiki getWikiById(int id);
	public AnimeWiki getAnimeWiki(int id);
	public int newSimpleWiki(Map<String, Object> map);
}
