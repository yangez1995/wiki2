package com.yez.wiki.user.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.factory.MapFactory;
import com.yez.wiki.user.dao.ResourceTypeMapper;
import com.yez.wiki.user.service.IResourceTypeService;
import com.yez.wiki.util.StringUtil;

@Service
public class ResourceTypeService implements IResourceTypeService {
	@Autowired
	private ResourceTypeMapper resourcesTypeMapper;
	
	@Override
	public ResponseMessage insert(String id, String name) {
		//验证ID
		if(StringUtil.isEmpty(id)) {
			return ResponseMessage.fail("ID不能为空！");
		}
		if(id.length() != 2) {
			return ResponseMessage.fail("ID长度为两位！");
		}
		if(!StringUtil.isLetterDigit(id)) {
			return ResponseMessage.fail("ID只能为字母或数字！");
		}
		
		//验证名称
		if(StringUtil.isEmpty(name)) {
			return ResponseMessage.fail("名称不能为空！");
		}
		if(!StringUtil.checkLength(name, 1, 30)) {
			return ResponseMessage.fail("名称长度在1-30位之间！");
		}
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", id);
		map.put("name", name);
		resourcesTypeMapper.insert(map);
		return ResponseMessage.success();
	}

	@Override
	public ResponseMessage delete(String id) {
		resourcesTypeMapper.delete(id);
		return ResponseMessage.success();
	}

	@Override
	public ResponseMessage update(Map<String, Object> map) {
		resourcesTypeMapper.update(map);
		return ResponseMessage.success();
	}
	
	@Override
	public ResponseMessage getPage(Map<String, Object> map) {
		return ResponseMessage.success(MapFactory.pageAndSize(resourcesTypeMapper.getPage(map), resourcesTypeMapper.getNumber(map)));
	}
}
