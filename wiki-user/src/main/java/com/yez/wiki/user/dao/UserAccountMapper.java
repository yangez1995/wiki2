package com.yez.wiki.user.dao;

import java.util.List;
import java.util.Map;
/**
 * 用户帐号Mapper
 * @author 杨恩哲
 * @since V1.0
 */
public interface UserAccountMapper {
	/**
	 * 修改用户帐号锁定状态
	 * @param map 参数集合，包含：
	 *     int id 要修改的用户id
	 *     String locked 帐号锁定状态
	 * @return 影响的数据库行数
	 */
	public int updateLocked(Map<String, Object> map);
	
	/**
	 * 读取页数对应的用户帐号信息列表
	 * @param map 参数集合，包含：
	 *     int startindex 起始条数
	 *     int pageSize 每页最多显示多少条信息
	 *     int id 按id精确搜索，可以为空
	 *     String username 按username模糊搜索，可以为空
	 *     String locked 按locked精确搜索，可以为空
	 * @return 用户帐号信息列表
	 */
	public List<Object> getPage(Map<String, Object> map);
	
	/**
	 * 读取符合搜索条件的用户帐号信息数量
	 * @param map 参数集合，包含：
	 *     int id 按id精确搜索，可以为空
	 *     String username 按username模糊搜索，可以为空
	 *     String locked 按locked精确搜索，可以为空
	 * @return 符合搜索条件的用户帐号信息数量
	 */
	public int getNumber(Map<String, Object> map);
}
