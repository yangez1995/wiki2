package com.yez.wiki.user.service;

import java.util.List;
import java.util.Map;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.entity.user.Authority;
import com.yez.wiki.entity.user.OneToMoreIds;
import com.yez.wiki.entity.user.RoleAuthority;

public interface IRoleAuthService {
	public ResponseMessage update(OneToMoreIds ids);
	public List<RoleAuthority> getPage(Map<String, Object> map);
	public int getCount(Map<String, Object> map);
	public List<Authority> getOtherAuths(List<Integer> list);
}
