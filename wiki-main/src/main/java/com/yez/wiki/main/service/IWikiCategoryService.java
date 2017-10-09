package com.yez.wiki.main.service;

import java.util.Map;

import com.yez.wiki.entity.ResponseMessage;

public interface IWikiCategoryService {
	public ResponseMessage insert(String id, String name);
	public ResponseMessage getPage(Map<String, Object> map);
}
