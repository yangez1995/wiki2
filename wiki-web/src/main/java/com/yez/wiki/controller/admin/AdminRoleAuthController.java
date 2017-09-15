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
import com.yez.wiki.entity.user.Authority;
import com.yez.wiki.entity.user.RoleAuthority;
import com.yez.wiki.entity.user.RoleAuthsId;
import com.yez.wiki.factory.MapFactory;
import com.yez.wiki.user.service.IRoleAuthService;
import com.yez.wiki.util.PageUtil;

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
	@RequestMapping(value = "/getPage", method = RequestMethod.GET)
	public List<RoleAuthority> getPage(int pageIndex) {
		Map<String, Object> map = MapFactory.pageMap(pageIndex, 10);
		return roleAuthService.getPage(map);
	}
	
	/**
	 * 获取符合条件的角色信息总数
	 * @return int 获取符合条件的角色信息总数
	 */
	@ResponseBody
	@RequestMapping(value = "/getCount", method = RequestMethod.GET)
	public int getCount() {
		Map<String, Object> map = new HashMap<String, Object>();
		return PageUtil.numberToPage(roleAuthService.getCount(map), 10);
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
	public ResponseMessage update(@RequestBody RoleAuthsId ids) {
		return roleAuthService.update(ids);
	}
}
