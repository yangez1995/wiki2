package com.yez.wiki.controller.admin;

import java.util.ArrayList;
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
import com.yez.wiki.user.service.IUserRoleService;

@Controller
@RequestMapping(value = "/admin/user/role")
public class AdminUserRoleController {
	@Autowired
	private IUserRoleService userRoleService;
	
	@ResponseBody
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public ResponseMessage update(@RequestBody OneToMoreIds ids) {
		return userRoleService.update(ids);
	}

	@ResponseBody
	@RequestMapping(value = "/getPage", method = RequestMethod.POST)
	public ResponseMessage getPage(int pageIndex, String id, String username, String roleId) {
		Map<String, Object> map = MapFactory.pageMap(pageIndex, 10);
		MapFactory.machiningInt(map, "id", id);
		MapFactory.machiningString(map, "username", username);
		MapFactory.machiningInt(map, "roleId", roleId);
		return userRoleService.getPage(map);
	}
	
	@ResponseBody
	@RequestMapping(value = "/getOtherRoles", method = RequestMethod.POST)
	public ResponseMessage getOtherRoles(@RequestBody List<Map<String, Integer>> ids) {
		List<Integer> list = new ArrayList<Integer>();
		for(Map<String, Integer> id : ids) {
			list.add(id.get("value"));
		}
		return userRoleService.getOtherRoles(list);
	}
	
	@ResponseBody
	@RequestMapping(value = "/getRoles", method = RequestMethod.GET)
	public List<Map<String, Object>> getRoles() {
		return userRoleService.getRoles();
	}
}
