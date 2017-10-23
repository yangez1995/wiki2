package com.yez.wiki.controller.admin;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.entity.user.Authority;
import com.yez.wiki.factory.MapFactory;
import com.yez.wiki.user.service.IAuthorityService;

@Controller
@RequestMapping("/admin/auth/message")
public class AdminAuthorityController {
	@Autowired
	private IAuthorityService authorityService;
	
	/**
	 * 新建权限
	 */
	@ResponseBody
	@RequestMapping(value = "/insert", method = RequestMethod.POST)
	public ResponseMessage insert(String name, String mark, String describe) {
		return authorityService.insert(name, mark, describe);
	}
	
	/**
	 * 删除权限
	 */
	@ResponseBody
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public ResponseMessage delete(int id) {
		return authorityService.delete(id);
	}
	
	/**
	 * 修改权限信息
	 */
	@ResponseBody
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public ResponseMessage update(@RequestBody Authority authority) {
		return authorityService.update(authority);
	}
	
	@ResponseBody
	@RequestMapping(value = "/getPage", method = RequestMethod.POST)
	public ResponseMessage getPage(int pageIndex, String id, String name, String mark) {
		Map<String, Object> map = MapFactory.pageMap(pageIndex, 10);
		MapFactory.machiningInt(map, "id", id);
		MapFactory.machiningString(map, "name", name);
		MapFactory.machiningString(map, "mark", mark);
		return authorityService.getPage(map);
	}
}
