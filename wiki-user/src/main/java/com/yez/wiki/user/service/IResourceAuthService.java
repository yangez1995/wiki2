package com.yez.wiki.user.service;

import java.util.List;
import java.util.Map;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.entity.user.OneToMoreIds;

public interface IResourceAuthService {
	public ResponseMessage update(OneToMoreIds ids);
	public ResponseMessage getPage(Map<String, Object> map);
	public ResponseMessage getOtherAuths(List<Integer> list);
	public ResponseMessage getAllAuths();
}
