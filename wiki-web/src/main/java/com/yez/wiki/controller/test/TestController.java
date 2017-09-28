package com.yez.wiki.controller.test;

import java.text.ParseException;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.yez.wiki.entity.user.UserAccount;
import com.yez.wiki.entity.wiki.Wiki;
import com.yez.wiki.exception.DateFormatErrorException;
import com.yez.wiki.factory.UserFactory;
import com.yez.wiki.main.util.SolrConnectUtil;
import com.yez.wiki.user.service.impl.TestService;
import com.yez.wiki.util.TimeUtil;

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
	
	@RequestMapping(value = "/setTestLogTime", method = RequestMethod.GET)
	public String setTestLogTime() throws DateFormatErrorException{
		for(int i = 1; i <= 500; i++) {
			String logTime = new String();
			int k = (int) (Math.random()*52);
			if(k == 0 || k == 1) {
				logTime = TimeUtil.stampToTime(TimeUtil.getRandomDate(2016, 7, 1, 2016, 8, 1));
			}
			if(k == 2) {
				logTime = TimeUtil.stampToTime(TimeUtil.getRandomDate(2016, 8, 1, 2016, 9, 1));
			}
			if(k == 3 || k == 4) {
				logTime = TimeUtil.stampToTime(TimeUtil.getRandomDate(2016, 9, 1, 2016, 10, 1));
			}
			if(k >= 5 && k <= 7) {
				logTime = TimeUtil.stampToTime(TimeUtil.getRandomDate(2016, 10, 1, 2016, 11, 1));
			}
			if(k >= 8 && k <= 10) {
				logTime = TimeUtil.stampToTime(TimeUtil.getRandomDate(2016, 11, 1, 2016, 12, 1));
			}
			if(k >= 11 && k <= 13) {
				logTime = TimeUtil.stampToTime(TimeUtil.getRandomDate(2016, 12, 1, 2017, 1, 1));
			}
			if(k >= 14 && k <= 18) {
				logTime = TimeUtil.stampToTime(TimeUtil.getRandomDate(2017, 1, 1, 2017, 2, 1));
			}
			if(k >= 19 && k <= 22) {
				logTime = TimeUtil.stampToTime(TimeUtil.getRandomDate(2017, 2, 1, 2017, 3, 1));
			}
			if(k >= 23 && k <= 27) {
				logTime = TimeUtil.stampToTime(TimeUtil.getRandomDate(2017, 3, 1, 2017, 4, 1));
			}
			if(k >= 28 && k <= 33) {
				logTime = TimeUtil.stampToTime(TimeUtil.getRandomDate(2017, 4, 1, 2017, 5, 1));
			}
			if(k >= 34 && k <= 39) {
				logTime = TimeUtil.stampToTime(TimeUtil.getRandomDate(2017, 5, 1, 2017, 6, 1));
			}
			if(k >= 40 && k <= 45) {
				logTime = TimeUtil.stampToTime(TimeUtil.getRandomDate(2017, 6, 1, 2017, 7, 1));
			}
			if(k >= 46 && k <= 51) {
				logTime = TimeUtil.stampToTime(TimeUtil.getRandomDate(2017, 7, 1, 2017, 7, 25));
			}
			service.setTestLogTime(i, logTime);
		}
		return "/test";
	}
	
	@RequestMapping(value = "/setTestActiveUser", method = RequestMethod.GET)
	public String setTestActiveUser() throws ParseException {
		service.setTestActiveUser();
		return "/test";
	}
	
	@RequestMapping(value = "/testSolrJ", method = RequestMethod.GET)
	public String testSolrJ() {
		Wiki wiki = new Wiki();
		wiki.setId(999);
		wiki.setTitle("testsolarjup");
		wiki.setSubTitle("subtitleup");
		wiki.setDescribe("update");
		wiki.setLevel(1);
		wiki.setCategory(11);
		wiki.setVersion(1);
		wiki.setCreateBy(1);
		wiki.setCreateDate(new Date());
		SolrConnectUtil.updateWiki(wiki, new Date());
		//SolrConnectUtil.deleteWiki(999);
		System.out.println("suc");
		return "/test";
	}
}