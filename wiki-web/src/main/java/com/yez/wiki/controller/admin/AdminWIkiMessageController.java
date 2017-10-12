package com.yez.wiki.controller.admin;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.factory.MapFactory;
import com.yez.wiki.main.service.IWikiMessageService;

@Controller
@RequestMapping("/admin/wiki/message")
public class AdminWIkiMessageController {
	@Autowired
	private IWikiMessageService wikiMessageService;
	
	@ResponseBody
	@RequestMapping(value = "/getPage", method = RequestMethod.POST)
	public ResponseMessage getPage(int pageIndex, int pageSize, String id, String title,
			String subTitle, String levelMin, String levelMax, String createBy, 
			String nickname, String category, String auth) {
		Map<String, Object> map = MapFactory.pageMap(pageIndex, pageSize);
		MapFactory.machiningInt(map, "id", id);
		MapFactory.machiningString(map, "title", title);
		MapFactory.machiningString(map, "subTitle", subTitle);
		MapFactory.machiningInt(map, "levelMin", levelMin);
		MapFactory.machiningInt(map, "levelMax", levelMax);
		MapFactory.machiningInt(map, "createBy", createBy);
		MapFactory.machiningString(map, "nickname", nickname);
		MapFactory.machiningInt(map, "category", category);
		MapFactory.machiningInt(map, "auth", auth);
		return wikiMessageService.getPage(map);
	}
	
	@ResponseBody
	@RequestMapping(value = "/getCategory", method = RequestMethod.GET)
	public List<Object> getCategory() {
		return wikiMessageService.getCategory();
	}
	
	@ResponseBody
	@RequestMapping(value = "/getAuth", method = RequestMethod.GET)
	public List<Object> getAuth() {
		return wikiMessageService.getAuth();
	}
}
