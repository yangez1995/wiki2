package com.yez.wiki.main.dao;

import java.util.Map;

import com.yez.wiki.entity.wiki.Wiki;

public interface WikiCreateMapper {
	public void newWiki(Wiki wiki);
	public void newChapter(Map<String, Object> map);
}
