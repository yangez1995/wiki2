package com.yez.wiki.controller.wiki;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yez.wiki.main.service.IWikiHistoryService;
import com.yez.wiki.util.PageUtil;

@Controller
@RequestMapping("/wiki")
public class WikiHistoryController {
	@Autowired
	private IWikiHistoryService wikiHistoryService;
	
	@RequestMapping(value = "/history", method = RequestMethod.GET)
	public String history() {
		return "/wiki/history";
	}
	
	@ResponseBody
	@RequestMapping(value = "/getHistorys", method = RequestMethod.POST)
	public List<Object> getHistorys(int wikiId, int pageIndex) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("wikiId", wikiId);
		map.put("startIndex", PageUtil.pageIndexToStartIndex(pageIndex, 25));
		map.put("pageSize", 25);
		return wikiHistoryService.getHistorys(map);
	}
}
