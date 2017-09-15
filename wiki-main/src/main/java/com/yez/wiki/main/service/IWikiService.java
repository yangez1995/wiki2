package com.yez.wiki.main.service;

import java.util.Map;

import com.yez.wiki.entity.wiki.Wiki;

public interface IWikiService {
	public Wiki getWikiById(int id);
	public int newSimpleWiki(Map<String, Object> map);
}
