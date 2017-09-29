package com.yez.wiki.main.service;

import com.yez.wiki.entity.ResponseMessage;

public interface IWikiSearchLogService {
	public ResponseMessage insert(String search, int userId);
}
