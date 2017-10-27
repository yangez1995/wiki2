package com.yez.wiki.user.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.yez.wiki.entity.user.UserAccount;
import com.yez.wiki.entity.user.UserMessage;
import com.yez.wiki.factory.UserMessageFactory;
import com.yez.wiki.user.dao.UserRegistDao;
import com.yez.wiki.util.TimeUtil;

@Service
public class TestService{
	@Autowired
	private UserRegistDao userRegistDao;
	/*@Autowired
	private UserLoginMapper userLoginDao;*/
	
	public int addTestData(UserAccount user) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(4);//加密级别4
		user.setPassword(encoder.encode(user.getPassword()));//密码加密
		user.setRegistDate(new Date());//获取当前日期
		userRegistDao.userRegist(user);
		
		UserMessage userMessage = UserMessageFactory.product(user.getId(), "萌新");//建立用户默认个人信息
		userRegistDao.createMessage(userMessage);//将用户个人信息存入数据库
		return user.getId();
	}
}
