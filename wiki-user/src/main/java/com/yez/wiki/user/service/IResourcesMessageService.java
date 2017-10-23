package com.yez.wiki.user.service;

import java.util.List;
import java.util.Map;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.entity.user.Resource;

public interface IResourcesMessageService {
	public ResponseMessage insert(Resource resource);
	public ResponseMessage delete(int id);
	public ResponseMessage update(Resource resource);
	public ResponseMessage getPage(Map<String, Object> map);
	public List<Object> getType();
}
