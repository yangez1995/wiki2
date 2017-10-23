package com.yez.wiki.user.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.entity.user.Authority;
import com.yez.wiki.factory.AuthorityFactory;
import com.yez.wiki.factory.MapFactory;
import com.yez.wiki.user.dao.AuthorityMapper;
import com.yez.wiki.user.service.IAuthorityService;
import com.yez.wiki.util.StringUtil;

@Service
public class AuthorityService implements IAuthorityService {
	@Autowired
	private AuthorityMapper authorityMapper;
	
	@Override
	public ResponseMessage insert(String name, String mark, String describe) {
		//验证权限名称
		if(StringUtil.isEmpty(name)) {
			return ResponseMessage.fail("权限名称不能为空！");
		}
		if(checkAuthorityNameExist(name)) {
			return ResponseMessage.fail("权限名称已经存在！");
		}
		if(!StringUtil.checkLength(name, 1, 30)) {
			return ResponseMessage.fail("权限名称在1-30位之间！");
		}
		if(!StringUtil.isLetterDigitOrChinese(name)) {
			return ResponseMessage.fail("权限名称只能由数字、字母、汉字组成！");
		}
		
		//验证权限编码
		if(StringUtil.isEmpty(mark)) {
			return ResponseMessage.fail("权限编码不能为空！");
		}
		if(checkAuthorityMarkExist(mark)) {
			return ResponseMessage.fail("权限编码已经存在！");
		}
		if(!StringUtil.checkLength(mark, 1, 30)) {
			return ResponseMessage.fail("权限编码在1-30位之间！");
		}
		if(!StringUtil.isCode(mark)) {
			return ResponseMessage.fail("权限编码只能由大写字母和下划线组成！");
		}
		
		//验证描述
		if(!StringUtil.checkLength(describe, 0, 100)) {
			return ResponseMessage.fail("描述不能超过100个字符！");
		}

		Authority authority = AuthorityFactory.product(name, mark, describe);
		authorityMapper.insert(authority);
		return ResponseMessage.success();
	}
	
	@Override
	public ResponseMessage delete(int id) {
		authorityMapper.delete(id);
		return ResponseMessage.success();
	}
	
	@Override
	public ResponseMessage update(Authority authority) {
		authorityMapper.update(authority);
		return ResponseMessage.success();
	}
	
	@Override
	public ResponseMessage getPage(Map<String, Object> map) {
		return ResponseMessage.success(MapFactory.pageAndSize(authorityMapper.getPage(map), authorityMapper.getNumber(map)));
	}
	
	@Override
	public boolean checkAuthorityNameExist(String name) {
		return authorityMapper.checkAuthorityNameExist(name) > 0 ? true : false;
	}

	@Override
	public boolean checkAuthorityMarkExist(String mark) {
		return authorityMapper.checkAuthorityMarkExist(mark) > 0 ? true : false;
	}
}
