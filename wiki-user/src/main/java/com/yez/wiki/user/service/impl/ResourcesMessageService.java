package com.yez.wiki.user.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.entity.user.Resource;
import com.yez.wiki.factory.MapFactory;
import com.yez.wiki.user.dao.ResourcesMessageMapper;
import com.yez.wiki.user.service.IResourcesMessageService;

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
		return ResponseMessage.success(MapFactory.pageAndSize(resourcesMessageMapper.getPage(map), resourcesMessageMapper.getNumber(map)));
	}

	@Override
	public List<Object> getType() {
		return resourcesMessageMapper.getType();
	}
}
