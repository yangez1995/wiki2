package com.yez.wiki.controller.admin;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yez.wiki.entity.security.UserDetailsImpl;
import com.yez.wiki.user.service.IUserMessageService;



@Controller
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	private IUserMessageService userMessageService;
	
	//管理系统主页
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String admin() {
		return "/admin/index";
	}
	
	@ResponseBody
	@RequestMapping(value = "/getOnLoginUserMessage", method = RequestMethod.GET)
	public Map<String, Object> getOnLoginUserMessage() {
		Map<String, Object> map = new HashMap<String, Object>();
		UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication() .getPrincipal();
		map.put("nickname", userMessageService.getNicknameById(((UserDetailsImpl) user).getId()));
		int level = 0;
		for(GrantedAuthority authority : user.getAuthorities()) {
			switch(authority.getAuthority()) {
			case "SUPER_ADMIN": {
				level += 100;
				break;
			}
			case "SYS_ADMIN_SENIOR": {
				level += 10;
				break;
			}
			case "SYS_ADMIN": {
				level += 1;
				break;
			}
			}
		}
		if(level < 10) {
			map.put("role", "普通管理员");
		} else if(level >= 10 && level < 100) {
			map.put("role", "高级管理员");
		} else {
			map.put("role", "超级管理员");
		}
		return map;
	}
}
