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
import com.yez.wiki.user.dao.ActiveUserDao;
import com.yez.wiki.user.dao.UserLoginDao;
import com.yez.wiki.user.dao.UserRegistDao;
import com.yez.wiki.util.TimeUtil;

@Service
public class TestService{
	@Autowired
	private UserRegistDao userRegistDao;
	@Autowired
	private UserLoginDao userLoginDao;
	@Autowired
	private ActiveUserDao activeUserDao;
	
	public int addTestData(UserAccount user) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(4);//加密级别4
		user.setPassword(encoder.encode(user.getPassword()));//密码加密
		user.setLocked('f');//设置帐号未被锁定
		user.setRegDate(TimeUtil.getNowDate());//获取当前日期
		userRegistDao.userRegist(user);
		int age = -1;
		int k = (int) (Math.random()*6);
		if(k == 0) {
			age = (int) (Math.random()*50) + 5;
		}
		if(k >= 1 && k <=3) {
			age = (int) (Math.random()*20) + 7;
		}
		char sex = 'x';
		int kk = (int) (Math.random()*3);
		if(kk == 1) {
			sex = 'm';
		}
		if(kk == 2) {
			sex = 'w';
		}
		UserMessage userMessage = UserMessageFactory.product(user.getId(), "萌新", age, sex);//建立用户默认个人信息
		userRegistDao.createMessage(userMessage);//将用户个人信息存入数据库
		return user.getId();
	}
	
	public void setTestLogTime(int id, String logTime) {
		userLoginDao.updateLogTime(id, logTime);
	}
	
	public void setTestActiveUser() throws ParseException {
		Calendar c = Calendar.getInstance();
		SimpleDateFormat sdf= new SimpleDateFormat("yyyy-MM-dd");
		Date date = sdf.parse("2016-7-1");
		long start = date.getTime();
		date = sdf.parse("2017-7-25");
		long end = date.getTime();
		int j = 0;
		int number = 0;
		for(long i = start; i <= end; i += 1000*60*60*24) {
			c.setTimeInMillis(i);
			if(c.get(Calendar.MONTH) == 0 || c.get(Calendar.MONTH) == 3 || c.get(Calendar.MONTH) == 6 || c.get(Calendar.MONTH) == 9) {
				j += 2;
				number = (int) ((int) ((Math.random()*100) + j)*1.5);
			} else {
				j += 1;
				number = (int) ((Math.random()*100) + j);
			}
			activeUserDao.todayActiveUser(number, TimeUtil.stampToDate(c.getTime()));
		}
	}
}
