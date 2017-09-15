package com.yez.wiki.user.service;

import java.util.Map;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.entity.user.Role;

public interface IRoleMessageService {
	public ResponseMessage insert(String name, String describe);
	public ResponseMessage delete(int id);
	public ResponseMessage update(Role role);
	public ResponseMessage getPage(Map<String, Object> map);
	public ResponseMessage getNumber(Map<String, Object> map);
	public boolean checkRoleNameExist(String name);
}
