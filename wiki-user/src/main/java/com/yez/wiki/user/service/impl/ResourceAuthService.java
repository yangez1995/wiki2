package com.yez.wiki.user.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.entity.user.OneToMoreIds;
import com.yez.wiki.factory.MapFactory;
import com.yez.wiki.user.dao.ResourceAuthMapper;
import com.yez.wiki.user.service.IResourceAuthService;

@Service
public class ResourceAuthService implements IResourceAuthService {
	@Autowired
	private ResourceAuthMapper resourceAuthMapper;
	
	@Override
	public ResponseMessage update(OneToMoreIds ids) {
		if(ids.getIds().isEmpty()) {
			resourceAuthMapper.deleteAllAuths(ids.getId());
		} else {
			List<Integer> nowList = resourceAuthMapper.getAuthsId(ids.getId());
			if(nowList.isEmpty()) {
				Map<String, Object> insertMap = MapFactory.oneToMoreIdsMap(ids);
				resourceAuthMapper.addAuths(insertMap);
			} else {
				Map<String, Object> deleteMap = MapFactory.oneToMoreIdsMap(ids);
				resourceAuthMapper.deleteAuths(deleteMap);
				
				ids.getIds().removeAll(nowList);
				if(!ids.getIds().isEmpty()) {
					Map<String, Object> insertMap = MapFactory.oneToMoreIdsMap(ids);
					resourceAuthMapper.addAuths(insertMap);
				}
			}
		}
		return ResponseMessage.success();
	}

	@Override
	public ResponseMessage getPage(Map<String, Object> map) {
		return ResponseMessage.success(MapFactory.pageAndSize(resourceAuthMapper.searchPage(map), resourceAuthMapper.searchNumber(map)));
	}

	@Override
	public ResponseMessage getOtherAuths(List<Integer> list) {
		return list.isEmpty() ? getAllAuths() : ResponseMessage.success(resourceAuthMapper.getOtherAuths(list));
	}
	
	@Override
	public ResponseMessage getAllAuths() {
		return ResponseMessage.success(resourceAuthMapper.getAllAuths());
	}
}
