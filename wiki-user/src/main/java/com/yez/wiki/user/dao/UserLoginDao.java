package com.yez.wiki.user.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.yez.wiki.entity.security.GrantedAuthorityImpl;
import com.yez.wiki.entity.security.UserDetailsImpl;

public interface UserLoginDao {
	/**
	 * 通过用户名，得到id、
	 * @param username
	 * @return
	 */
	public UserDetailsImpl selectByUsername(@Param("username")String username);
	/**
	 * 获取用户的权限集合
	 * @param id 要获取权限集合的用户id
	 * @return List<GrantedAuthorityImpl> 用户权限集合
	 */
	public List<GrantedAuthorityImpl> getUserAuthorities(@Param("id")int id);
	/**
	 * 更新用户最后登录时间
	 * @param id 要更新最后登录时间的用户id
	 * @param logTime 现在的时间，格式yyyy-MM-dd HH:mm:ss
	 */
	public void updateLogTime(@Param("id")int id, @Param("logTime")String logTime);
}
