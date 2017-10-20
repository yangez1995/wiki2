package com.yez.wiki.user.service;

import java.util.Map;

import com.yez.wiki.entity.ResponseMessage;

public interface IUserMessageService {
	public ResponseMessage getPage(Map<String, Object> map);
	
	public String getNicknameById(int id);
}
