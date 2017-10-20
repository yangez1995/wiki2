package com.yez.wiki.user.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.factory.MapFactory;
import com.yez.wiki.user.dao.UserMessageMapper;
import com.yez.wiki.user.service.IUserMessageService;


@Service
public class UserMessageService implements IUserMessageService {
	@Autowired
	private UserMessageMapper userMessageMapper;
	
	@Override
	public ResponseMessage getPage(Map<String, Object> map) {
		return ResponseMessage.success(MapFactory.pageAndSize(userMessageMapper.getPage(map), userMessageMapper.getNumber(map)));
	}
	
	@Override
	public String getNicknameById(int id) {
		return userMessageMapper.getNicknameById(id);
	}
}
