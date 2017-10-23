package com.yez.wiki.controller.admin;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.entity.user.OneToMoreIds;
import com.yez.wiki.factory.MapFactory;
import com.yez.wiki.user.service.IResourceAuthService;

@Controller
@RequestMapping(value = "/admin/resource/auth")
public class AdminResourceAuthController {
	@Autowired
	private IResourceAuthService resourceAuthService;
	
	@ResponseBody
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public ResponseMessage update(@RequestBody OneToMoreIds ids) {
		return resourceAuthService.update(ids);
	}
	
	@ResponseBody
	@RequestMapping(value = "/getPage", method = RequestMethod.POST)
	public ResponseMessage getPage(int pageIndex, String id, String name, String url, String authId) {
		Map<String, Object> map = MapFactory.pageMap(pageIndex, 10);
		MapFactory.machiningInt(map, "id", id);
		MapFactory.machiningString(map, "name", name);
		MapFactory.machiningString(map, "url", url);
		MapFactory.machiningInt(map, "authId", authId);
		return resourceAuthService.getPage(map);
	}
	
	@ResponseBody
	@RequestMapping(value = "/getOtherAuths", method = RequestMethod.POST)
	public ResponseMessage getOtherAuths(@RequestBody List<Map<String, Integer>> ids) {
		List<Integer> list = new ArrayList<Integer>();
		for(Map<String, Integer> id : ids) {
			list.add(id.get("value"));
		}
		return resourceAuthService.getOtherAuths(list);
	}
	
	@ResponseBody
	@RequestMapping(value = "/getAllAuths", method = RequestMethod.GET)
	public ResponseMessage getAllAuths() {
		return resourceAuthService.getAllAuths();
	}
}
