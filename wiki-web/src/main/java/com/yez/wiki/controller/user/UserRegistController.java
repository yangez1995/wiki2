package com.yez.wiki.controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.user.service.IUserRegistService;
/**
 * 用户注册Controller
 */
@Controller
@RequestMapping("/user")
public class UserRegistController {
	@Autowired
	private IUserRegistService userRegistService;
	/**
	 * 用户注册页面
	 * @authority none
	 */
	@RequestMapping(value = "/regist", method = RequestMethod.GET)
	public String regist() {
		return "/user/regist";
	}
	
	/**
	 * 用户注册
	 * @authority none
	 * @param username 用户名
	 * @param password 密码
	 * @return ResponseMessage 响应信息
	 * 根据service层验证返回ResponseMessage.code = "200" 表示成功
	 *                     ResponseMessage.code = "400" 表示失败
	 */
	@ResponseBody
	@RequestMapping(value = "/regist", method = RequestMethod.POST)
	public  ResponseMessage regist(String username, String password) {
		return userRegistService.userRegist(username, password);
	}
	
	/**
	 * 判断用户名是否已经存在于数据库中
	 * @param username 需要判断是否存在的用户名
	 * @return "1" 如果该用户名已经存在
	 * @return "0" 如果该用户名不存在
	 * @authority none
	 */
	@ResponseBody
	@RequestMapping(value="/checkUsernameExist", method = RequestMethod.GET)
	public String checkUsernameExist(String username) {
		if(userRegistService.checkUsernameExist(username)) {
			return "1";
		}
		return "0";
	}
}
