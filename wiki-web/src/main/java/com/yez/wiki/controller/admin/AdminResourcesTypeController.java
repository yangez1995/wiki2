package com.yez.wiki.controller.admin;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.factory.MapFactory;
import com.yez.wiki.user.service.IResourceTypeService;

@Controller
@RequestMapping("/admin/resource/type")
public class AdminResourcesTypeController {
	@Autowired
	private IResourceTypeService resourceTypeService;
	
	@ResponseBody
	@RequestMapping(value = "/insert", method = RequestMethod.POST)
	public ResponseMessage insert(String id, String name) {
		return resourceTypeService.insert(id, name);
	}
	
	@ResponseBody
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public ResponseMessage delete(String id) {
		return resourceTypeService.delete(id);
	}
	
	@ResponseBody
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public ResponseMessage update(String id, String name) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", id);
		map.put("name", name);
		return resourceTypeService.update(map);
	}
	
	@ResponseBody
	@RequestMapping(value = "/getPage", method = RequestMethod.POST)
	public ResponseMessage getPage(int pageIndex) {
		Map<String, Object> map = MapFactory.pageMap(pageIndex, 10);
		return resourceTypeService.getPage(map);
	}
	
	@ResponseBody
	@RequestMapping(value = "/getNumber", method = RequestMethod.GET)
	public ResponseMessage getNumber() {
		return resourceTypeService.getNumber();
	}
}
