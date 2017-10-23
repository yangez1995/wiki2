package com.yez.wiki.user.service;

import java.util.Map;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.entity.user.Authority;

public interface IAuthorityService {
	public ResponseMessage insert(String name, String mark, String describe);
	public ResponseMessage delete(int id);
	public ResponseMessage update(Authority authority);
	public ResponseMessage getPage(Map<String, Object> map);
	public boolean checkAuthorityNameExist(String name);
	public boolean checkAuthorityMarkExist(String mark);
}
