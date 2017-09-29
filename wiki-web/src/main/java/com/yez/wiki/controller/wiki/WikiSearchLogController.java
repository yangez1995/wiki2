package com.yez.wiki.controller.wiki;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.exception.NoUserLoginException;
import com.yez.wiki.main.service.IWikiSearchLogService;
import com.yez.wiki.user.security.SpringSecuritySessionUtil;

@Controller
@RequestMapping("/wiki/searchLog")
public class WikiSearchLogController {
	@Autowired
	private IWikiSearchLogService wikiSearchLogService;
	
	@ResponseBody
	@RequestMapping(value = "/insert", method = RequestMethod.POST)
	public ResponseMessage insert(String search) {
		int userId;
		try {
			userId = SpringSecuritySessionUtil.getOnLogUserId();
			return wikiSearchLogService.insert(search, userId);
		} catch (NoUserLoginException e) {
			userId = 0;
			return wikiSearchLogService.insert(search, userId);
		}
	}
}
