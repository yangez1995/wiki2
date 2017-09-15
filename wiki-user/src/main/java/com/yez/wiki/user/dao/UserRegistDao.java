package com.yez.wiki.user.dao;

import org.apache.ibatis.annotations.Param;

import com.yez.wiki.entity.user.UserAccount;
import com.yez.wiki.entity.user.UserMessage;

public interface UserRegistDao {
	/**
	 * 用户注册
	 * @param user 用户注册信息
	 * @return 用户注册成功后得到的id
	 */
	public int userRegist(UserAccount user);
	
	public void createMessage(UserMessage userMessage);
	
	/**
	 * 查看用户名是否已被使用
	 * @param username 要查看的用户名
	 * @return 与传入用户名相同的用户名数量
	 */
	public int checkUsernameExist(@Param("username")String username);
}
