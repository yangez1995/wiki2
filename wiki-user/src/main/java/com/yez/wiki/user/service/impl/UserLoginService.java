package com.yez.wiki.user.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.user.dao.UserLoginMapper;
import com.yez.wiki.user.service.IUserLoginService;

@Service
public class UserLoginService implements IUserLoginService {
	@Autowired
	private UserLoginMapper userLoginMapper;
	
	@Override
	public void updateLogTime(int id) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", id);
		map.put("lastLoginTime", new Date());
		userLoginMapper.updateLogTime(map);
	}

}
