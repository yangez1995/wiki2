package com.yez.wiki.controller.admin;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.factory.MapFactory;
import com.yez.wiki.main.service.IWikiCategoryService;

@Controller
@RequestMapping("/admin/wiki/category")
public class AdminWikiCategoryController {
	@Autowired
	private IWikiCategoryService wikiCategoryService;
	
	@ResponseBody
	@RequestMapping(value = "/insert", method = RequestMethod.POST)
	public ResponseMessage insert(String id, String name) {
		return wikiCategoryService.insert(id, name);
	}
	
	@ResponseBody
	@RequestMapping(value = "/getPage", method = RequestMethod.POST)
	public ResponseMessage getPage(int pageIndex, int pageSize) {
		Map<String, Object> map = MapFactory.pageMap(pageIndex, pageSize);
		return wikiCategoryService.getPage(map);
	}
}
