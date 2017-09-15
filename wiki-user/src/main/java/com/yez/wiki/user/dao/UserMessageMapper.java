package com.yez.wiki.user.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface UserMessageMapper {
	/**
	 * 读取页数对应的用户信息列表
	 * @param map 查询所需的条件集合 :
	 *            startindex 起始条数
	 *            pageSize 每页最多显示多少条信息
	 *            id 按id精确搜索
	 *            nickname 按nickname模糊搜索
	 *            sex 按sex精确搜索
	 *            age 按age范围搜索
	 * @return 用户信息列表
	 */
	public List<Object> getPage(Map<String, Object> map);
	/**
	 * 获取符合搜索条件的用户信息条数
	 * @param map 查询所需的条件集合 :
	 *            id 按id精确搜索
	 *            nickname 按nickname模糊搜索
	 *            sex 按sex精确搜索
	 *            age 按age范围搜索
	 * @return 符合搜索条件的用户信息条数
	 */
	public int getNumber(Map<String, Object> map);
	
	public String getNicknameById(@Param("id")int id);
}
