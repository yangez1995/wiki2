package com.yez.wiki.controller.admin;

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
			String subTitle, String level, String createBy, String nickname, String category) {
		Map<String, Object> map = MapFactory.pageMap(pageIndex, pageSize);
		MapFactory.machiningInt(map, "id", id);
		MapFactory.machiningString(map, "title", title);
		MapFactory.machiningString(map, "subTitle", subTitle);
		MapFactory.machiningInt(map, "level", level);
		MapFactory.machiningInt(map, "createBy", createBy);
		MapFactory.machiningString(map, "nickname", nickname);
		MapFactory.machiningInt(map, "category", category);
		return wikiMessageService.getPage(map);
	}
}
