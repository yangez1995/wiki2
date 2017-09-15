package com.yez.wiki.user.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.user.dao.UserLoginDao;
import com.yez.wiki.user.service.IUserLoginService;
import com.yez.wiki.util.TimeUtil;

@Service
public class UserLoginService implements IUserLoginService {
	@Autowired
	private UserLoginDao userLoginDao;
	
	@Override
	public void updateLogTime(int id) {
		userLoginDao.updateLogTime(id, TimeUtil.getNowTime());
	}

}
