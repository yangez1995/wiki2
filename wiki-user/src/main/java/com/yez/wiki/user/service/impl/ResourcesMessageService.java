package com.yez.wiki.user.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.entity.user.Resource;
import com.yez.wiki.user.dao.ResourcesMessageMapper;
import com.yez.wiki.user.service.IResourcesMessageService;
import com.yez.wiki.util.PageUtil;

@Service
public class ResourcesMessageService implements IResourcesMessageService {
	@Autowired
	private ResourcesMessageMapper resourcesMessageMapper;

	@Override
	public ResponseMessage insert(Resource resource) {
		resourcesMessageMapper.insert(resource);
		return ResponseMessage.success();
	}

	@Override
	public ResponseMessage delete(int id) {
		resourcesMessageMapper.delete(id);
		return ResponseMessage.success();
	}

	@Override
	public ResponseMessage update(Resource resource) {
		resourcesMessageMapper.update(resource);
		return ResponseMessage.success();
	}
	
	@Override
	public ResponseMessage getPage(Map<String, Object> map) {
		return ResponseMessage.success(resourcesMessageMapper.getPage(map));
	}

	@Override
	public ResponseMessage getNumber(Map<String, Object> map) {
		return ResponseMessage.success(PageUtil.numberToPage(resourcesMessageMapper.getNumber(map), 10));
	}

	@Override
	public ResponseMessage getType() {
		return ResponseMessage.success(resourcesMessageMapper.getType());
	}
}
