package com.yez.wiki.main.service;

import java.util.List;
import java.util.Map;

import com.yez.wiki.entity.ResponseMessage;

public interface IWikiMessageService {
	public ResponseMessage getPage(Map<String, Object> map);
	public List<Object> getCategory();
	public List<Object> getAuth();
}
