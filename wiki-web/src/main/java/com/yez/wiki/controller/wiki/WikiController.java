package com.yez.wiki.controller.wiki;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.entity.wiki.Chapter;
import com.yez.wiki.entity.wiki.Label;
import com.yez.wiki.entity.wiki.StandardWiki;
import com.yez.wiki.main.service.IWikiService;
import com.yez.wiki.main.service.IWikiUpdateService;

@Controller
@RequestMapping("/wiki")
public class WikiController {
	@Autowired
	private IWikiService wikiService;
	@Autowired
	private IWikiUpdateService wikiUpdateService;
	
	@RequestMapping(value = "/wiki", method = RequestMethod.GET)
	public String wiki() {
		return "/wiki/wiki";
	}
	
	@RequestMapping(value = "/editer", method = RequestMethod.GET)
	public String editer() {
		return "/wiki/editer";
	}
	
	@ResponseBody
	@RequestMapping(value = "/newSimpleWiki", method = RequestMethod.POST)
	public ResponseMessage newSimpleWiki(String mainTitle) {
		return ResponseMessage.success();
	}
	
	@ResponseBody
	@RequestMapping(value = "/getWiki", method = RequestMethod.POST)
	public ResponseMessage getWiki(int id, int category) {
		switch (category) {
		case 1 : {
			return ResponseMessage.success(wikiService.getSimpleWiki(id));
		}
		case 2 : {
			return ResponseMessage.success(wikiService.getStandardWiki(id));
		}
		case 3 : {
			return ResponseMessage.success(wikiService.getAnimeWiki(id));
		}
		default: {
			return ResponseMessage.fail("类型编码未知！");
		}
		}
	}
	
	@ResponseBody
	@RequestMapping(value = "/cardUpdate", method = RequestMethod.POST)
	public ResponseMessage cardUpdate(@RequestBody StandardWiki wiki) {
		return wikiUpdateService.cardUpdate(wiki);
	}
	
	@ResponseBody
	@RequestMapping(value = "/labelUpdate", method = RequestMethod.POST)
	public ResponseMessage labelUpdate(@RequestBody List<Label> list) {
		return wikiUpdateService.updateLabels(list);
	}
	
	@ResponseBody
	@RequestMapping(value = "/catalUpdate", method = RequestMethod.POST)
	public ResponseMessage catalUpdate(@RequestBody List<Chapter> list) {
		return wikiUpdateService.updateCatals(list);
	}
	
	@ResponseBody
	@RequestMapping(value = "/chapterUpdate", method = RequestMethod.POST)
	public ResponseMessage chapterUpdate(@RequestBody Chapter chapter) {
		return wikiUpdateService.updateChapter(chapter);
	}
}
