package com.yez.wiki.controller.test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.yez.wiki.entity.user.UserAccount;
import com.yez.wiki.factory.UserFactory;
import com.yez.wiki.user.service.impl.TestService;

@Controller
public class TestController {
	@Autowired 
	private TestService service;
	
	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public String test() {
		return "/test";
	}
	
	@RequestMapping(value = "/addTestUserData", method = RequestMethod.GET)
	public String addTestUserData() {
		for(int i = 1; i <= 500; i++) {
			String str = "testuser" + String.valueOf(i);
			UserAccount user = UserFactory.userAccount(str, "123123");
			service.addTestData(user);
		}
		return "/test";
	}
}