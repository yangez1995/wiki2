package com.yez.wiki.user.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.yez.wiki.entity.security.UserDetailsImpl;

public interface UserLoginMapper {
	/**
	 * 通过用户名，得到id、
	 * @param username
	 * @return
	 */
	public UserDetailsImpl selectByUsername(@Param("username")String username);
	/**
	 * 更新用户最后登录时间
	 * @param id 要更新最后登录时间的用户id
	 * @param logTime 现在的时间，格式yyyy-MM-dd HH:mm:ss
	 */
	public void updateLogTime(Map<String, Object> map);
}
