package com.yez.wiki.controller.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/user")
public class UserLoginController {
	/**
	 * 用户登录界面
	 * @authority none
	 */
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String userSignIn() {
		return "/user/login";
	}
}
