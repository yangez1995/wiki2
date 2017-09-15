package com.yez.wiki.user.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.user.dao.ResourceAuthMapper;
import com.yez.wiki.user.service.IResourceAuthService;
import com.yez.wiki.util.PageUtil;

@Service
public class ResourceAuthService implements IResourceAuthService {
	@Autowired
	private ResourceAuthMapper resourceAuthMapper;

	@Override
	public ResponseMessage getPage(Map<String, Object> map) {
		return ResponseMessage.success(resourceAuthMapper.searchPage(map));
	}

	@Override
	public ResponseMessage getNumber(Map<String, Object> map) {
		return ResponseMessage.success(PageUtil.numberToPage(resourceAuthMapper.searchNumber(map), 10));
	}

	@Override
	public List<Object> getOtherAuths(int id) {
		return resourceAuthMapper.getOtherAuths(id);
	}
	
	@Override
	public List<Object> getAuthsByResourceId(int id) {
		return resourceAuthMapper.getAuthsByResourceId(id);
	}
	
	@Override
	public List<Object> getAllAuths() {
		return resourceAuthMapper.getAllAuths();
	}
	
	@Override
	public ResponseMessage delete(Map<String, Object> map) {
		resourceAuthMapper.delete(map);
		return ResponseMessage.success();
	}

	@Override
	public ResponseMessage insert(Map<String, Object> map) {
		resourceAuthMapper.insert(map);
		return ResponseMessage.success();
	}
}
