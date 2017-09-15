package com.yez.wiki.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.user.service.IUserChartService;

@Controller
@RequestMapping("/admin/user/chart")
public class AdminUserChartController {
	@Autowired
	private IUserChartService userChartService;
	
	/**
	 * 获取用户性别分布信息
	 * @return ResponseMessage
	 */
	@ResponseBody
	@RequestMapping(value = "/getSexDistribution", method = RequestMethod.GET)
	public ResponseMessage getSexDistribution() {
		return userChartService.getUserSexDistribution();
	}
	
	/**
	 * 获取用户年龄分布信息
	 * @return 用户年龄分布信息
	 */
	/*@ResponseBody
	@RequestMapping(value = "/getAgeDistribution", method = RequestMethod.GET)
	public List<Double> getAgeDistribution() {
		return userMessageService.getUserAgeDistribution();
	}*/
}
