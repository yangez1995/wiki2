package com.yez.wiki.controller.wiki;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.factory.MapFactory;
import com.yez.wiki.main.service.IWikiIndexService;

@Controller
@RequestMapping("/wiki")
public class IndexController {
	@Autowired
	private IWikiIndexService wikiIndexService;

	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String index() {
		return "/wiki/index";
	}
	
	@ResponseBody
	@RequestMapping(value = "/getPage", method = RequestMethod.POST)
	public ResponseMessage getPage(int pageIndex) {
		Map<String, Object> map = MapFactory.pageMap(pageIndex, 10); 
		return wikiIndexService.getPage(map);
	}
}
