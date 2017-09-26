package com.yez.wiki.main.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.yez.wiki.entity.wiki.AnimeWiki;
import com.yez.wiki.entity.wiki.SimpleWiki;
import com.yez.wiki.entity.wiki.StandardWiki;

public interface WikiMapper {
	public StandardWiki getStandardWiki(@Param("id")int id);
	public AnimeWiki getAnimeWiki(@Param("id")int id);
	public SimpleWiki getSimpleWiki(@Param("id")int id);
	public void newSimpleWiki(Map<String, Object> map);
}
