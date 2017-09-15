package com.yez.wiki.controller.admin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.factory.MapFactory;
import com.yez.wiki.user.service.IResourceAuthService;

@Controller
@RequestMapping(value = "/admin/resource/auth")
public class AdminResourceAuthController {
	@Autowired
	private IResourceAuthService resourceAuthService;
	
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
	@RequestMapping(value = "/getNumber", method = RequestMethod.POST)
	public ResponseMessage getNumber(String id, String name, String url, String authId) {
		Map<String, Object> map = new HashMap<String, Object>();
		MapFactory.machiningInt(map, "id", id);
		MapFactory.machiningString(map, "name", name);
		MapFactory.machiningString(map, "url", url);
		MapFactory.machiningInt(map, "authId", authId);
		return resourceAuthService.getNumber(map);
	}
	
	@ResponseBody
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public ResponseMessage delete(int resourceId, int authId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("resourceId", resourceId);
		map.put("authId", authId);
		return resourceAuthService.delete(map);
	}
	
	@ResponseBody
	@RequestMapping(value = "/insert", method = RequestMethod.POST)
	public ResponseMessage insert(int resourceId, int authId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("resourceId", resourceId);
		map.put("authId", authId);
		return resourceAuthService.insert(map);
	}
	
	@ResponseBody
	@RequestMapping(value = "/getOtherAuths", method = RequestMethod.POST)
	public List<Object> getOtherAuths(int id) {
		return resourceAuthService.getOtherAuths(id);
	}
	
	@ResponseBody
	@RequestMapping(value = "/getAuthsByResourceId", method = RequestMethod.POST)
	public List<Object> getAuthsByResourceId(int id) {
		return resourceAuthService.getAuthsByResourceId(id);
	}
	
	@ResponseBody
	@RequestMapping(value = "/getAllAuths", method = RequestMethod.GET)
	public List<Object> getAllAuths() {
		return resourceAuthService.getAllAuths();
	}
}
