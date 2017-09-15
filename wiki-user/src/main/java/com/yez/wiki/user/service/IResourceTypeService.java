package com.yez.wiki.user.service;

import java.util.Map;

import com.yez.wiki.entity.ResponseMessage;

public interface IResourceTypeService {
	public ResponseMessage insert(String id, String name);
	public ResponseMessage delete(String id);
	public ResponseMessage update(Map<String, Object> map);
	public ResponseMessage getPage(Map<String, Object> map);
	public ResponseMessage getNumber();
}
