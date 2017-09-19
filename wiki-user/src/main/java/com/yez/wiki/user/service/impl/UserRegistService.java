package com.yez.wiki.user.service.impl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.entity.user.UserAccount;
import com.yez.wiki.entity.user.UserMessage;
import com.yez.wiki.factory.UserFactory;
import com.yez.wiki.factory.UserMessageFactory;
import com.yez.wiki.user.dao.UserRegistDao;
import com.yez.wiki.user.service.IUserRegistService;
import com.yez.wiki.util.StringUtil;

/**
 * 用户注册Service接口实现类
 */
@Service
public class UserRegistService implements IUserRegistService {
	@Autowired
	private UserRegistDao userRegistDao;
	
	/**
	 * 用户注册业务处理
	 * @param username 用户名
	 * @param password 密码
	 * @return ResponseMessage 响应信息
	 * 验证用户名、密码，将密码加密后封装成UserAccount类，设置默认信息，并存入数据库。
	 * 根据数据库返回的新用户id创建用户的默认UserMessage信息，并存入数据库。
	 * 验证成功并将信息存入数据库返回 ResponseMessage.code = "200" 表示成功
	 * 否则返回 ResponseMessage.code = "400" 表示失败
	 */
	@Override
	public ResponseMessage userRegist(String username, String password) {
		//验证用户名
		if(StringUtil.isEmpty(username)) {
			return ResponseMessage.fail("用户名不能为空！");
		}
		if(!StringUtil.checkLength(username, 6, 30)) {
			return ResponseMessage.fail("用户名长度在6-30位之间！");
		}
		if(checkUsernameExist(username)) {
			return ResponseMessage.fail("用户名已经存在！");
		}
		if(!StringUtil.isLetterDigit(username)) {
			return ResponseMessage.fail("用户名只能为字母和数字！");
		}
		
		//验证密码
		if(StringUtil.isEmpty(password)) {
			return ResponseMessage.fail("密码不能为空！");
		}
		if(!StringUtil.checkLength(password, 6, 30)) {
			return ResponseMessage.fail("密码长度在6-30位之间！");
		}
		if(StringUtil.isHasChinese(password)) {
			return ResponseMessage.fail("密码不能含有中文！");
		}
		
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(4);//加密级别4
		UserAccount user = UserFactory.userAccount(username, encoder.encode(password));//封装用户名、密码，并加密密码
		user.setRegistDate(new Date());//获取当前日期
		userRegistDao.userRegist(user);
		
		UserMessage userMessage = UserMessageFactory.product(user.getId(), "萌新");//建立用户默认个人信息
		userRegistDao.createMessage(userMessage);//将用户个人信息存入数据库
		return ResponseMessage.success();
	}

	/**
	 * 判断用户名是否已经存在与数据库中
	 * @param username 用户名
	 * @return true 如果传入用户名在数据库中已经存在
	 * @return false 如果传入用户名在数据库中不存在
	 */
	@Override
	public boolean checkUsernameExist(String username) {
		return userRegistDao.checkUsernameExist(username) > 0 ? true : false;
	}
}
