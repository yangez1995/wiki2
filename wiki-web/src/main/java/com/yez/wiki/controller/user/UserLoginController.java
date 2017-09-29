package com.yez.wiki.controller.user;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.yez.wiki.util.StringUtil;

@Controller
@RequestMapping("/user")
public class UserLoginController {
	/**
	 * 用户登录界面
	 * @authority none
	 */
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String userSignIn(HttpSession session,String url) {
		if(StringUtil.isEmpty(url)) {
			session.setAttribute("afterLoginUrl", "");
		} else {
			session.setAttribute("afterLoginUrl", url);
		}
		return "/user/login";
	}
}
