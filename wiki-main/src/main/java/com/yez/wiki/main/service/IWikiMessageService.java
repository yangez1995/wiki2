package com.yez.wiki.main.service;

import java.util.Map;

import com.yez.wiki.entity.ResponseMessage;

public interface IWikiMessageService {
	public ResponseMessage getPage(Map<String, Object> map);
}
