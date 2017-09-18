package com.yez.wiki.controller.test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yez.wiki.test.service.ITimeService;

@Controller
@RequestMapping("/test")
public class TestTimeController {
	@Autowired
	private ITimeService timeService;
	
	@RequestMapping(value = "/testTime")
	public void testTime() {
		System.out.println("testTime");
		timeService.insertMap();
	}
}
