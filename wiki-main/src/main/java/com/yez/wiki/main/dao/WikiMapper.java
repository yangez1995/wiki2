package com.yez.wiki.main.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.yez.wiki.entity.wiki.AnimeWiki;
import com.yez.wiki.entity.wiki.StandardWiki;

public interface WikiMapper {
	public StandardWiki getWikiById(@Param("id")int id);
	public AnimeWiki getAnimeWiki(@Param("id")int id);
	public void newSimpleWiki(Map<String, Object> map);
}
