package com.yez.wiki.user.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.yez.wiki.entity.security.UserDetailsImpl;
import com.yez.wiki.factory.UserDetailsFactory;
import com.yez.wiki.user.dao.UserLoginMapper;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	private UserLoginMapper userLoginDao;
	
	/**
	 * 通过用户名查找用户id、密码、权限集合
	 * @param username 用户登录时所输入的用户名
	 * @throws UsernameNotFoundException 如果该用户名在数据表中不存在
	 */
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserDetailsImpl user = UserDetailsFactory.product();
		user = userLoginDao.selectByUsername(username);
		if(user != null) {
			return user;
		}
		throw new UsernameNotFoundException("用户名不存在！");
	}

}
