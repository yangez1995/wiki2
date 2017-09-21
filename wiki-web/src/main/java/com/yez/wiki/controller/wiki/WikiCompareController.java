package com.yez.wiki.controller.wiki;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.main.service.IWikiCompareService;

@Controller
@RequestMapping("/wiki/compare")
public class WikiCompareController {
	@Autowired
	private IWikiCompareService wikiCompareService;
	
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String compare() {
		return "/wiki/compare";
	}
	
	@ResponseBody
	@RequestMapping(value = "/card", method = RequestMethod.GET)
	public ResponseMessage card(int wikiId, int historyId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("wikiId", wikiId);
		map.put("historyId", historyId);
		System.out.println(wikiId);
		System.out.println(historyId);
		return wikiCompareService.card(map);
	}
}
