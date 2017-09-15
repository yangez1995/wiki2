package com.yez.wiki.user.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.entity.user.UserRolesId;
import com.yez.wiki.factory.MapFactory;
import com.yez.wiki.user.dao.UserRoleMapper;
import com.yez.wiki.user.service.IUserRoleService;
import com.yez.wiki.util.PageUtil;
@Service
public class UserRoleService implements IUserRoleService {
	@Autowired
	private UserRoleMapper userRoleMapper;
	
	@Override
	public ResponseMessage update(UserRolesId ids) {
		if(ids.getRolesId().isEmpty()) {
			userRoleMapper.deleteAllRoles(ids.getUserId());
		} else {
			List<Integer> nowList = userRoleMapper.getRolesId(ids.getUserId());
			if(nowList.isEmpty()) {
				Map<String, Object> insertMap = MapFactory.userRolesIdMap(ids);
				userRoleMapper.addRoles(insertMap);
			} else {
				Map<String, Object> deleteMap = MapFactory.userRolesIdMap(ids);
				userRoleMapper.deleteRoles(deleteMap);
				
				ids.getRolesId().removeAll(nowList);
				if(!ids.getRolesId().isEmpty()) {
					Map<String, Object> insertMap = MapFactory.userRolesIdMap(ids);
					userRoleMapper.addRoles(insertMap);
				}
			}
		}
		return ResponseMessage.success();
	}
	
	@Override
	public ResponseMessage getPage(Map<String, Object> map) {
		return ResponseMessage.success(userRoleMapper.getPage(map));
	}

	@Override
	public ResponseMessage getNumber(Map<String, Object> map) {
		return ResponseMessage.success(PageUtil.numberToPage(userRoleMapper.getNumber(map), 10));
	}

	@Override
	public ResponseMessage getOtherRoles(List<Integer> list) {
		return ResponseMessage.success(userRoleMapper.getOtherRoles(list));
	}

	@Override
	public ResponseMessage getRoles() {
		return ResponseMessage.success(userRoleMapper.getRoles());
	}
}
