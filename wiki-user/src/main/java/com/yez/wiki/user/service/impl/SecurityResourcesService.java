package com.yez.wiki.user.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.entity.security.SecurityResources;
import com.yez.wiki.user.dao.SecurityResourcesDao;
import com.yez.wiki.user.service.ISecurityResourcesService;
@Service
public class SecurityResourcesService implements ISecurityResourcesService {
	@Autowired
	private SecurityResourcesDao securityResourcesDao;
	
	@Override
	public List<SecurityResources> getAllResources() {
		return securityResourcesDao.getAllResources();
	}

	@Override
	public List<String> loadAuthoritiesByResource(int id) {
		return securityResourcesDao.loadAuthoritiesByResource(id);
	}

}
