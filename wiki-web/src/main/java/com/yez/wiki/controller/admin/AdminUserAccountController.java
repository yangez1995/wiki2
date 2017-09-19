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
import com.yez.wiki.user.service.IUserAccountService;
/**
 * 用户帐号管理页面Controller
 * @author 杨恩哲
 * @since V1.0
 */
@Controller
@RequestMapping("/admin/user/account")
public class AdminUserAccountController {
	/**
	 * 用户帐号Service
	 */
	@Autowired
	private IUserAccountService userAccountService;
	/*-- UPDATE --*/
	/**
	 * 锁定指定用户帐号
	 * @param id 要锁定的用户id
	 * @return 从Service获取的响应信息
	 */
	@ResponseBody
	@RequestMapping(value = "/lock", method = RequestMethod.POST)
	public ResponseMessage lock(int id) {
		return userAccountService.lock(id);
	}
	
	/**
	 * 解锁指定用户帐号
	 * @param id 要解锁的用户id
	 * @return 从Service获取的响应信息
	 */
	@ResponseBody
	@RequestMapping(value = "/unlock", method = RequestMethod.POST)
	public ResponseMessage unlock(int id) {
		return userAccountService.unlock(id);
	}
	
	/**
	 * 获取页数对应的用户帐号列表
	 * @param pageIndex 要获取的用户帐号页数
	 * @param id 查找用户id
	 * @param username 查找用户名
	 * @param locked 查找用户锁定状态
	 * @return 从Service获取的响应信息
	 */
	@ResponseBody
	@RequestMapping(value = "/getPage", method = RequestMethod.POST)
	public ResponseMessage getPage(int pageIndex, String id, String username, String locked) {
		Map<String, Object> map = MapFactory.pageMap(pageIndex, 10);
		MapFactory.machiningInt(map, "id", id);
		MapFactory.machiningString(map, "username", username);
		map.put("locked", "t".equals(locked));
		return userAccountService.getPage(map);
	}
	
	/**
	 * 获取符合搜索条件的用户总数
	 * @param id 查找用户id
	 * @param username 查找用户名
	 * @param locked 查找用户锁定状态
	 * @return 从Service获取的响应信息
	 */
	@ResponseBody
	@RequestMapping(value = "/getNumber", method = RequestMethod.POST)
	public ResponseMessage getNumber(String username, String id, String locked) {
		Map<String, Object> map = new HashMap<String, Object>();
		MapFactory.machiningInt(map, "id", id);
		MapFactory.machiningString(map, "username", username);
		map.put("locked", "t".equals(locked));
		return userAccountService.getNumber(map);
	}
}
