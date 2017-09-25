package com.yez.wiki.controller.wiki;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.entity.wiki.Wiki;

@Controller
@RequestMapping("/wiki")
public class NewWikiController {
	
	@RequestMapping(value = "/newWiki", method = RequestMethod.GET)
	public String newWiki() {
		return "/wiki/newWiki";
	}
	
	@ResponseBody
	@RequestMapping(value = "/newWiki", method = RequestMethod.POST)
	public ResponseMessage newWiki(Wiki wiki) {
		return ResponseMessage.success();
	}
}
