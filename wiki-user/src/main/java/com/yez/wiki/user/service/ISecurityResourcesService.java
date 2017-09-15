package com.yez.wiki.user.service;

import java.util.List;

import com.yez.wiki.entity.security.SecurityResources;

public interface ISecurityResourcesService {
	/**
	 * 获取全部资源基本信息(id,name,type,url,describe)
	 * @return List<SecurityResources> 资源基本信息列表
	 */
	public List<SecurityResources> getAllResources();
	/**
	 * 根据资源id获取访问该资源所需要的权限集合
	 * @param id 传入资源id
	 * @return List<String> 访问传入id对应资源所需要的权限集合
	 */
	public List<String> loadAuthoritiesByResource(int id);
}
