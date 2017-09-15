package com.yez.wiki.controller.admin;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.entity.user.Resource;
import com.yez.wiki.factory.MapFactory;
import com.yez.wiki.user.service.IResourcesMessageService;

@Controller
@RequestMapping("/admin/resource/message")
public class AdminResourcesMessageController {
	@Autowired
	private IResourcesMessageService resourcesService;
	
	@ResponseBody
	@RequestMapping(value = "/getPage", method = RequestMethod.POST)
	public ResponseMessage getPage(int pageIndex, String id, String name, String url, String type) {
		Map<String, Object> map = MapFactory.pageMap(pageIndex, 10);
		MapFactory.machiningInt(map, "id", id);
		MapFactory.machiningString(map, "name", name);
		MapFactory.machiningString(map, "url", url);
		MapFactory.machiningString(map, "type", type);
		return resourcesService.getPage(map);
	}
	
	@ResponseBody
	@RequestMapping(value = "/getNumber", method = RequestMethod.POST)
	public ResponseMessage getNumber(String id, String name, String url, String type) {
		Map<String, Object> map = new HashMap<String, Object>();
		MapFactory.machiningInt(map, "id", id);
		MapFactory.machiningString(map, "name", name);
		MapFactory.machiningString(map, "url", url);
		MapFactory.machiningString(map, "type", type);
		return resourcesService.getNumber(map);
	}
	
	@ResponseBody
	@RequestMapping(value = "/insert", method = RequestMethod.POST)
	public ResponseMessage insert(@RequestBody Resource resource) {
		return resourcesService.insert(resource);
	}
	
	@ResponseBody
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public ResponseMessage delete(int id) {
		return resourcesService.delete(id);
	}
	
	@ResponseBody
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public ResponseMessage update(@RequestBody Resource resource) {
		return resourcesService.update(resource);
	}
	
	@ResponseBody
	@RequestMapping(value = "/getType", method = RequestMethod.GET)
	public ResponseMessage getType() {
		return resourcesService.getType();
	}
}
