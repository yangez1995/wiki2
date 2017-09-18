package com.yez.wiki.user.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.entity.user.OneToMoreIds;
import com.yez.wiki.factory.MapFactory;
import com.yez.wiki.user.dao.UserRoleMapper;
import com.yez.wiki.user.service.IUserRoleService;
import com.yez.wiki.util.PageUtil;
@Service
public class UserRoleService implements IUserRoleService {
	@Autowired
	private UserRoleMapper userRoleMapper;
	
	@Override
	public ResponseMessage update(OneToMoreIds ids) {
		if(ids.getIds().isEmpty()) {
			userRoleMapper.deleteAllRoles(ids.getId());
		} else {
			List<Integer> nowList = userRoleMapper.getRolesId(ids.getId());
			if(nowList.isEmpty()) {
				Map<String, Object> insertMap = MapFactory.oneToMoreIdsMap(ids);
				userRoleMapper.addRoles(insertMap);
			} else {
				Map<String, Object> deleteMap = MapFactory.oneToMoreIdsMap(ids);
				userRoleMapper.deleteRoles(deleteMap);
				
				ids.getIds().removeAll(nowList);
				if(!ids.getIds().isEmpty()) {
					Map<String, Object> insertMap = MapFactory.oneToMoreIdsMap(ids);
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
		return list.isEmpty() ? getRoles() : ResponseMessage.success(userRoleMapper.getOtherRoles(list));
	}

	@Override
	public ResponseMessage getRoles() {
		return ResponseMessage.success(userRoleMapper.getRoles());
	}
}
