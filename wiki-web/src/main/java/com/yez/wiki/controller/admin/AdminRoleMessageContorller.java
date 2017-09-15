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
import com.yez.wiki.entity.user.Role;
import com.yez.wiki.factory.MapFactory;
import com.yez.wiki.user.service.IRoleMessageService;

@Controller
@RequestMapping("/admin/role/message")
public class AdminRoleMessageContorller {
	@Autowired
	private IRoleMessageService roleMessageService;
	
	/**
	 * 新建角色
	 * @param name 新角色名
	 * @param describe 新角色描述
	 * @return ResponseMessage 响应信息
	 */
	@ResponseBody
	@RequestMapping(value = "/insert", method = RequestMethod.POST)
	public ResponseMessage insert(String name, String describe) {
		return roleMessageService.insert(name, describe);
	}
	
	/**
	 * 删除角色
	 * @param id 要删除的角色id
	 * @return ResponseMessage 响应信息
	 */
	@ResponseBody
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public ResponseMessage delete(int id) {
		return roleMessageService.delete(id);
	}
	
	/**
	 * 修改角色信息
	 * @param role 要修改的角色对象
	 * @return ResponseMessage 响应信息
	 */
	@ResponseBody
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public ResponseMessage update(@RequestBody Role role) {
		return roleMessageService.update(role);
	}
	
	/**
	 * 获取页数对应的角色信息
	 */
	@ResponseBody
	@RequestMapping(value = "/getPage", method = RequestMethod.GET)
	public ResponseMessage getRoleMessage(int pageIndex, String id, String name, String authId) {
		Map<String, Object> map = MapFactory.pageMap(pageIndex, 10);
		MapFactory.machiningInt(map, "id", id);
		MapFactory.machiningString(map, "name", name);
		MapFactory.machiningInt(map, "authId", authId);
		return roleMessageService.getPage(map);
	}
	
	/**
	 * 获取收录所有角色所需要的总页数
	 */
	@ResponseBody
	@RequestMapping(value = "/getNumber", method = RequestMethod.GET)
	public ResponseMessage getNumber(String id, String name, String authId) {
		Map<String, Object> map = new HashMap<String, Object>();
		MapFactory.machiningInt(map, "id", id);
		MapFactory.machiningString(map, "name", name);
		MapFactory.machiningInt(map, "authId", authId);
		return roleMessageService.getNumber(map);
	}
}
