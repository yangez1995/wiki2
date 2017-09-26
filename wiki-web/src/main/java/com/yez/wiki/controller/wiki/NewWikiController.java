package com.yez.wiki.controller.wiki;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.entity.wiki.Wiki;
import com.yez.wiki.exception.NoUserLoginException;
import com.yez.wiki.factory.WikiFactory;
import com.yez.wiki.main.service.IWIkiCreateService;
import com.yez.wiki.user.security.SpringSecuritySessionUtil;

@Controller
@RequestMapping("/wiki")
public class NewWikiController {
	@Autowired
	private IWIkiCreateService wikiCreateService;
	
	@RequestMapping(value = "/newWiki", method = RequestMethod.GET)
	public String newWiki() {
		return "/wiki/newWiki";
	}
	
	@ResponseBody
	@RequestMapping(value = "/newWiki", method = RequestMethod.POST)
	public ResponseMessage newWiki(String title, String subTitle, String describe, int category) {
		Wiki wiki;
		try {
			wiki = WikiFactory.product(title, subTitle, describe, category, SpringSecuritySessionUtil.getOnLogUserId(), new Date());
		} catch (NoUserLoginException e) {
			return ResponseMessage.fail("该功能只有在登录后才可使用！");
		}
		switch(category / 10) {
		case 1 : {
			return wikiCreateService.newSimpleWiki(wiki);
		}
		case 2 : {
			return wikiCreateService.newStandardWiki(wiki);
		}
		case 3 : {
			return wikiCreateService.newAnimeWiki(wiki);
		}
		default : {
			return ResponseMessage.fail("未知的类型编码！");
		}
		}
	}
}
