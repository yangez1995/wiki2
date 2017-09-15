package com.yez.wiki.user.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.yez.wiki.entity.user.Authority;

public interface AuthorityMapper {
	/**
	 * 新建权限
	 * @param Authority 要新建的权限信息
	 */
	public void insert(Authority authority);
	
	/**
	 * 删除权限信息
	 * @param id 要删除的权限id
	 */
	public void delete(@Param("id")int id);
	
	/**
	 * 修改权限信息
	 * @param Authority 要修改的权限信息
	 */
	public void update(Authority authority);
	
	public List<Authority> getPage(Map<String, Object> map);
	public int getNumber(Map<String, Object> map);
	
	/**
	 * 检测权限名是否存在
	 * @param name 要确认是否存在的权限名
	 * @return 数据库中与传入权限名相同权限名的数量
	 */
	public int checkAuthorityNameExist(@Param("name")String name);
	
	/**
	 * 检测权限代码是否存在
	 * @param name 要确认是否存在的权限代码
	 * @return 数据库中与传入权限代码相同权限代码的数量
	 */
	public int checkAuthorityMarkExist(@Param("mark")String mark);
}
