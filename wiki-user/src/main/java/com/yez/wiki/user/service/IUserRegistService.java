package com.yez.wiki.user.service;

import com.yez.wiki.entity.ResponseMessage;
/**
 * 用户注册Service接口
 */
public interface IUserRegistService {
	/**
	 * 用户注册业务处理
	 * @param username 用户名
	 * @param password 密码
	 * @return ResponseMessage 响应信息
	 */
	public ResponseMessage userRegist(String username, String password);
	
	/**
	 * 判断用户名是否已经存在与数据库中
	 * @param username 用户名
	 * @return boolean 用户名是否已经存在
	 */
	public boolean checkUsernameExist(String username);
}
