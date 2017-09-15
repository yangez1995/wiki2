package com.yez.wiki.controller.admin;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yez.wiki.user.service.IActiveUserService;
import com.yez.wiki.util.ProjectDateUtil;
import com.yez.wiki.util.TimeUtil;

@Controller
@RequestMapping("/admin")
public class AdminActiveUserController {
	@Autowired
	private IActiveUserService activeUserService;
	
	@ResponseBody
	@RequestMapping(value = "/getWeekActiveUser", method = RequestMethod.GET)
	public List<Integer> getWeekActiveUser(int weekNumber) throws ParseException {
		return activeUserService.getWeekActiveUser(weekNumber);
	}
	
	@ResponseBody
	@RequestMapping(value = "/getLastWeekNumber", method = RequestMethod.GET)
	public int getLastWeekNumber() throws ParseException {
		return ProjectDateUtil.getWeekNumber() - 1;
	}
	
	@ResponseBody
	@RequestMapping(value = "/getMonthActiveUser", method = RequestMethod.GET)
	public List<Integer> getMonthActiveUser(int year, int month) {
		return activeUserService.getMonthActiveUser(year, month);
	}
	
	@ResponseBody
	@RequestMapping(value = "/getTodayMonth", method = RequestMethod.GET)
	public Map<String, Integer> getTodayMonth() throws ParseException {
		return TimeUtil.getTodayMonth();
	}
	
	@ResponseBody
	@RequestMapping(value = "/getYearActiveUser", method = RequestMethod.GET)
	public List<Integer> getYearActiveUser(int year) {
		return activeUserService.getYearActiveUser(year);
	}
}
