package com.yez.wiki.user.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.entity.user.Authority;
import com.yez.wiki.entity.user.RoleAuthority;
import com.yez.wiki.entity.user.RoleAuthsId;
import com.yez.wiki.factory.MapFactory;
import com.yez.wiki.user.dao.RoleAuthMapper;
import com.yez.wiki.user.service.IRoleAuthService;

@Service
public class RoleAuthService implements IRoleAuthService {
	@Autowired
	private RoleAuthMapper roleAuthMapper;
	
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

	@Override
	public ResponseMessage update(RoleAuthsId ids) {
		if(ids.getAuthsId().isEmpty()) {
			roleAuthMapper.deleteAllAuths(ids.getRoleId());
		} else {
			List<Integer> nowList = roleAuthMapper.getAuthsId(ids.getRoleId());
			if(nowList.isEmpty()) {
				Map<String, Object> insertMap = MapFactory.roleAuthsIdMap(ids);
				roleAuthMapper.addAuths(insertMap);
			} else {
				Map<String, Object> deleteMap = MapFactory.roleAuthsIdMap(ids);
				roleAuthMapper.deleteAuths(deleteMap);
				
				ids.getAuthsId().removeAll(nowList);
				if(!ids.getAuthsId().isEmpty()) {
					Map<String, Object> insertMap = MapFactory.roleAuthsIdMap(ids);
					roleAuthMapper.addAuths(insertMap);
				}
			}
		}
		return ResponseMessage.success();
	}
}
