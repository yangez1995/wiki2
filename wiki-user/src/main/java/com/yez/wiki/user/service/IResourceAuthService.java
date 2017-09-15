package com.yez.wiki.user.service;

import java.util.List;
import java.util.Map;

import com.yez.wiki.entity.ResponseMessage;

public interface IResourceAuthService {
	public ResponseMessage getPage(Map<String, Object> map);
	public ResponseMessage getNumber(Map<String, Object> map);
	public List<Object> getOtherAuths(int id);
	public List<Object> getAuthsByResourceId(int id);
	public List<Object> getAllAuths();
	public ResponseMessage delete(Map<String, Object> map);
	public ResponseMessage insert(Map<String, Object> map);
}
