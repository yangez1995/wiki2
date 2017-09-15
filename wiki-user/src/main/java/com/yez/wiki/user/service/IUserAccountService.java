package com.yez.wiki.user.service;

import java.util.Map;

import com.yez.wiki.entity.ResponseMessage;

/**
 * 用户帐号Service接口
 * @author 杨恩哲
 * @see UserAccountService
 * @since V1.0
 */
public interface IUserAccountService {
	/*-- UPDATE --*/
	/**
	 * 锁定用户帐号
	 * @param id 要锁定的用户id
	 * @return 响应信息
	 */
	public ResponseMessage lock(int id);
	
	/**
	 * 解锁用户帐号
	 * @param id 要解锁的用户id
	 * @return 响应信息
	 */
	public ResponseMessage unlock(int id);
	
	/*-- SELECT --*/
	/**
	 * 获取一页用户帐号信息
	 * @param map 参数集合
	 * @return 响应信息
	 */
	public ResponseMessage getPage(Map<String, Object> map);
	
	/**
	 * 获取用户帐号数量
	 * @param map 参数集合
	 * @return 响应信息
	 */
	public ResponseMessage getNumber(Map<String, Object> map);
}
