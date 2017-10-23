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
import com.yez.wiki.entity.user.Authority;
import com.yez.wiki.entity.user.OneToMoreIds;
import com.yez.wiki.factory.MapFactory;
import com.yez.wiki.user.service.IRoleAuthService;

@Controller
@RequestMapping("/admin/role/auth")
public class AdminRoleAuthController {
	@Autowired
	private IRoleAuthService roleAuthService;
	/**
	 * 获取页数对应的角色权限信息
	 * @param pageIndex 要获取的角色权限信息页数
	 * @return List<RoleAuthority> 角色权限信息列表
	 */
	@ResponseBody
	@RequestMapping(value = "/getPage", method = RequestMethod.POST)
	public ResponseMessage getPage(int pageIndex, String id, String roleName, String authId) {
		Map<String, Object> map = MapFactory.pageMap(pageIndex, 10);
		MapFactory.machiningInt(map, "id", id);
		MapFactory.machiningString(map, "roleName", roleName);
		MapFactory.machiningInt(map, "authId", authId);
		return roleAuthService.getPage(map);
	}
	
	/**
	 * 获取用户尚未拥有的权限
	 * @param ids
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/getOtherAuths", method = RequestMethod.POST)
	public List<Authority> getOtherAuths(@RequestBody List<Map<String, Integer>> ids) {
		List<Integer> list = new ArrayList<Integer>();
		if(ids.size() == 0) {
			list.add(0);
		} else {
			for(Map<String, Integer> id : ids) {
				list.add(id.get("value"));
			}
		}
		return roleAuthService.getOtherAuths(list);
	}
	
	/**
	 * 修改角色权限
	 * @param ids
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public ResponseMessage update(@RequestBody OneToMoreIds ids) {
		return roleAuthService.update(ids);
	}
	
	@ResponseBody
	@RequestMapping(value = "/getAuths", method = RequestMethod.GET)
	public List<Object> getAuths() {
		return roleAuthService.getAuths();
	}
}
