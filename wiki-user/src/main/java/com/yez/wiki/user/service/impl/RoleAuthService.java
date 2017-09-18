package com.yez.wiki.user.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.entity.user.Authority;
import com.yez.wiki.entity.user.OneToMoreIds;
import com.yez.wiki.entity.user.RoleAuthority;
import com.yez.wiki.factory.MapFactory;
import com.yez.wiki.user.dao.RoleAuthMapper;
import com.yez.wiki.user.service.IRoleAuthService;

@Service
public class RoleAuthService implements IRoleAuthService {
	@Autowired
	private RoleAuthMapper roleAuthMapper;
	
	@Override
	public ResponseMessage update(OneToMoreIds ids) {
		if(ids.getIds().isEmpty()) {
			roleAuthMapper.deleteAllAuths(ids.getId());
		} else {
			List<Integer> nowList = roleAuthMapper.getAuthsId(ids.getId());
			if(nowList.isEmpty()) {
				Map<String, Object> insertMap = MapFactory.oneToMoreIdsMap(ids);
				roleAuthMapper.addAuths(insertMap);
			} else {
				Map<String, Object> deleteMap = MapFactory.oneToMoreIdsMap(ids);
				roleAuthMapper.deleteAuths(deleteMap);
				
				ids.getIds().removeAll(nowList);
				if(!ids.getIds().isEmpty()) {
					Map<String, Object> insertMap = MapFactory.oneToMoreIdsMap(ids);
					roleAuthMapper.addAuths(insertMap);
				}
			}
		}
		return ResponseMessage.success();
	}
	
	@Override
	public List<RoleAuthority> getPage(Map<String, Object> map) {
		return roleAuthMapper.getPage(map);
	}

	@Override
	public int getCount(Map<String, Object> map) {
		return roleAuthMapper.getCount(map);
	}

	@Override
	public List<Authority> getOtherAuths(List<Integer> list) {
		return roleAuthMapper.getOtherAuths(list);
	}
}
